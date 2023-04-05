import { Auth, CognitoUser } from '@aws-amplify/auth';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
} from '@ionic/react';
import classNames from 'classnames';
import PageHeader from 'components/GenericComponents/Header';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { IGenericObject } from 'types/Generic';
import { isEmpty, isString } from 'underscore';
import { IonLoadersIDs } from 'utils/constants';
import ROUTES from 'utils/constants/routesConstants';
import { reportCustomError } from 'utils/customError';
import {
  AwsAmplifyAuthChallengeName,
  AwsErrorTypeEnum,
} from 'utils/enums/aws-amplify';
import { checkAndReturnAwsAmplifyErrorType } from 'utils/helpers/aws-amplify';
import MESSAGES from 'utils/messages';
import isEmail from 'validator/lib/isEmail';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from 'ZaionsHooks/zionic-hooks';
import { useZNavigate } from 'ZaionsHooks/zrouter-hooks';
import NewSigninChangePassword from '../NewSigninChangePassword';

export interface IAWSUserLoginDetails {
  email: string;
  password: string;
}
interface AuthFormProps {
  onSuccess: (userData: IAWSUserLoginDetails) => void;
}

enum ActiveStep {
  AUTH_FORM = 'AUTH_FORM',
  CHANGE_NEW_USER_PASSWORD = 'CHANGE_NEW_USER_PASSWORD',
}

const RegisterPage: React.FC = () => {
  const { zNavigatePushRoute } = useZNavigate();
  const [compState, setCompState] = useState<{
    currentActiveStep: ActiveStep;
    userData?: IAWSUserLoginDetails;
  }>({ currentActiveStep: ActiveStep.AUTH_FORM, userData: undefined });
  const { presentZIonErrorAlert } = useZIonErrorAlert();

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
        currentActiveStep: ActiveStep.CHANGE_NEW_USER_PASSWORD,
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

  return (
    <IonPage>
      <PageHeader pageTitle='Register' />
      <IonContent>
        <IonGrid className={classNames('mt-10')}>
          <IonRow>
            <IonCol
              size='11'
              offset='.5'
              sizeMd='9'
              offsetMd='1.5'
              sizeLg='6'
              offsetLg='3'
              sizeXl='5'
              offsetXl='3.3'
            >
              <IonCard className={classNames('p-10')}>
                <IonTitle className={classNames('ion-text-center')}>
                  {compState.currentActiveStep === ActiveStep.AUTH_FORM
                    ? 'Register Form'
                    : compState.currentActiveStep ===
                        ActiveStep.CHANGE_NEW_USER_PASSWORD &&
                      compState.userData
                    ? 'Change Your Account Password'
                    : 'Something Went wrong please try again!'}
                </IonTitle>
                {compState.currentActiveStep === ActiveStep.AUTH_FORM ? (
                  <AuthForm onSuccess={handleOnAuthSuccess} />
                ) : compState.currentActiveStep ===
                    ActiveStep.CHANGE_NEW_USER_PASSWORD &&
                  compState.userData ? (
                  <NewSigninChangePassword
                    signedInUserData={compState.userData}
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
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(
    IonLoadersIDs.AuthScreenLoader
  );

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
      onSubmit={async (values, { resetForm }) => {
        presentZIonLoader();
        try {
          const userLoginInfo = {
            email: values.email,
            password: values.password,
          };
          const result = await Auth.signUp({
            username: values.email,
            password: values.password,
          });

          presentZIonToastSuccess('Account Completed Successfully!');
          // reset form
          resetForm();

          console.log({ result, userLoginInfo });

          // if (
          //   result.challengeName ===
          //   AwsAmplifyAuthChallengeName.NEW_PASSWORD_REQUIRED
          // ) {
          //   onSuccess(userLoginInfo);
          // } else {
          //   zNavigatePushRoute(ROUTES.DASHBOARD);
          // }
        } catch (error) {
          reportCustomError({ error });
          if (error instanceof Error) {
            const awsErrorType = checkAndReturnAwsAmplifyErrorType(error.name);

            let errorMessage = MESSAGES.GENERAL.FAILED;
            if (awsErrorType === AwsErrorTypeEnum.UserNotFoundException) {
              errorMessage = MESSAGES.GENERAL.USER.NOT_FOUND;
            }

            presentZIonErrorAlert({
              message: errorMessage,
            });
          }
        }

        dismissZIonLoader();
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

export default RegisterPage;
