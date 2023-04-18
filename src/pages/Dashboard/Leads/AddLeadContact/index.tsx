import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import {
  IonContent,
  IonPage,
  IonTitle,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  Contact,
  GetContactQuery,
  CreateContactInput,
  UpdateContactMutation,
  CreateContactMutation,
} from '@/aws-amplify/graphql-api';
import classNames from 'classnames';
import ZSubmitButton from '@/components/FormFields/SubmitButton';
import ZTextField from '@/components/FormFields/TextField';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import { createContact, updateContact } from '@/graphql/mutations';
import { getContact } from '@/graphql/queries';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedRStateSelector, userAuthRStateAtom } from '@/RStore';
import { IGenericObject } from '@/types/Generic';
import ROUTES, { routesDynamicParts } from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { VALIDATION_RULE } from '@/utils/enums';
import {
  getErrorMessageFromGraphQlRequest,
  validateFields,
  W_LOCATION,
} from '@/utils/helpers';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';
import { useParams } from 'react-router';
import { IRouteParamsKeys } from '@/types/ZaionsReactRouterTypes.type';
import { Auth } from 'aws-amplify';
import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';
import { IUserAuthData } from '@/types/UserTypes';
import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';

const AddLeadContactPage: React.FC = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert, presentZIonUnAuthAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const isAuthenticatedState = useRecoilValue(isAuthenticatedRStateSelector);
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { leadId, leadContactId } = useParams<IRouteParamsKeys>();
  const [compState, setCompState] = React.useState<{
    processing: boolean;
    leadContactData: Contact | null;
    isCreateMode: boolean;
  }>({ processing: true, leadContactData: null, isCreateMode: true });

  useIonViewWillEnter(() => {
    void (async () => {
      presentZIonLoader();
      setCompState((oldVal) => ({ ...oldVal, processing: true }));

      try {
        const userSessionExists = await Auth.currentSession();
        if (userSessionExists) {
          const awsCognitoUserData =
            (await Auth.currentUserInfo()) as IAwsCurrentUserInfo;
          const userData: IUserAuthData =
            getUserAuthDataFromCurrentUserInfo(awsCognitoUserData);

          // fetch the lead Data
          if (leadContactId) {
            const result = (await API.graphql(
              graphqlOperation(getContact, { id: leadContactId })
            )) as GraphQLResult<GetContactQuery>;

            if (result.data?.getContact?.id) {
              setCompState((oldVal) => ({
                ...oldVal,
                processing: false,
                leadContactData: result.data?.getContact as Contact,
                isCreateMode: false,
              }));
            }
          } else {
            setCompState((oldVal) => ({
              ...oldVal,
              processing: false,
              isCreateMode: true,
            }));
          }

          setUserAuthState(userData);
          dismissZIonLoader();
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();
        setCompState((oldVal) => ({ ...oldVal, processing: false }));

        await Auth.signOut();

        if (error === AwsErrorTypeEnum.NoCurrentUser) {
          presentZIonErrorAlert({
            header: 'No User Found',
            message: 'Please login to continue to your dashboard',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  zNavigatePushRoute(ROUTES.LOGIN);
                },
              },
            ],
          });
        } else {
          presentZIonErrorAlert({
            message:
              'Something went wrong, please refresh the page and try again!',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  W_LOCATION.REDIRECT_TO_ROOT();
                },
              },
            ],
          });
        }
      }
    })();
    // eslint-disable-next-line
  }, [leadId, leadContactId]);

  useIonViewDidLeave(() => {
    setCompState((oldVal) => ({
      ...oldVal,
      leadContactData: null,
    }));
  }, []);

  useEffect(() => {
    if (!compState.processing && !isAuthenticatedState) {
      presentZIonUnAuthAlert();
    }

    // eslint-disable-next-line
  }, [isAuthenticatedState, compState.processing]);

  const handleFormSubmit = useCallback(
    async (values: CreateContactInput) => {
      try {
        presentZIonLoader();
        let _errors: Error[] | undefined;
        if (compState.isCreateMode) {
          const { errors } = (await API.graphql(
            graphqlOperation(createContact, {
              input: {
                contactValue: values.contactValue,
                description: values.description,
                category: values.category,
                type: values.type,
                leadContactsId: leadId,
              },
            })
          )) as GraphQLResult<CreateContactMutation>;
          _errors = errors;
        } else {
          const { errors } = (await API.graphql(
            graphqlOperation(updateContact, {
              input: {
                id: leadContactId,
                contactValue: values.contactValue,
                description: values.description,
                category: values.category,
                type: values.type,
              },
            })
          )) as GraphQLResult<UpdateContactMutation>;
          _errors = errors;
        }
        dismissZIonLoader();

        if (_errors?.length) {
          presentZIonErrorAlert({ message: _errors[0].message });
        } else {
          presentZIonToastSuccess();
        }
        return true;
      } catch (error) {
        dismissZIonLoader();
        reportCustomError(error);
        presentZIonErrorAlert({
          message: getErrorMessageFromGraphQlRequest(error),
        });
        return false;
      }
    },
    [compState.isCreateMode, leadId, leadContactId]
  );

  const handleOnSuccessNavigate = useCallback(() => {
    if (leadId) {
      zNavigatePushRoute(
        ROUTES.LEADS.VIEW.replace(routesDynamicParts.leadId, leadId)
      );
    } else {
      presentZIonErrorAlert({
        message: 'No Lead id found',
        subHeader: 'No Lead Data Found',
      });
    }
  }, [leadId]);

  return (
    <>
      <IonPage>
        <PageHeader
          pageTitle={
            compState.isCreateMode
              ? 'Add New Lead Contact'
              : 'Update Lead Contact Info'
          }
        />
        <IonContent>
          <PageCenterCardContainer>
            <IonTitle className={classNames('ion-text-center')}>
              {compState.isCreateMode ? 'Add' : 'Update'} Lead Contact
            </IonTitle>
            <Formik
              initialValues={{
                contactValue: compState.leadContactData?.contactValue ?? '',
                description: compState.leadContactData?.description ?? '',
                category: compState.leadContactData?.category ?? '',
                type: compState.leadContactData?.type ?? '',
              }}
              enableReinitialize
              validate={(values) => {
                const errors: IGenericObject = {};
                validateFields(
                  ['contactValue', 'category', 'type', 'description'],
                  values,
                  errors,
                  [
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                  ]
                );

                if (
                  values.category !== 'Email' &&
                  values.category !== 'Phone' &&
                  values.category !== 'Fax' &&
                  values.category !== 'Other'
                ) {
                  errors.category =
                    'Contact category can only be one of these three "Email" | "Phone" | "Fax" | "Other".';
                }

                if (
                  values.type !== 'Work' &&
                  values.type !== 'Home' &&
                  values.type !== 'Other'
                ) {
                  errors.type =
                    'Contact type can only be one of these three "Work" | "Home" | "Other".';
                }

                return errors;
              }}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                void handleFormSubmit(values as CreateContactInput).then(
                  (success: boolean) => {
                    if (success) {
                      resetForm({
                        values: {
                          contactValue: '',
                          description: '',
                          category: '',
                          type: '',
                        },
                      });
                      handleOnSuccessNavigate();
                    } else {
                      setSubmitting(false);
                    }
                  }
                ); // no need of catch here as i'm using one in form submit handler function
              }}
            >
              {() => {
                return (
                  <Form>
                    <ZTextField fieldKey='type' />
                    <ZTextField fieldKey='category' />
                    <ZTextField fieldKey='contactValue' />
                    <ZTextField fieldKey='description' required={false} />
                    <ZSubmitButton />
                  </Form>
                );
              }}
            </Formik>
          </PageCenterCardContainer>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AddLeadContactPage;
