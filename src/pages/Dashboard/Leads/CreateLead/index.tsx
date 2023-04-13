import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { IonContent, IonPage, IonTitle } from '@ionic/react';
import {
  ListLeadsQuery,
  CreateLeadMutation,
  CreateLeadInput,
  Genders,
} from '@/aws-amplify/graphql-api';
import classNames from 'classnames';
import ZSubmitButton from '@/components/FormFields/SubmitButton';
import ZTextField from '@/components/FormFields/TextField';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import { createLead } from '@/graphql/mutations';
import { listLeads } from '@/graphql/queries';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedRStateSelector } from '@/RStore';
import { IGenericObject } from '@/types/Generic';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { VALIDATION_RULE } from '@/utils/enums';
import { validateFields } from '@/utils/helpers';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';

interface ICreateLeadPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const CreateLeadPage: React.FC<ICreateLeadPageProps> = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert, presentZIonUnAuthAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const isAuthenticatedState = useRecoilValue(isAuthenticatedRStateSelector);

  useEffect(() => {
    if (!isAuthenticatedState) {
      presentZIonUnAuthAlert();
    }

    // eslint-disable-next-line
  }, [isAuthenticatedState]);

  const checkCurrentLeads = useCallback(async () => {
    presentZIonLoader();
    const result = (await API.graphql(
      graphqlOperation(listLeads)
    )) as GraphQLResult<ListLeadsQuery>;
    dismissZIonLoader();

    // eslint-disable-next-line
  }, []);

  const handleFormSubmit = useCallback(async (values: CreateLeadInput) => {
    presentZIonLoader();
    try {
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
      dismissZIonLoader();

      if (errors?.length) {
        presentZIonErrorAlert({ message: errors[0].message });
      } else {
        presentZIonToastSuccess();
      }
      return true;
    } catch (error) {
      reportCustomError(error);
      dismissZIonLoader();
      return false;
    }
  }, []);

  const handleOnSuccessNavigate = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.LIST);
  }, []);

  return (
    <>
      <IonPage>
        <PageHeader pageTitle='Create New Lead' />
        <IonContent>
          <button onClick={() => void checkCurrentLeads()}>check leads</button>
          <PageCenterCardContainer>
            <IonTitle className={classNames('ion-text-center')}>
              Add New Lead
            </IonTitle>
            <Formik
              initialValues={{
                firstName: '',
                middleName: '',
                lastName: '',
                gender: Genders.Male,
              }}
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

export default CreateLeadPage;
