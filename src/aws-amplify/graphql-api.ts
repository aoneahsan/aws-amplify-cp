/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateLeadInput = {
  id?: string | null,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  gender?: Genders | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export enum Genders {
  Male = "Male",
  Female = "Female",
}


export type ModelLeadConditionInput = {
  firstName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  gender?: ModelGendersInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLeadConditionInput | null > | null,
  or?: Array< ModelLeadConditionInput | null > | null,
  not?: ModelLeadConditionInput | null,
};

export type ModelGendersInput = {
  eq?: Genders | null,
  ne?: Genders | null,
};

export type Lead = {
  __typename: "Lead",
  id: string,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  gender?: Genders | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateLeadInput = {
  id: string,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  gender?: Genders | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteLeadInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelLeadFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  gender?: ModelGendersInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLeadFilterInput | null > | null,
  or?: Array< ModelLeadFilterInput | null > | null,
  not?: ModelLeadFilterInput | null,
};

export type ModelLeadConnection = {
  __typename: "ModelLeadConnection",
  items:  Array<Lead | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  middleName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionLeadFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  middleName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLeadFilterInput | null > | null,
  or?: Array< ModelSubscriptionLeadFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateLeadMutationVariables = {
  input: CreateLeadInput,
  condition?: ModelLeadConditionInput | null,
};

export type CreateLeadMutation = {
  createLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateLeadMutationVariables = {
  input: UpdateLeadInput,
  condition?: ModelLeadConditionInput | null,
};

export type UpdateLeadMutation = {
  updateLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteLeadMutationVariables = {
  input: DeleteLeadInput,
  condition?: ModelLeadConditionInput | null,
};

export type DeleteLeadMutation = {
  deleteLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLeadQueryVariables = {
  id: string,
};

export type GetLeadQuery = {
  getLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListLeadsQueryVariables = {
  filter?: ModelLeadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLeadsQuery = {
  listLeads?:  {
    __typename: "ModelLeadConnection",
    items:  Array< {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateLeadSubscriptionVariables = {
  filter?: ModelSubscriptionLeadFilterInput | null,
};

export type OnCreateLeadSubscription = {
  onCreateLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateLeadSubscriptionVariables = {
  filter?: ModelSubscriptionLeadFilterInput | null,
};

export type OnUpdateLeadSubscription = {
  onUpdateLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteLeadSubscriptionVariables = {
  filter?: ModelSubscriptionLeadFilterInput | null,
};

export type OnDeleteLeadSubscription = {
  onDeleteLead?:  {
    __typename: "Lead",
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    gender?: Genders | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};
