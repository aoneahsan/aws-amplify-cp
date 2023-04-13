import { API, graphqlOperation } from '@aws-amplify/api';
import { Auth, CognitoUser } from '@aws-amplify/auth';
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from '@ionic/react';
import classNames from 'classnames';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import { createUser } from '@/graphql/mutations';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAuthRStateAtom } from '@/RStore';
import { IGenericObject } from '@/types/Generic';
import { IUserAuthData } from '@/types/UserTypes';
import { isEmpty, isString } from 'underscore';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import {
  checkAndReturnAwsAmplifyErrorType,
  getUserAuthDataFromCognitoUserObject,
} from '@/utils/helpers/aws-amplify';
import MESSAGES from '@/utils/messages';
import isEmail from 'validator/lib/isEmail';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';

export interface IAWSUserLoginDetails {
  email: string;
  password: string;
}

enum ActiveStep {
  AUTH_FORM = 'AUTH_FORM',
  VERIFICATION_CODE = 'VERIFICATION_CODE',
}

const RegisterPage: React.FC = () => {
  const { zNavigatePushRoute } = useZNavigate();
  const [compState, setCompState] = useState<{
    currentActiveStep: ActiveStep;
    userData?: IAWSUserLoginDetails;
  }>({ currentActiveStep: ActiveStep.AUTH_FORM, userData: undefined });
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  useEffect(() => {
    try {
      void (async () => {
        // check if user is already logged in, if yes, then redirect user to Dashboard
        const userData = (await Auth.currentAuthenticatedUser()) as CognitoUser;

        if (userData.getUsername()) {
          zNavigatePushRoute(ROUTES.DASHBOARD);
        }
      })();
    } catch (error) {
      reportCustomError(error);
    }

    // eslint-disable-next-line
  }, []);

  const handleOnAuthSuccess = (userData: IAWSUserLoginDetails) => {
    if (userData) {
      setCompState((oldVal) => ({
        ...oldVal,
        currentActiveStep: ActiveStep.VERIFICATION_CODE,
        userData,
      }));
    } else {
      void presentZIonErrorAlert({
        message: 'No User Data found, please try again!',
        buttons: [
          {
            text: 'Okay',
            handler: resetCompState,
          },
        ],
      });
    }
  };

  const resetCompState = () => {
    setCompState((oldVal) => ({
      ...oldVal,
      currentActiveStep: ActiveStep.AUTH_FORM,
      userData: undefined,
    }));
  };

  const handleOnVerificationSuccess = async () => {
    try {
      if (compState.userData) {
        presentZIonLoader();

        const result = (await Auth.signIn(
          compState.userData.email,
          compState.userData.password
        )) as CognitoUser;

        const userData = await getUserAuthDataFromCognitoUserObject(result);

        await createUserDefaultDataRowInGraphqlCollectionForNewUser(userData);

        dismissZIonLoader();

        resetCompState();

        setUserAuthState(userData);
        zNavigatePushRoute(ROUTES.DASHBOARD);
      }
    } catch (error) {
      dismissZIonLoader();
      reportCustomError(error);
      if (error instanceof Error) {
        presentZIonErrorAlert({ message: error.message });
      }
    }
  };

  const createUserDefaultDataRowInGraphqlCollectionForNewUser = async (
    userData: IUserAuthData
  ) => {
    try {
      await API.graphql(
        graphqlOperation(createUser, { input: { id: userData.id } })
      );
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <IonPage>
      <PageHeader pageTitle='Register' />
      <IonContent>
        <PageCenterCardContainer>
          <IonTitle className={classNames('ion-text-center')}>
            {compState.currentActiveStep === ActiveStep.AUTH_FORM
              ? 'Register Form'
              : compState.userData &&
                compState.currentActiveStep === ActiveStep.VERIFICATION_CODE
              ? 'Verify Your Account'
              : 'Something Went wrong please try again!'}
          </IonTitle>
          {compState.currentActiveStep === ActiveStep.AUTH_FORM ? (
            <AuthForm onSuccess={handleOnAuthSuccess} />
          ) : compState.currentActiveStep === ActiveStep.VERIFICATION_CODE &&
            compState.userData ? (
            <VerifyEmail
              onSuccess={() => {
                void handleOnVerificationSuccess();
              }}
              userLoginInfo={compState.userData}
            />
          ) : (
            <>
              <IonButton
                onClick={resetCompState}
                expand='block'
                color={'primary'}
                fill='solid'
                type='button'
              >
                Okay
              </IonButton>
            </>
          )}
        </PageCenterCardContainer>
      </IonContent>
    </IonPage>
  );
};

interface AuthFormProps {
  onSuccess: (userData: IAWSUserLoginDetails) => void;
}
const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={(values) => {
        const errors: IGenericObject = {};

        if (isEmpty(values.email) || !isString(values.password)) {
          errors.email = 'Email is required.';
        } else if (!isEmail(values.email)) {
          errors.email = 'Please enter a valid email.';
        }

        if (isEmpty(values.password) || !isString(values.password)) {
          errors.password = 'Password is required.';
        } else if (values.password.length < 6) {
          errors.password = 'Password must be at least 6 character long.';
        }

        return errors;
      }}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        presentZIonLoader();
        try {
          const userLoginInfo = {
            email: values.email,
            password: values.password,
          };
          await Auth.signUp({
            username: values.email,
            password: values.password,
          }); // this return info about successful singup, where we get user data and detail about where aws sent the verification code (if one was sent), you can console log the result from this request to see the details, here we will just store the login info and show the verification component

          presentZIonToastSuccess('Account Completed Successfully!');
          // reset form
          resetForm(undefined);
          dismissZIonLoader();

          onSuccess(userLoginInfo);
        } catch (error) {
          dismissZIonLoader();
          reportCustomError({ error });
          if (error instanceof Error) {
            const awsErrorType = checkAndReturnAwsAmplifyErrorType(error.name);

            let errorMessage = MESSAGES.GENERAL.FAILED;
            if (awsErrorType === AwsErrorTypeEnum.UsernameExistsException) {
              errorMessage = MESSAGES.GENERAL.USER.ALREADY_EXISTS;
            }

            presentZIonErrorAlert({
              message: errorMessage,
            });
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        isValid,
      }) => {
        return (
          <>
            <Form>
              <IonInput
                aria-label='Email'
                labelPlacement='floating'
                name='email'
                value={values.email}
                onIonInput={handleChange}
                helperText='Enter Email here'
                className={classNames({
                  'ion-invalid': errors.email,
                  'ion-valid': !errors.email,
                  'ion-touched': touched.email,
                })}
                errorText={errors.email}
                type='email'
                required
                onIonBlur={handleBlur}
              />

              <IonInput
                required
                name='password'
                value={values.password}
                aria-label='Password'
                labelPlacement='floating'
                onIonInput={handleChange}
                type='password'
                helperText='Enter Password here'
                errorText={errors.password}
                onIonBlur={handleBlur}
                className={classNames({
                  'ion-invalid': errors.password,
                  'ion-valid': !errors.password,
                  'ion-touched': touched.password,
                })}
                autocorrect={'off'}
                autocapitalize={'off'}
                autocomplete={'off'}
                clearInput
              />

              <IonRow className={classNames('mt-12')}>
                <IonCol size='12' className={classNames('ion-no-padding')}>
                  <IonButton
                    className={classNames('ion-no-margin')}
                    color='primary'
                    fill='solid'
                    type='submit'
                    size='default'
                    expand='full'
                    disabled={isSubmitting || !isValid}
                  >
                    Submit
                  </IonButton>
                </IonCol>
              </IonRow>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

interface VerifyEmailProps {
  onSuccess: () => void;
  userLoginInfo: IAWSUserLoginDetails;
}
const VerifyEmail: React.FC<VerifyEmailProps> = ({
  onSuccess,
  userLoginInfo,
}) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  return (
    <>
      <IonTitle
        size='small'
        className={classNames('ion-text-center mt-4 mb-5')}
      >
        We have sent a verification code to you, at your email "
        <IonText color={'success'}>{userLoginInfo.email}</IonText>", please
        enter that code below to verify your account and continue to your
        dashboard.
      </IonTitle>
      <Formik
        initialValues={{
          code: '',
        }}
        validate={(values) => {
          const errors: IGenericObject = {};

          if (isEmpty(values.code) || !isString(values.code)) {
            errors.email = 'Code is required.';
          } else if (values.code.length !== 6) {
            errors.email = 'Verification code must be 6 digits long.';
          }

          return errors;
        }}
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
          presentZIonLoader();
          try {
            await Auth.confirmSignUp(userLoginInfo.email, values.code); // this only returns a string "SUCCESS"

            presentZIonToastSuccess('Account Verified Successfully!');

            // reset form
            resetForm(undefined);
            dismissZIonLoader();

            onSuccess();
          } catch (error) {
            dismissZIonLoader();
            reportCustomError({ error });
            if (error instanceof Error) {
              const awsErrorType = checkAndReturnAwsAmplifyErrorType(
                error.name
              );

              let errorMessage = MESSAGES.GENERAL.FAILED;
              if (awsErrorType === AwsErrorTypeEnum.UserNotFoundException) {
                errorMessage = MESSAGES.GENERAL.USER.NOT_FOUND;
              }

              presentZIonErrorAlert({
                message: errorMessage,
              });
            }
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          isValid,
        }) => {
          return (
            <>
              <Form>
                <IonInput
                  aria-label='Code'
                  labelPlacement='floating'
                  name='code'
                  value={values.code}
                  onIonInput={handleChange}
                  helperText='Enter Verification code here'
                  maxlength={6}
                  minlength={6}
                  className={classNames({
                    'ion-invalid': errors.code,
                    'ion-valid': !errors.code,
                    'ion-touched': touched.code,
                  })}
                  errorText={errors.code}
                  type='text'
                  required
                  onIonBlur={handleBlur}
                  clearInput
                  inputMode='numeric'
                />

                <IonRow className={classNames('mt-12')}>
                  <IonCol size='12' className={classNames('ion-no-padding')}>
                    <IonButton
                      className={classNames('ion-no-margin')}
                      color='primary'
                      fill='solid'
                      type='submit'
                      size='default'
                      expand='full'
                      disabled={isSubmitting || !isValid}
                    >
                      Submit
                    </IonButton>
                  </IonCol>
                </IonRow>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterPage;
