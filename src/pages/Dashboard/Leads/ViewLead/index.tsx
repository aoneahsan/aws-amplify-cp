import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  CreateLeadMutation,
  CreateLeadInput,
  Genders,
  Lead,
  GetLeadQuery,
} from '@/aws-amplify/graphql-api';
import classNames from 'classnames';
import ZSubmitButton from '@/components/FormFields/SubmitButton';
import ZTextField from '@/components/FormFields/TextField';
import PageHeader from '@/components/GenericComponents/Header';
import PageCenterCardContainer from '@/components/PageCenterCardContainer';
import { Form, Formik } from 'formik';
import { createLead, updateLead } from '@/graphql/mutations';
import { getLead } from '@/graphql/queries';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedRStateSelector, userAuthRStateAtom } from '@/RStore';
import { IGenericObject } from '@/types/Generic';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { VALIDATION_RULE } from '@/utils/enums';
import { validateFields, W_LOCATION } from '@/utils/helpers';
import {
  useZIonErrorAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';
import { useParams } from 'react-router';
import { IRouteParamsKeys } from '@/types/ZaionsReactRouterTypes.type';
import { Auth } from 'aws-amplify';
import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';
import { IUserAuthData } from '@/types/UserTypes';
import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import NoDataFound from '@/components/NoDataFound';
import { UserAvatarPlaceholder } from '@/assets/images';

const ViewLeadPage: React.FC = () => {
  const { dismissZIonLoader, presentZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const { presentZIonErrorAlert, presentZIonUnAuthAlert } = useZIonErrorAlert();
  const { zNavigatePushRoute } = useZNavigate();
  const isAuthenticatedState = useRecoilValue(isAuthenticatedRStateSelector);
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { leadId } = useParams<IRouteParamsKeys>();
  const [compState, setCompState] = React.useState<{
    processing: boolean;
    leadData: Lead | null;
  }>({ processing: true, leadData: null });

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
            const result = (await API.graphql(
              graphqlOperation(getLead, { id: leadId })
            )) as GraphQLResult<GetLeadQuery>;

            if (result.data?.getLead?.id) {
              setCompState((oldVal) => ({
                ...oldVal,
                processing: false,
                leadData: result.data?.getLead as Lead,
              }));
            }
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
  });

  useEffect(() => {
    if (!compState.processing && !isAuthenticatedState) {
      presentZIonUnAuthAlert();
    }

    // eslint-disable-next-line
  }, [isAuthenticatedState, compState.processing]);

  const handleOnSuccessNavigate = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.LIST);
  }, []);

  const addNewLeadHandler = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.CREATE);

    // eslint-disable-next-line
  }, []);

  const handleAddNewAddressRequest = useCallback(() => {
    zNavigatePushRoute(ROUTES.LEADS.ADD_ADDRESS);

    // eslint-disable-next-line
  }, []);

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
                          src={UserAvatarPlaceholder}
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
                                    'bg-slate-100 border-white border-4 pr-6 mb-3'
                                  )}
                                  size='12'
                                  sizeLg='6'
                                  key={index}
                                >
                                  <IonItem
                                    className={classNames(
                                      'flex justify-between items-center mb-1'
                                    )}
                                  >
                                    <IonTitle
                                      className={classNames('font-bold')}
                                    >
                                      Line1:
                                    </IonTitle>
                                    <IonText>{_address?.line1}</IonText>
                                  </IonItem>
                                  <IonItem
                                    className={classNames(
                                      'flex justify-between items-center mb-1'
                                    )}
                                  >
                                    <IonTitle
                                      className={classNames('font-bold')}
                                    >
                                      Line2:
                                    </IonTitle>
                                    <IonText>{_address?.line2}</IonText>
                                  </IonItem>
                                  <IonItem
                                    className={classNames(
                                      'flex justify-between items-center mb-1'
                                    )}
                                  >
                                    <IonTitle
                                      className={classNames('font-bold')}
                                    >
                                      Country:
                                    </IonTitle>
                                    <IonText>{_address?.country}</IonText>
                                  </IonItem>
                                  <IonItem
                                    className={classNames(
                                      'flex justify-between items-center mb-1'
                                    )}
                                  >
                                    <IonTitle
                                      className={classNames('font-bold')}
                                    >
                                      State:
                                    </IonTitle>
                                    <IonText>{_address?.state}</IonText>
                                  </IonItem>
                                  <IonItem
                                    className={classNames(
                                      'flex justify-between items-center mb-1'
                                    )}
                                  >
                                    <IonTitle
                                      className={classNames('font-bold')}
                                    >
                                      City:
                                    </IonTitle>
                                    <IonText>{_address?.city}</IonText>
                                  </IonItem>
                                  <IonItem
                                    className={classNames(
                                      'flex justify-between items-center mb-1'
                                    )}
                                  >
                                    <IonTitle
                                      className={classNames('font-bold')}
                                    >
                                      Address Type:
                                    </IonTitle>
                                    <IonText>{_address?.type}</IonText>
                                  </IonItem>
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
