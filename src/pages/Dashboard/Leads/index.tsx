import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from '@ionic/react';
import { Lead } from 'aws-amplify/graphql-api';
import PageHeader from '@/components/GenericComponents/Header';
import NoDataFound from '@/components/NoDataFound';
import React, { useCallback, useEffect } from 'react';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';

interface ILeadsListPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const LeadsListPage: React.FC<ILeadsListPageProps> = () => {
  const { zNavigatePushRoute } = useZNavigate();
  const leadsData: Lead[] = [];

  useEffect(() => {
    try {
      console.log('okay');
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const addNewLeadHandler = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.CREATE);

    // eslint-disable-next-line
  }, []);
  return (
    <IonPage>
      <PageHeader pageTitle='Leads List Page' />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle size='small'>No.</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle size='small'>First Name</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle size='small'>Middle Name</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle size='small'>Last Name</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle size='small'>Gender</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle size='small'>Created At</IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle size='small'>Updated At</IonTitle>
            </IonCol>
          </IonRow>
          {/* Found Leads Data */}
          {leadsData.length &&
            leadsData.map((el, index) => {
              return (
                <IonRow>
                  <IonCol>
                    <IonText>{index + 1}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>{el.firstName}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>{el.middleName}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>{el.lastName}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>{el.gender}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>{el.createdAt}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonText>{el.updatedAt}</IonText>
                  </IonCol>
                </IonRow>
              );
            })}

          {/* No Leads Data Found */}
          {!leadsData.length && (
            <>
              <NoDataFound onClick={addNewLeadHandler} />
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LeadsListPage;
