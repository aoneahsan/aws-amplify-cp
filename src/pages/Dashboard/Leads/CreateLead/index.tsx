import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import {
  IonButton,
  IonCol,
  IonContent,
  IonPage,
  IonRow,
  IonTitle,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  CreateLeadMutation,
  CreateLeadInput,
  Genders,
  Lead,
  GetLeadQuery,
  UpdateLeadMutation,
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
import {
  generateUuid,
  getErrorMessageFromGraphQlRequest,
  getFileFromDataUrl,
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
import { Auth, Storage } from 'aws-amplify';
import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';
import { IUserAuthData } from '@/types/UserTypes';
import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import MESSAGES from '@/utils/messages';
import ZFileSelectField from '@/components/FormFields/FileSelectField';

const CreateLeadPage: React.FC = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert, presentZIonUnAuthAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const isAuthenticatedState = useRecoilValue(isAuthenticatedRStateSelector);
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { leadId } = useParams<IRouteParamsKeys>();
  const [compState, setCompState] = React.useState<{
    processing: boolean;
    leadData: Lead | null;
    isCreateMode: boolean;
  }>({ processing: true, leadData: null, isCreateMode: true });

  useIonViewWillEnter(() => {
    void (async () => {
      try {
        presentZIonLoader();
        setCompState((oldVal) => ({ ...oldVal, processing: true }));
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

        let profileImageUrl, profileImagePath;
        if (values.profileImage) {
          // delete old image first
          if (compState.leadData?.profileImage) {
            const _pathArr = compState.leadData.profileImage.split(';');
            const _oldImagePath =
              _pathArr.length === 2
                ? _pathArr[0]
                : compState.leadData.profileImage;
            const _deleteReqResult = await Storage.remove(_oldImagePath);

            console.log({ _deleteReqResult });
          }

          const _file = getFileFromDataUrl(values.profileImage);
          const _putReqResult = await Storage.put(
            `uploads/leads/profileImages/${generateUuid()}.jpg`,
            _file
          );

          console.log({
            message: 'file uploaded on s3, here is file url',
            _putReqResult,
          });

          profileImagePath = _putReqResult.key;
          profileImageUrl = await Storage.get(profileImagePath);
        }

        const reqData: CreateLeadInput = {
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          gender: values.gender,
        };

        if (profileImagePath && profileImageUrl) {
          reqData.profileImage = `${profileImagePath};${profileImageUrl}`;
        }

        if (compState.isCreateMode) {
          const { errors } = (await API.graphql(
            graphqlOperation(createLead, { input: reqData })
          )) as GraphQLResult<CreateLeadMutation>;
          _errors = errors;
        } else {
          reqData.id = leadId;

          const { errors } = (await API.graphql(
            graphqlOperation(updateLead, {
              input: reqData,
            })
          )) as GraphQLResult<UpdateLeadMutation>;
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
        presentZIonErrorAlert({
          message: getErrorMessageFromGraphQlRequest(error),
        });
        return false;
      }
    },
    [compState.isCreateMode, compState.leadData?.profileImage, leadId]
  );

  const handleOnSuccessNavigate = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.LIST);
  }, []);

  return (
    <>
      <IonPage>
        <PageHeader
          pageTitle={
            compState.isCreateMode ? 'Create New Lead' : 'Update Lead Info'
          }
        />
        <IonContent>
          <PageCenterCardContainer>
            <IonTitle className={classNames('ion-text-center')}>
              {compState.isCreateMode ? 'Add' : 'Update'} Lead
            </IonTitle>
            <Formik
              initialValues={{
                firstName: compState.leadData?.firstName ?? '',
                middleName: compState.leadData?.middleName ?? '',
                lastName: compState.leadData?.lastName ?? '',
                gender: compState.leadData?.gender ?? Genders.Male,
                profileImage: compState.leadData?.profileImage
                  ? compState.leadData?.profileImage?.split(';').length === 2
                    ? compState.leadData?.profileImage?.split(';')[1]
                    : compState.leadData?.profileImage
                  : '',
              }}
              enableReinitialize
              validate={(values) => {
                const errors: IGenericObject = {};
                validateFields(
                  [
                    'firstName',
                    'middleName',
                    'lastName',
                    'gender',
                    'profileImage',
                  ],
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
                  values.gender !== 'Male' &&
                  values.gender !== 'Female' &&
                  values.gender !== 'Other'
                ) {
                  errors.gender =
                    'Gender can be one of these "Male", "Female" or "Other".';
                }

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
                          profileImage: '',
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
                    <ZFileSelectField
                      fieldKey='profileImage'
                      onFileSelect={(fileUrl) => {
                        console.log({ message: 'got file Url', fileUrl });
                      }}
                    />
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

export default CreateLeadPage;
