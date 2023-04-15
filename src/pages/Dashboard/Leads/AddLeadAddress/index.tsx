import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import {
  IonContent,
  IonPage,
  IonTitle,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  Address,
  GetAddressQuery,
  CreateAddressInput,
  UpdateAddressMutation,
  CreateAddressMutation,
} from '@/aws-amplify/graphql-api';
import classNames from 'classnames';
import ZSubmitButton from '@/components/FormFields/SubmitButton';
import ZTextField from '@/components/FormFields/TextField';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import { createAddress, updateAddress } from '@/graphql/mutations';
import { getAddress } from '@/graphql/queries';
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
    leadAddressData: Address | null;
    isCreateMode: boolean;
  }>({ processing: true, leadAddressData: null, isCreateMode: true });

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
          if (leadAddressId) {
            const result = (await API.graphql(
              graphqlOperation(getAddress, { id: leadAddressId })
            )) as GraphQLResult<GetAddressQuery>;

            if (result.data?.getAddress?.id) {
              setCompState((oldVal) => ({
                ...oldVal,
                processing: false,
                leadAddressData: result.data?.getAddress as Address,
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
  }, [leadId, leadAddressId]);

  useIonViewDidLeave(() => {
    setCompState((oldVal) => ({
      ...oldVal,
      leadAddressData: null,
    }));
  }, []);

  useEffect(() => {
    if (!compState.processing && !isAuthenticatedState) {
      presentZIonUnAuthAlert();
    }

    // eslint-disable-next-line
  }, [isAuthenticatedState, compState.processing]);

  const handleFormSubmit = useCallback(
    async (values: CreateAddressInput) => {
      try {
        presentZIonLoader();
        let _errors: Error[] | undefined;
        if (compState.isCreateMode) {
          const { errors } = (await API.graphql(
            graphqlOperation(createAddress, {
              input: {
                line1: values.line1,
                line2: values.line2,
                country: values.country,
                state: values.state,
                city: values.city,
                type: values.type,
                leadAddressesId: leadId,
              },
            })
          )) as GraphQLResult<CreateAddressMutation>;
          _errors = errors;
        } else {
          const { errors } = (await API.graphql(
            graphqlOperation(updateAddress, {
              input: {
                id: leadAddressId,
                line1: values.line1,
                line2: values.line2,
                country: values.country,
                state: values.state,
                city: values.city,
                type: values.type,
              },
            })
          )) as GraphQLResult<UpdateAddressMutation>;
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
    [compState.isCreateMode, leadId, leadAddressId]
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
              ? 'Add New Lead Address'
              : 'Update Lead Address Info'
          }
        />
        <IonContent>
          <PageCenterCardContainer>
            <IonTitle className={classNames('ion-text-center')}>
              {compState.isCreateMode ? 'Add' : 'Update'} Lead Address
            </IonTitle>
            <Formik
              initialValues={{
                line1: compState.leadAddressData?.line1 ?? '',
                line2: compState.leadAddressData?.line2 ?? '',
                country: compState.leadAddressData?.country ?? '',
                state: compState.leadAddressData?.state ?? '',
                type: compState.leadAddressData?.type ?? '',
                city: compState.leadAddressData?.city ?? '',
              }}
              enableReinitialize
              validate={(values) => {
                const errors: IGenericObject = {};
                validateFields(
                  ['line1', 'country', 'state', 'type', 'city'],
                  values,
                  errors,
                  [
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                    VALIDATION_RULE.string,
                  ]
                );

                if (
                  values.type !== 'Work' &&
                  values.type !== 'Home' &&
                  values.type !== 'Other'
                ) {
                  errors.type =
                    'Address type can only be one of these three "Work" | "Home" | "Other".';
                }

                return errors;
              }}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                void handleFormSubmit(values as CreateAddressInput).then(
                  (success: boolean) => {
                    if (success) {
                      resetForm({
                        values: {
                          line1: '',
                          line2: '',
                          country: '',
                          state: '',
                          city: '',
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
                    <ZTextField fieldKey='line1' />
                    <ZTextField fieldKey='line2' required={false} />
                    <ZTextField fieldKey='country' />
                    <ZTextField fieldKey='state' />
                    <ZTextField fieldKey='city' />
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
