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
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userAuthRStateAtom } from 'RStore';
import { IGenericObject } from 'types/Generic';
import { isEmpty, isString } from 'underscore';
import { IonLoadersIDs } from 'utils/constants';
import ROUTES from 'utils/constants/routesConstants';
import { reportCustomError } from 'utils/customError';
import { AwsErrorTypeEnum } from 'utils/enums/aws-amplify';
import { zConsoleLog } from 'utils/helpers';
import { checkAndReturnAwsAmplifyErrorType } from 'utils/helpers/aws-amplify';
import MESSAGES from 'utils/messages';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from 'ZaionsHooks/zionic-hooks';
import { useZNavigate } from 'ZaionsHooks/zrouter-hooks';

interface ILoginPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const ChangePassword: React.FC<ILoginPageProps> = () => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading(
    IonLoadersIDs.AuthScreenLoader
  );
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const userAuthState = useRecoilValue(userAuthRStateAtom);

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

  useEffect(() => {
    if (!userAuthState) {
      void presentZIonErrorAlert({
        message: 'User Auth Data not found, please try logging in again.',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              console.log('tried');
              zNavigatePushRoute(ROUTES.LOGIN);
              console.log('worked?');
            },
          },
        ],
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <IonPage>
      <PageHeader pageTitle='Change Password' />
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
                  Change Password Form
                </IonTitle>
                <Formik
                  initialValues={{
                    password: '',
                  }}
                  validate={(values) => {
                    const errors: IGenericObject = {};

                    if (
                      isEmpty(values.password) ||
                      !isString(values.password)
                    ) {
                      errors.password = 'Password is required.';
                    } else if (values.password.length < 6) {
                      errors.password =
                        'Password must be at least 6 character long.';
                    }

                    return errors;
                  }}
                  onSubmit={async (values) => {
                    await presentZIonLoader();
                    try {
                      const result = (await Auth.completeNewPassword(
                        userAuthState,
                        values.password
                      )) as CognitoUser;

                      zConsoleLog({
                        message: 'completeNewPassword request completed',
                        data: { result },
                      });

                      await presentZIonToastSuccess(
                        'Password Updated Successfully!'
                      );

                      zNavigatePushRoute(ROUTES.DASHBOARD);
                    } catch (error) {
                      console.error({ error });
                      if (error instanceof Error) {
                        const awsErrorType = checkAndReturnAwsAmplifyErrorType(
                          error.name
                        );

                        let errorMessage = MESSAGES.GENERAL.FAILED;
                        if (
                          awsErrorType ===
                          AwsErrorTypeEnum.UserNotFoundException
                        ) {
                          errorMessage = MESSAGES.GENERAL.USER.NOT_FOUND;
                        }

                        await presentZIonErrorAlert({
                          message: errorMessage,
                        });
                      }
                    }

                    await dismissZIonLoader();
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
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
