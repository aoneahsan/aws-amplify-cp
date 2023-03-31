import { Auth } from '@aws-amplify/auth';
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
import React from 'react';
import { IGenericObject } from 'types/Generic';
import { isEmpty, isString } from 'underscore';
import isEmail from 'validator/lib/isEmail';

interface ILoginPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const LoginPage: React.FC<ILoginPageProps> = () => {
  console.count('re-rendered.');

  return (
    <IonPage>
      <PageHeader pageTitle='Login' />
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
                  Login Form
                </IonTitle>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={async (values) => {
                    try {
                      const result = (await Auth.signIn(
                        values.email,
                        values.password
                      )) as unknown;

                      console.log({ result });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  validate={(values) => {
                    const errors: IGenericObject = {};

                    if (isEmpty(values.email) || !isString(values.password)) {
                      errors.email = 'Email is required.';
                    } else if (!isEmail(values.email)) {
                      errors.email = 'Please enter a valid email.';
                    }

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
                                Submit
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

export default LoginPage;
