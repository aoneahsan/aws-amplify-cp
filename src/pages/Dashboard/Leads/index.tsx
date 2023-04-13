import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonViewWillEnter,
} from '@ionic/react';
import { Lead, ListLeadsQuery } from 'aws-amplify/graphql-api';
import PageHeader from '@/components/GenericComponents/Header';
import NoDataFound from '@/components/NoDataFound';
import React, { useCallback } from 'react';
import ROUTES, { routesDynamicParts } from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { API, graphqlOperation } from 'aws-amplify';
import { listLeads } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import classNames from 'classnames';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { leadsListRStateAtom } from '@/RStore/Dashboard/LeadsRStates';
import ReloadButton from '@/components/ReloadButton';
import dayJS from 'dayjs';
import ActionButtons from '@/components/ActionButtons';
import { deleteLead } from '@/graphql/mutations';

interface ILeadsListPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const LeadsListPage: React.FC<ILeadsListPageProps> = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const [leadsListState, setLeadsListState] =
    useRecoilState(leadsListRStateAtom);
  const resetLeadsListState = useResetRecoilState(leadsListRStateAtom);

  useIonViewWillEnter(() => {
    try {
      fetchLeadsData();
    } catch (error) {
      reportCustomError(error);
    }
  });

  const fetchLeadsData = useCallback(async () => {
    try {
      presentZIonLoader();

      const result = (await API.graphql(
        graphqlOperation(listLeads)
      )) as GraphQLResult<ListLeadsQuery>;

      if (result.data?.listLeads?.items.length) {
        setLeadsListState(result.data?.listLeads?.items as Lead[]);
      } else {
        resetLeadsListState();
      }

      dismissZIonLoader();
    } catch (error) {
      reportCustomError(error);
      dismissZIonLoader();
      if (error instanceof Error) {
        presentZIonErrorAlert({ message: error.message });
      }
    }
  }, [setLeadsListState]);

  const reloadLeadsData = useCallback(async () => {
    await fetchLeadsData();

    presentZIonToastSuccess();
  }, [fetchLeadsData]);

  const addNewLeadHandler = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.CREATE);

    // eslint-disable-next-line
  }, []);

  const handleLeadViewRequest = async (leadId: string) => {
    try {
      zNavigatePushRoute(
        ROUTES.LEADS.VIEW.replace(routesDynamicParts.leadId, leadId)
      );
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleLeadEditRequest = async (leadId: string) => {
    try {
      zNavigatePushRoute(
        ROUTES.LEADS.EDIT.replace(routesDynamicParts.leadId, leadId)
      );
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleLeadDeleteRequest = async (leadId: string) => {
    try {
      presentZIonLoader();

      const result = await API.graphql(
        graphqlOperation(deleteLead, { input: { id: leadId } })
      );

      await reloadLeadsData();
    } catch (error) {
      reportCustomError(error);
      dismissZIonLoader();
    }
  };

  return (
    <IonPage>
      <PageHeader pageTitle='Leads List Page' />
      <IonContent>
        <IonGrid>
          <IonRow className={classNames('mb-0')}>
            <IonCol size='12'>
              <IonCard className={classNames('ion-padding flex justify-end')}>
                <ReloadButton onClick={() => void reloadLeadsData()} />
              </IonCard>
            </IonCol>
          </IonRow>
          <IonCol size='6' offsetLg='2'>
            <IonCard className={classNames('px-4')}>
              <IonRow>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    No.
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    First Name
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    Middle Name
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    Last Name
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    Gender
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    Created At
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    Updated At
                  </IonTitle>
                </IonCol>
                <IonCol>
                  <IonTitle
                    className={classNames('ion-no-padding font-bold')}
                    size='small'
                  >
                    Actions
                  </IonTitle>
                </IonCol>
              </IonRow>
              {/* Found Leads Data */}
              {leadsListState.length &&
                leadsListState.map((el, index) => {
                  return (
                    <IonRow key={index}>
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
                        <IonText>
                          {el.createdAt
                            ? dayJS(el.createdAt).format('DD-MM-YYYY')
                            : '-'}
                        </IonText>
                      </IonCol>
                      <IonCol>
                        <IonText>
                          {el.updatedAt
                            ? dayJS(el.updatedAt).format('DD-MM-YYYY')
                            : '-'}
                        </IonText>
                      </IonCol>
                      <IonCol>
                        <ActionButtons
                          onView={() => handleLeadViewRequest(el.id)}
                          onEdit={() => handleLeadEditRequest(el.id)}
                          onDelete={() => {
                            presentZIonAlert({
                              header: 'Delete Lead',
                              subHeader: 'Delete Lead from system.',
                              message:
                                'Are you sure you want to delete this lead data?',
                              buttons: [
                                {
                                  text: 'Cancel',
                                  role: 'cancel',
                                },
                                {
                                  text: 'Yes',
                                  role: 'delete',
                                  handler: () => {
                                    handleLeadDeleteRequest(el.id);
                                  },
                                },
                              ],
                            });
                          }}
                        />
                      </IonCol>
                    </IonRow>
                  );
                })}

              {/* No Leads Data Found */}
              {!leadsListState.length && (
                <>
                  <NoDataFound onClick={addNewLeadHandler} />
                </>
              )}
            </IonCard>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LeadsListPage;
