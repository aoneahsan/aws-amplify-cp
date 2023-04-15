import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  Lead,
  GetLeadQuery,
  DeleteAddressMutation,
} from '@/aws-amplify/graphql-api';
import classNames from 'classnames';
import PageHeader from '@/components/GenericComponents/Header';
import { getLead } from '@/graphql/queries';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedRStateSelector, userAuthRStateAtom } from '@/RStore';
import ROUTES, { routesDynamicParts } from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { W_LOCATION } from '@/utils/helpers';
import {
  useZIonAlert,
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';
import { useParams } from 'react-router';
import { IRouteParamsKeys } from '@/types/ZaionsReactRouterTypes.type';
import { Auth, Storage } from 'aws-amplify';
import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';
import { IUserAuthData } from '@/types/UserTypes';
import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import NoDataFound from '@/components/NoDataFound';
import { UserAvatarPlaceholder } from '@/assets/images';
import { pencil, trash } from 'ionicons/icons';
import { deleteAddress, deleteLead } from '@/graphql/mutations';
import ReloadButton from '@/components/ReloadButton';
import ActionButtons from '@/components/ActionButtons';

const ViewLeadPage: React.FC = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonErrorAlert, presentZIonUnAuthAlert } = useZIonErrorAlert();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonAlert } = useZIonAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const isAuthenticatedState = useRecoilValue(isAuthenticatedRStateSelector);
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { leadId } = useParams<IRouteParamsKeys>();
  const [compState, setCompState] = React.useState<{
    processing: boolean;
    leadData: Lead | null;
    leadProfileImage?: string;
  }>({ processing: true, leadData: null, leadProfileImage: undefined });

  useEffect(() => {
    if (!compState.processing && !isAuthenticatedState) {
      presentZIonUnAuthAlert();
    }

    // eslint-disable-next-line
  }, [isAuthenticatedState, compState.processing]);

  const fetchAndSetLeadData = useCallback(async () => {
    if (leadId) {
      const result = (await API.graphql(
        graphqlOperation(getLead, { id: leadId })
      )) as GraphQLResult<GetLeadQuery>;

      if (result.data?.getLead?.id) {
        setCompState((oldVal) => ({
          ...oldVal,
          processing: false,
          leadData: result.data?.getLead as Lead,
        }));
        return true;
      } else {
        setCompState((oldVal) => ({
          ...oldVal,
          processing: false,
          leadData: null,
        }));
        presentZIonErrorAlert({
          message: 'No Lead Data found!',
          buttons: [
            {
              text: 'Okay',
              role: 'cancel',
              handler: () => {
                zNavigatePushRoute(ROUTES.LEADS.LIST);
              },
            },
          ],
        });
        return false;
      }
    }
  }, [leadId]);

  useIonViewWillEnter(() => {
    void (async () => {
      presentZIonLoader();
      setCompState((oldVal) => ({ ...oldVal, processing: true }));

      try {
        const userSessionExists = await Auth.currentSession();
        if (userSessionExists) {
          const awsCognitoUserData =
            (await Auth.currentUserInfo()) as IAwsCurrentUserInfo;
          const userData: IUserAuthData =
            getUserAuthDataFromCurrentUserInfo(awsCognitoUserData);

          // fetch the lead Data
          if (leadId) {
            fetchAndSetLeadData();
          } else {
            setCompState((oldVal) => ({
              ...oldVal,
              processing: false,
            }));
          }

          setUserAuthState(userData);
          dismissZIonLoader();
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();
        setCompState((oldVal) => ({ ...oldVal, processing: false }));

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
  }, [fetchAndSetLeadData]);

  useIonViewDidLeave(() => {
    setCompState((oldVal) => ({
      ...oldVal,
      leadData: null,
      leadProfileImage: undefined,
    }));
  }, []);

  const reloadLeadData = useCallback(async () => {
    try {
      const result = await fetchAndSetLeadData();

      if (result) {
        presentZIonToastSuccess();
      }
      return result;
    } catch (error) {
      reportCustomError(error);
      presentZIonErrorAlert();
    }
  }, []);

  const addNewLeadHandler = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.CREATE);

    // eslint-disable-next-line
  }, []);

  const handleAddNewAddressRequest = useCallback(() => {
    if (leadId) {
      zNavigatePushRoute(
        ROUTES.LEADS.ADD_ADDRESS.replace(routesDynamicParts.leadId, leadId)
      );
    } else {
      presentZIonErrorAlert({
        message: 'No Lead id found',
        subHeader: 'No Lead Data Found',
      });
    }

    // eslint-disable-next-line
  }, [leadId]);

  const handleLeadAddressEditRequest = useCallback(
    (_addressId: string) => {
      if (leadId && _addressId) {
        zNavigatePushRoute(
          ROUTES.LEADS.EDIT_ADDRESS.replace(
            routesDynamicParts.leadId,
            leadId
          ).replace(routesDynamicParts.leadAddressId, _addressId)
        );
      } else {
        presentZIonErrorAlert({
          message: 'No Lead id found',
          subHeader: 'No Lead Data Found',
        });
      }

      // eslint-disable-next-line
    },
    [leadId]
  );

  const handleLeadAddressDeleteRequest = useCallback(
    async (_addressId: string) => {
      try {
        if (leadId && _addressId) {
          presentZIonLoader();
          const { errors } = (await API.graphql(
            graphqlOperation(deleteAddress, { input: { id: _addressId } })
          )) as GraphQLResult<DeleteAddressMutation>;
          if (errors?.length) {
            presentZIonErrorAlert({ message: errors[0].message });
          } else {
            presentZIonToastSuccess();
            await reloadLeadData();
          }
          dismissZIonLoader();
        } else {
          presentZIonErrorAlert({
            message: 'No Lead id found',
            subHeader: 'No Lead Data Found',
          });
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();
        presentZIonErrorAlert();
      }

      // eslint-disable-next-line
    },
    [leadId]
  );

  const handleLeadEditRequest = useCallback(async (leadId: string) => {
    try {
      zNavigatePushRoute(
        ROUTES.LEADS.EDIT.replace(routesDynamicParts.leadId, leadId)
      );
    } catch (error) {
      reportCustomError(error);
    }
  }, []);

  const handleLeadDeleteRequest = useCallback(async (leadId: string) => {
    try {
      presentZIonLoader();

      await API.graphql(
        graphqlOperation(deleteLead, { input: { id: leadId } })
      );

      dismissZIonLoader();
      presentZIonToastSuccess();

      zNavigatePushRoute(ROUTES.LEADS.LIST);
    } catch (error) {
      reportCustomError(error);
      dismissZIonLoader();
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      if (compState.leadData?.profileImage) {
        const imageUrl = await Storage.get(compState.leadData?.profileImage);
        if (imageUrl) {
          setCompState((oldVal) => ({ ...oldVal, leadProfileImage: imageUrl }));
        }
      }
    })();
  }, [compState.leadData?.profileImage]);

  const handleAddNewContactRequest = useCallback(() => {
    if (leadId) {
      zNavigatePushRoute(
        ROUTES.LEADS.ADD_CONTACT.replace(routesDynamicParts.leadId, leadId)
      );
    } else {
      presentZIonErrorAlert({
        message: 'No Lead id found',
        subHeader: 'No Lead Data Found',
      });
    }

    // eslint-disable-next-line
  }, [leadId]);

  const handleLeadContactEditRequest = useCallback(
    (_contactId: string) => {
      if (leadId && _contactId) {
        zNavigatePushRoute(
          ROUTES.LEADS.EDIT_CONTACT.replace(
            routesDynamicParts.leadId,
            leadId
          ).replace(routesDynamicParts.leadContactId, _contactId)
        );
      } else {
        presentZIonErrorAlert({
          message: 'No Lead id found',
          subHeader: 'No Lead Data Found',
        });
      }

      // eslint-disable-next-line
    },
    [leadId]
  );

  const handleLeadContactDeleteRequest = useCallback(
    async (_contactId: string) => {
      try {
        if (leadId && _contactId) {
          presentZIonLoader();
          const { errors } = (await API.graphql(
            graphqlOperation(deleteContact, { input: { id: _contactId } })
          )) as GraphQLResult<DeleteContactMutation>;
          if (errors?.length) {
            presentZIonErrorAlert({ message: errors[0].message });
          } else {
            presentZIonToastSuccess();
            await reloadLeadData();
          }
          dismissZIonLoader();
        } else {
          presentZIonErrorAlert({
            message: 'No Lead id found',
            subHeader: 'No Lead Data Found',
          });
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();
        presentZIonErrorAlert();
      }

      // eslint-disable-next-line
    },
    [leadId]
  );

  return (
    <>
      <IonPage>
        <PageHeader pageTitle={'View Lead Info'} />
        <IonContent>
          <>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonTitle className={classNames('ion-text-center')}>
                    Lead Info
                  </IonTitle>
                </IonCol>
              </IonRow>
              <IonRow className={classNames('mb-0')}>
                <IonCol size='12'>
                  <IonCard
                    className={classNames('ion-padding flex justify-end')}
                  >
                    <ReloadButton onClick={() => void reloadLeadData()} />
                    <ActionButtons
                      isButtonsGroup={false}
                      size='default'
                      onEdit={() => handleLeadEditRequest(leadId!)}
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
                                handleLeadDeleteRequest(leadId!);
                              },
                            },
                          ],
                        });
                      }}
                    />
                  </IonCard>
                </IonCol>
              </IonRow>
              {compState.leadData && (
                <>
                  <IonCard className={classNames('ion-padding mb-4')}>
                    <IonRow>
                      <IonCol
                        size='12'
                        className={classNames(
                          'flex justify-center items-center mb-3'
                        )}
                      >
                        <IonImg
                          src={
                            compState.leadProfileImage || UserAvatarPlaceholder
                          }
                          style={{ width: '100px' }}
                        />
                      </IonCol>
                      <IonCol
                        className={classNames(
                          'flex justify-between items-center bg-slate-200 border-white border-4 pr-6'
                        )}
                        size='6'
                      >
                        <IonTitle className={classNames('font-bold')}>
                          First Name:
                        </IonTitle>
                        <IonText>{compState.leadData.firstName}</IonText>
                      </IonCol>
                      <IonCol
                        className={classNames(
                          'flex justify-between items-center bg-slate-200 border-white border-4 pr-6'
                        )}
                        size='6'
                      >
                        <IonTitle className={classNames('font-bold')}>
                          Middle Name:
                        </IonTitle>
                        <IonText>{compState.leadData.middleName}</IonText>
                      </IonCol>
                      <IonCol
                        className={classNames(
                          'flex justify-between items-center bg-slate-200 border-white border-4 pr-6'
                        )}
                        size='6'
                      >
                        <IonTitle className={classNames('font-bold')}>
                          Last Name:
                        </IonTitle>
                        <IonText>{compState.leadData.lastName}</IonText>
                      </IonCol>
                      <IonCol
                        className={classNames(
                          'flex justify-between items-center bg-slate-200 border-white border-4 pr-6'
                        )}
                        size='6'
                      >
                        <IonTitle className={classNames('font-bold')}>
                          Gender:
                        </IonTitle>
                        <IonText>{compState.leadData.gender}</IonText>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                  <IonCard className={classNames('ion-padding')}>
                    <IonRow>
                      <IonCol
                        size='12'
                        className={classNames(
                          'flex justify-between items-center mb-1'
                        )}
                      >
                        <IonTitle>Addresses</IonTitle>
                        <IonButton onClick={handleAddNewAddressRequest}>
                          Add New Address
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    {compState.leadData.addresses?.items.length ? (
                      <>
                        <IonRow>
                          {compState.leadData.addresses?.items.map(
                            (_address, index) => {
                              return (
                                <IonCol
                                  className={classNames(
                                    'bg-slate-100 border-white border-4 mb-3'
                                  )}
                                  size='12'
                                  sizeLg='6'
                                  key={index}
                                >
                                  <IonRow>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          'w-full  justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Line1:
                                        </IonTitle>
                                        <IonText>
                                          {_address?.line1 || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Line2:
                                        </IonTitle>
                                        <IonText>
                                          {_address?.line2 || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Country:
                                        </IonTitle>
                                        <IonText>
                                          {_address?.country || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          State:
                                        </IonTitle>
                                        <IonText>
                                          {_address?.state || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          City:
                                        </IonTitle>
                                        <IonText>
                                          {_address?.city || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Address Type:
                                        </IonTitle>
                                        <IonText>
                                          {_address?.type || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol
                                      size='12'
                                      className={classNames(
                                        'mt-2 flex justify-between'
                                      )}
                                    >
                                      <IonButton
                                        color={'warning'}
                                        onClick={() => {
                                          if (_address) {
                                            handleLeadAddressEditRequest(
                                              _address.id
                                            );
                                          } else {
                                            presentZIonErrorAlert({
                                              message: 'No address id found',
                                            });
                                          }
                                        }}
                                      >
                                        <IonIcon icon={pencil} />
                                        Edit
                                      </IonButton>
                                      <IonButton
                                        color={'danger'}
                                        onClick={() => {
                                          if (_address) {
                                            presentZIonAlert({
                                              header: 'Delete Lead Address',
                                              subHeader:
                                                'Remove selected address from lead data.',
                                              message:
                                                'Are you sure you want to delete this address from lead data?',
                                              buttons: [
                                                {
                                                  text: 'Cancel',
                                                  role: 'cancel',
                                                },
                                                {
                                                  text: 'Yes',
                                                  role: 'delete',
                                                  handler: () => {
                                                    handleLeadAddressDeleteRequest(
                                                      _address.id
                                                    );
                                                  },
                                                },
                                              ],
                                            });
                                          } else {
                                            presentZIonErrorAlert({
                                              message: 'No address id found',
                                            });
                                          }
                                        }}
                                      >
                                        <IonIcon icon={trash} />
                                        Delete
                                      </IonButton>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              );
                            }
                          )}
                        </IonRow>
                      </>
                    ) : (
                      <NoDataFound onClick={handleAddNewAddressRequest} />
                    )}
                  </IonCard>
                  <IonCard className={classNames('ion-padding')}>
                    <IonRow>
                      <IonCol
                        size='12'
                        className={classNames(
                          'flex justify-between items-center mb-1'
                        )}
                      >
                        <IonTitle>Contacts</IonTitle>
                        <IonButton onClick={handleAddNewContactRequest}>
                          Add New Contact
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    {compState.leadData.contacts?.items.length ? (
                      <>
                        <IonRow>
                          {compState.leadData.contacts?.items.map(
                            (_contact, index) => {
                              return (
                                <IonCol
                                  className={classNames(
                                    'bg-slate-100 border-white border-4 mb-3'
                                  )}
                                  size='12'
                                  sizeLg='6'
                                  key={index}
                                >
                                  <IonRow>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          'w-full  justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Contact Info:
                                        </IonTitle>
                                        <IonText>
                                          {_contact?.contactValue || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Description:
                                        </IonTitle>
                                        <IonText>
                                          {_contact?.description || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Category:
                                        </IonTitle>
                                        <IonText>
                                          {_contact?.category || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol size='12' sizeMd='6'>
                                      <IonItem
                                        className={classNames(
                                          ' justify-between items-center mb-1'
                                        )}
                                      >
                                        <IonTitle
                                          className={classNames('font-bold')}
                                        >
                                          Contact Type:
                                        </IonTitle>
                                        <IonText>
                                          {_contact?.type || '-'}
                                        </IonText>
                                      </IonItem>
                                    </IonCol>
                                    <IonCol
                                      size='12'
                                      className={classNames(
                                        'mt-2 flex justify-between'
                                      )}
                                    >
                                      <IonButton
                                        color={'warning'}
                                        onClick={() => {
                                          if (_contact) {
                                            handleLeadContactEditRequest(
                                              _contact.id
                                            );
                                          } else {
                                            presentZIonErrorAlert({
                                              message: 'No Contact id found',
                                            });
                                          }
                                        }}
                                      >
                                        <IonIcon icon={pencil} />
                                        Edit
                                      </IonButton>
                                      <IonButton
                                        color={'danger'}
                                        onClick={() => {
                                          if (_contact) {
                                            presentZIonAlert({
                                              header: 'Delete Lead Contact',
                                              subHeader:
                                                'Remove selected Contact from lead data.',
                                              message:
                                                'Are you sure you want to delete this Contact from lead data?',
                                              buttons: [
                                                {
                                                  text: 'Cancel',
                                                  role: 'cancel',
                                                },
                                                {
                                                  text: 'Yes',
                                                  role: 'delete',
                                                  handler: () => {
                                                    handleLeadContactDeleteRequest(
                                                      _contact.id
                                                    );
                                                  },
                                                },
                                              ],
                                            });
                                          } else {
                                            presentZIonErrorAlert({
                                              message: 'No Contact id found',
                                            });
                                          }
                                        }}
                                      >
                                        <IonIcon icon={trash} />
                                        Delete
                                      </IonButton>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              );
                            }
                          )}
                        </IonRow>
                      </>
                    ) : (
                      <NoDataFound onClick={handleAddNewContactRequest} />
                    )}
                  </IonCard>
                </>
              )}
              {!compState.leadData && (
                <NoDataFound onClick={addNewLeadHandler} />
              )}
            </IonGrid>
          </>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ViewLeadPage;
