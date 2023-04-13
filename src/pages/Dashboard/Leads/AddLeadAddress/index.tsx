import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import {
  IonContent,
  IonPage,
  IonTitle,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  CreateLeadMutation,
  CreateLeadInput,
  Genders,
  Lead,
  GetLeadQuery,
} from '@/aws-amplify/graphql-api';
import classNames from 'classnames';
import ZSubmitButton from '@/components/FormFields/SubmitButton';
import ZTextField from '@/components/FormFields/TextField';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import { createLead, updateLead } from '@/graphql/mutations';
import { getLead } from '@/graphql/queries';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedRStateSelector, userAuthRStateAtom } from '@/RStore';
import { IGenericObject } from '@/types/Generic';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { VALIDATION_RULE } from '@/utils/enums';
import { validateFields, W_LOCATION } from '@/utils/helpers';
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

const AddLeadAddressPage: React.FC = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert, presentZIonUnAuthAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const isAuthenticatedState = useRecoilValue(isAuthenticatedRStateSelector);
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { leadId, leadAddressId } = useParams<IRouteParamsKeys>();
  const [compState, setCompState] = React.useState<{
    processing: boolean;
    leadData: Lead | null;
    isCreatingNewLead: boolean;
  }>({ processing: true, leadData: null, isCreatingNewLead: true });

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
          if (leadId) {
            const result = (await API.graphql(
              graphqlOperation(getLead, { id: leadId })
            )) as GraphQLResult<GetLeadQuery>;

            if (result.data?.getLead?.id) {
              setCompState((oldVal) => ({
                ...oldVal,
                processing: false,
                leadData: result.data?.getLead as Lead,
                isCreatingNewLead: false,
              }));
            }
          } else {
            setCompState((oldVal) => ({
              ...oldVal,
              processing: false,
              isCreatingNewLead: true,
            }));
          }

          setUserAuthState(userData);
          dismissZIonLoader();
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();
        setCompState((oldVal) => ({ ...oldVal, processing: false }));

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
  });

  useEffect(() => {
    if (!compState.processing && !isAuthenticatedState) {
      presentZIonUnAuthAlert();
    }

    // eslint-disable-next-line
  }, [isAuthenticatedState, compState.processing]);

  const handleFormSubmit = useCallback(
    async (values: CreateLeadInput) => {
      try {
        presentZIonLoader();
        let _errors: Error[] | undefined;
        if (compState.isCreatingNewLead) {
          const { errors } = (await API.graphql(
            graphqlOperation(createLead, {
              input: {
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                gender: values.gender,
              },
            })
          )) as GraphQLResult<CreateLeadMutation>;
          _errors = errors;
        } else {
          const { errors } = (await API.graphql(
            graphqlOperation(updateLead, {
              input: {
                id: leadId,
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                gender: values.gender,
              },
            })
          )) as GraphQLResult<CreateLeadMutation>;
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
        reportCustomError(error);
        dismissZIonLoader();
        return false;
      }
    },
    [compState.isCreatingNewLead]
  );

  const handleOnSuccessNavigate = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.LIST);
  }, []);

  return (
    <>
      <IonPage>
        <PageHeader
          pageTitle={
            compState.isCreatingNewLead ? 'Create New Lead' : 'Update Lead Info'
          }
        />
        <IonContent>
          <PageCenterCardContainer>
            <IonTitle className={classNames('ion-text-center')}>
              {compState.isCreatingNewLead ? 'Add' : 'Update'} Lead
            </IonTitle>
            <Formik
              initialValues={{
                firstName: compState.leadData?.firstName ?? '',
                middleName: compState.leadData?.middleName ?? '',
                lastName: compState.leadData?.lastName ?? '',
                gender: compState.leadData?.gender ?? Genders.Male,
              }}
              enableReinitialize
              validate={(values) => {
                const errors: IGenericObject = {};
                validateFields(
                  ['firstName', 'middleName', 'lastName', 'gender'],
                  values,
                  errors,
                  [
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                  ]
                );

                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
                void handleFormSubmit(values)
                  .then((success: boolean) => {
                    if (success) {
                      resetForm({
                        values: {
                          firstName: '',
                          middleName: '',
                          lastName: '',
                          gender: Genders.Male,
                        },
                      });

                      handleOnSuccessNavigate();
                    }
                  })
                  .catch((err) => reportCustomError(err));
              }}
            >
              {() => {
                return (
                  <Form>
                    <ZTextField fieldKey='firstName' />
                    <ZTextField fieldKey='middleName' />
                    <ZTextField fieldKey='lastName' />
                    <ZTextField fieldKey='gender' />
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

export default AddLeadAddressPage;
