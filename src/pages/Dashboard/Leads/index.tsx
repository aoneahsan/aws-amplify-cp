import {
  IonButton,
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
import { Lead, SearchLeadsQuery } from 'aws-amplify/graphql-api';
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
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { searchLeads } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import classNames from 'classnames';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { leadsListRStateAtom } from '@/RStore/Dashboard/LeadsRStates';
import ReloadButton from '@/components/ReloadButton';
import dayJS from 'dayjs';
import ActionButtons from '@/components/ActionButtons';
import { deleteAddress, deleteLead } from '@/graphql/mutations';
import MESSAGES from '@/utils/messages';
import { W_LOCATION } from '@/utils/helpers';
import { userAuthRStateAtom } from '@/RStore';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
import { IUserAuthData } from '@/types/UserTypes';
import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';

const LeadsListPage: React.FC = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const { presentZIonAlert } = useZIonAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const [leadsListState, setLeadsListState] =
    useRecoilState(leadsListRStateAtom);
  const resetLeadsListState = useResetRecoilState(leadsListRStateAtom);
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthRStateAtom);

  // useZAuthenticate([userAuthState?.id]); // not working yet

  useIonViewWillEnter(() => {
    void (async () => {
      try {
        if (!userAuthState?.id) {
          presentZIonLoader();

          const userSessionExists = await Auth.currentSession();
          if (userSessionExists) {
            const awsCognitoUserData =
              (await Auth.currentUserInfo()) as IAwsCurrentUserInfo;
            const userData: IUserAuthData =
              getUserAuthDataFromCurrentUserInfo(awsCognitoUserData);

            setUserAuthState(userData);
            dismissZIonLoader();
          }
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();

        await Auth.signOut();

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
  }, [userAuthState?.id]);

  const fetchLeadsData = useCallback(async () => {
    try {
      presentZIonLoader();

      const result = (await API.graphql(
        graphqlOperation(searchLeads)
      )) as GraphQLResult<SearchLeadsQuery>;

      if (result.data?.searchLeads?.items.length) {
        setLeadsListState(result.data?.searchLeads?.items as Lead[]);
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
  }, []);

  useIonViewWillEnter(() => {
    try {
      fetchLeadsData();
    } catch (error) {
      reportCustomError(error);
    }
  }, [fetchLeadsData]);

  const reloadLeadsData = useCallback(async () => {
    await fetchLeadsData();

    presentZIonToastSuccess();
  }, [fetchLeadsData]);

  const addNewLeadHandler = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.CREATE);

    // eslint-disable-next-line
  }, []);

  const handleLeadViewRequest = useCallback(async (leadId: string) => {
    try {
      zNavigatePushRoute(
        ROUTES.LEADS.VIEW.replace(routesDynamicParts.leadId, leadId)
      );
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const handleLeadEditRequest = useCallback(async (leadId: string) => {
    try {
      zNavigatePushRoute(
        ROUTES.LEADS.EDIT.replace(routesDynamicParts.leadId, leadId)
      );
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const handleLeadDeleteRequest = useCallback(async (leadData: Lead) => {
    try {
      presentZIonLoader();

      // delete lead data from other tables/storage first, then lead itself

      // delete profile image
      try {
        if (leadData?.profileImage) {
          await Storage.remove(leadData?.profileImage);
        }
      } catch (error) {
        reportCustomError(error);
      }

      // delete lead addresses
      if (leadData.addresses?.items?.length) {
        try {
          const _addresses = leadData.addresses?.items;
          if (_addresses?.length) {
            await new Promise(async (res, _) => {
              for (let i = 0; i < _addresses.length; i++) {
                try {
                  const _address = _addresses[i];
                  if (_address) {
                    await API.graphql(
                      graphqlOperation(deleteAddress, {
                        input: { id: _address.id },
                      })
                    );
                  }
                } catch (error) {
                  reportCustomError(error);
                }

                if (1 + 1 >= _addresses.length) {
                  res(true);
                }
              }
            });
          }
        } catch (error) {
          reportCustomError(error);
        }
      }

      await API.graphql(
        graphqlOperation(deleteLead, { input: { id: leadData.id } })
      );

      await reloadLeadsData();
    } catch (error) {
      reportCustomError(error);
      dismissZIonLoader();
      if (error instanceof Error) {
        const _errMessage = error?.message || MESSAGES.GENERAL.FAILED_MESSAGE;
        setTimeout(() => {
          presentZIonErrorAlert({ message: _errMessage });
        }, 500);
      }
    }
  }, []);

  return (
    <IonPage>
      <PageHeader pageTitle='Leads List Page' />
      <IonContent>
        <IonGrid>
          <IonRow className={classNames('mb-0')}>
            <IonCol size='12'>
              <IonCard className={classNames('ion-padding flex justify-end')}>
                <ReloadButton onClick={() => void reloadLeadsData()} />
                <IonButton onClick={addNewLeadHandler}>Add New Lead</IonButton>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonCard>
                <IonRow className={classNames('p-4')}>
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
                      <IonRow key={index} className={classNames('p-4')}>
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
                                      handleLeadDeleteRequest(el);
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
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LeadsListPage;
