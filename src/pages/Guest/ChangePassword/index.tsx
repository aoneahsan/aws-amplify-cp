import { Auth, CognitoUser } from '@aws-amplify/auth';
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  useIonViewWillEnter,
} from '@ionic/react';
import classNames from 'classnames';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { IGenericObject } from '@/types/Generic';
import { isEmpty, isString } from 'underscore';
import { IonLoadersIDs } from '@/utils/constants';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import { checkAndReturnAwsAmplifyErrorType } from '@/utils/helpers/aws-amplify';
import MESSAGES from '@/utils/messages';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';

// Please note i duplicated this component from "NewSigninChangePassword", but we will use this for existing user password update request and we will use "NewSigninChangePassword" for newly signed in user (those who signin for the first time), as they need to update there password if they get a "FORCE_PASSWORD_UPDATE" challenge.
interface IChangePasswordProps {
  signedInUserData?: CognitoUser;
}

const ChangePassword: React.FC<IChangePasswordProps> = ({
  signedInUserData,
}) => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(
    IonLoadersIDs.AuthScreenLoader
  );
  const { presentZIonToastSuccess } = useZIonToastSuccess();

  useIonViewWillEnter(() => {
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

  useEffect(() => {
    if (!signedInUserData) {
      void presentZIonErrorAlert({
        message: 'User Auth Data not found, please try logging in again.',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              zNavigatePushRoute(ROUTES.LOGIN);
            },
          },
        ],
      });
    }

    // eslint-disable-next-line
  }, [signedInUserData]);

  return (
    <IonPage>
      <PageHeader pageTitle='Change Password' />
      <IonContent>
        <PageCenterCardContainer>
          <IonTitle className={classNames('ion-text-center')}>
            Change Password Form
          </IonTitle>
          <Formik
            initialValues={{
              password: '',
            }}
            validate={(values) => {
              const errors: IGenericObject = {};

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
                (await Auth.completeNewPassword(
                  signedInUserData,
                  values.password
                )) as CognitoUser;

                presentZIonToastSuccess('Password Updated Successfully!');
                // reset form

                resetForm({
                  values: {
                    password: '',
                  },
                });
                zNavigatePushRoute(ROUTES.DASHBOARD);
              } catch (error) {
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
                      <IonCol
                        size='12'
                        className={classNames('ion-no-padding')}
                      >
                        <IonButton
                          className={classNames('ion-no-margin')}
                          color='primary'
                          fill='solid'
                          type='submit'
                          size='default'
                          expand='full'
                          disabled={isSubmitting || !isValid}
                        >
                          Update Password
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </Form>
                </>
              );
            }}
          </Formik>
        </PageCenterCardContainer>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
