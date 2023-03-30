import {
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
} from '@ionic/react';
import PageHeader from 'components/GenericComponents/Header';
import { Formik } from 'formik';
import React from 'react';

interface ILoginPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const LoginPage: React.FC<ILoginPageProps> = () => {
  return (
    <IonPage>
      <PageHeader pageTitle='Login' />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, { resetForm }) => {
                  console.log({ values, resetForm });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                }) => {
                  console.log({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                  });
                  return (
                    <>
                      <form>
                        <IonInput />
                      </form>
                    </>
                  );
                }}
              </Formik>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
