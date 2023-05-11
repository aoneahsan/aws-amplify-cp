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
  leads?: ModelLeadConnection | null,
  notes?: ModelNoteConnection | null,
};

export type ModelLeadConnection = {
  __typename: "ModelLeadConnection",
  items:  Array<Lead | null >,
  nextToken?: string | null,
};

export type Lead = {
  __typename: "Lead",
  id: string,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  gender?: Genders | null,
  profileImage?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  creator?: User | null,
  addresses?: ModelAddressConnection | null,
  contacts?: ModelContactConnection | null,
  notes?: ModelNoteConnection | null,
  userLeadsId?: string | null,
};

export enum Genders {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}


export type ModelAddressConnection = {
  __typename: "ModelAddressConnection",
  items:  Array<Address | null >,
  nextToken?: string | null,
};

export type Address = {
  __typename: "Address",
  id: string,
  country?: string | null,
  state?: string | null,
  city?: string | null,
  line1?: string | null,
  line2?: string | null,
  type?: AddressTypes | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  lead?: Lead | null,
  leadAddressesId?: string | null,
};

export enum AddressTypes {
  Work = "Work",
  Home = "Home",
  Other = "Other",
}


export type ModelContactConnection = {
  __typename: "ModelContactConnection",
  items:  Array<Contact | null >,
  nextToken?: string | null,
};

export type Contact = {
  __typename: "Contact",
  id: string,
  contactValue?: string | null,
  description?: string | null,
  category?: ContactCategory | null,
  type?: ContactType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  lead?: Lead | null,
  leadContactsId?: string | null,
};

export enum ContactCategory {
  Email = "Email",
  Phone = "Phone",
  Fax = "Fax",
  Other = "Other",
}


export enum ContactType {
  Work = "Work",
  Home = "Home",
  Other = "Other",
}


export type ModelNoteConnection = {
  __typename: "ModelNoteConnection",
  items:  Array<Note | null >,
  nextToken?: string | null,
};

export type Note = {
  __typename: "Note",
  id: string,
  body?: string | null,
  type?: NoteType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  lead?: Lead | null,
  user?: User | null,
  userNotesId?: string | null,
  leadNotesId?: string | null,
  userId?: string | null,
};

export enum NoteType {
  Idea = "Idea",
  Reminder = "Reminder",
  Report = "Report",
  Other = "Other",
}


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
  profileImage?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userLeadsId?: string | null,
};

export type ModelLeadConditionInput = {
  firstName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  gender?: ModelGendersInput | null,
  profileImage?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLeadConditionInput | null > | null,
  or?: Array< ModelLeadConditionInput | null > | null,
  not?: ModelLeadConditionInput | null,
  userLeadsId?: ModelIDInput | null,
};

export type ModelGendersInput = {
  eq?: Genders | null,
  ne?: Genders | null,
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

export type UpdateLeadInput = {
  id: string,
  firstName?: string | null,
  middleName?: string | null,
  lastName?: string | null,
  gender?: Genders | null,
  profileImage?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userLeadsId?: string | null,
};

export type DeleteLeadInput = {
  id: string,
};

export type CreateAddressInput = {
  id?: string | null,
  country?: string | null,
  state?: string | null,
  city?: string | null,
  line1?: string | null,
  line2?: string | null,
  type?: AddressTypes | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  leadAddressesId?: string | null,
};

export type ModelAddressConditionInput = {
  country?: ModelStringInput | null,
  state?: ModelStringInput | null,
  city?: ModelStringInput | null,
  line1?: ModelStringInput | null,
  line2?: ModelStringInput | null,
  type?: ModelAddressTypesInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAddressConditionInput | null > | null,
  or?: Array< ModelAddressConditionInput | null > | null,
  not?: ModelAddressConditionInput | null,
  leadAddressesId?: ModelIDInput | null,
};

export type ModelAddressTypesInput = {
  eq?: AddressTypes | null,
  ne?: AddressTypes | null,
};

export type UpdateAddressInput = {
  id: string,
  country?: string | null,
  state?: string | null,
  city?: string | null,
  line1?: string | null,
  line2?: string | null,
  type?: AddressTypes | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  leadAddressesId?: string | null,
};

export type DeleteAddressInput = {
  id: string,
};

export type CreateContactInput = {
  id?: string | null,
  contactValue?: string | null,
  description?: string | null,
  category?: ContactCategory | null,
  type?: ContactType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  leadContactsId?: string | null,
};

export type ModelContactConditionInput = {
  contactValue?: ModelStringInput | null,
  description?: ModelStringInput | null,
  category?: ModelContactCategoryInput | null,
  type?: ModelContactTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelContactConditionInput | null > | null,
  or?: Array< ModelContactConditionInput | null > | null,
  not?: ModelContactConditionInput | null,
  leadContactsId?: ModelIDInput | null,
};

export type ModelContactCategoryInput = {
  eq?: ContactCategory | null,
  ne?: ContactCategory | null,
};

export type ModelContactTypeInput = {
  eq?: ContactType | null,
  ne?: ContactType | null,
};

export type UpdateContactInput = {
  id: string,
  contactValue?: string | null,
  description?: string | null,
  category?: ContactCategory | null,
  type?: ContactType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  leadContactsId?: string | null,
};

export type DeleteContactInput = {
  id: string,
};

export type CreateNoteInput = {
  id?: string | null,
  body?: string | null,
  type?: NoteType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userNotesId?: string | null,
  leadNotesId?: string | null,
};

export type ModelNoteConditionInput = {
  body?: ModelStringInput | null,
  type?: ModelNoteTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoteConditionInput | null > | null,
  or?: Array< ModelNoteConditionInput | null > | null,
  not?: ModelNoteConditionInput | null,
  userNotesId?: ModelIDInput | null,
  leadNotesId?: ModelIDInput | null,
};

export type ModelNoteTypeInput = {
  eq?: NoteType | null,
  ne?: NoteType | null,
};

export type UpdateNoteInput = {
  id: string,
  body?: string | null,
  type?: NoteType | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  userNotesId?: string | null,
  leadNotesId?: string | null,
};

export type DeleteNoteInput = {
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

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  firstName?: SearchableStringFilterInput | null,
  middleName?: SearchableStringFilterInput | null,
  lastName?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  firstName = "firstName",
  middleName = "middleName",
  lastName = "lastName",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableUserAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableUserAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableUserAggregateField {
  id = "id",
  firstName = "firstName",
  middleName = "middleName",
  lastName = "lastName",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelLeadFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  middleName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  gender?: ModelGendersInput | null,
  profileImage?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelLeadFilterInput | null > | null,
  or?: Array< ModelLeadFilterInput | null > | null,
  not?: ModelLeadFilterInput | null,
  userLeadsId?: ModelIDInput | null,
};

export type SearchableLeadFilterInput = {
  id?: SearchableIDFilterInput | null,
  firstName?: SearchableStringFilterInput | null,
  middleName?: SearchableStringFilterInput | null,
  lastName?: SearchableStringFilterInput | null,
  profileImage?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  userLeadsId?: SearchableIDFilterInput | null,
  gender?: SearchableStringFilterInput | null,
  and?: Array< SearchableLeadFilterInput | null > | null,
  or?: Array< SearchableLeadFilterInput | null > | null,
  not?: SearchableLeadFilterInput | null,
};

export type SearchableLeadSortInput = {
  field?: SearchableLeadSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableLeadSortableFields {
  id = "id",
  firstName = "firstName",
  middleName = "middleName",
  lastName = "lastName",
  profileImage = "profileImage",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userLeadsId = "userLeadsId",
}


export type SearchableLeadAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableLeadAggregateField,
};

export enum SearchableLeadAggregateField {
  id = "id",
  firstName = "firstName",
  middleName = "middleName",
  lastName = "lastName",
  gender = "gender",
  profileImage = "profileImage",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userLeadsId = "userLeadsId",
}


export type SearchableLeadConnection = {
  __typename: "SearchableLeadConnection",
  items:  Array<Lead | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelAddressFilterInput = {
  id?: ModelIDInput | null,
  country?: ModelStringInput | null,
  state?: ModelStringInput | null,
  city?: ModelStringInput | null,
  line1?: ModelStringInput | null,
  line2?: ModelStringInput | null,
  type?: ModelAddressTypesInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAddressFilterInput | null > | null,
  or?: Array< ModelAddressFilterInput | null > | null,
  not?: ModelAddressFilterInput | null,
  leadAddressesId?: ModelIDInput | null,
};

export type SearchableAddressFilterInput = {
  id?: SearchableIDFilterInput | null,
  country?: SearchableStringFilterInput | null,
  state?: SearchableStringFilterInput | null,
  city?: SearchableStringFilterInput | null,
  line1?: SearchableStringFilterInput | null,
  line2?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  leadAddressesId?: SearchableIDFilterInput | null,
  type?: SearchableStringFilterInput | null,
  and?: Array< SearchableAddressFilterInput | null > | null,
  or?: Array< SearchableAddressFilterInput | null > | null,
  not?: SearchableAddressFilterInput | null,
};

export type SearchableAddressSortInput = {
  field?: SearchableAddressSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableAddressSortableFields {
  id = "id",
  country = "country",
  state = "state",
  city = "city",
  line1 = "line1",
  line2 = "line2",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  leadAddressesId = "leadAddressesId",
}


export type SearchableAddressAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableAddressAggregateField,
};

export enum SearchableAddressAggregateField {
  id = "id",
  country = "country",
  state = "state",
  city = "city",
  line1 = "line1",
  line2 = "line2",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  leadAddressesId = "leadAddressesId",
}


export type SearchableAddressConnection = {
  __typename: "SearchableAddressConnection",
  items:  Array<Address | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelContactFilterInput = {
  id?: ModelIDInput | null,
  contactValue?: ModelStringInput | null,
  description?: ModelStringInput | null,
  category?: ModelContactCategoryInput | null,
  type?: ModelContactTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelContactFilterInput | null > | null,
  or?: Array< ModelContactFilterInput | null > | null,
  not?: ModelContactFilterInput | null,
  leadContactsId?: ModelIDInput | null,
};

export type SearchableContactFilterInput = {
  id?: SearchableIDFilterInput | null,
  contactValue?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  leadContactsId?: SearchableIDFilterInput | null,
  category?: SearchableStringFilterInput | null,
  type?: SearchableStringFilterInput | null,
  and?: Array< SearchableContactFilterInput | null > | null,
  or?: Array< SearchableContactFilterInput | null > | null,
  not?: SearchableContactFilterInput | null,
};

export type SearchableContactSortInput = {
  field?: SearchableContactSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableContactSortableFields {
  id = "id",
  contactValue = "contactValue",
  description = "description",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  leadContactsId = "leadContactsId",
}


export type SearchableContactAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableContactAggregateField,
};

export enum SearchableContactAggregateField {
  id = "id",
  contactValue = "contactValue",
  description = "description",
  category = "category",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  leadContactsId = "leadContactsId",
}


export type SearchableContactConnection = {
  __typename: "SearchableContactConnection",
  items:  Array<Contact | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelNoteFilterInput = {
  id?: ModelIDInput | null,
  body?: ModelStringInput | null,
  type?: ModelNoteTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
  userNotesId?: ModelIDInput | null,
  leadNotesId?: ModelIDInput | null,
};

export type SearchableNoteFilterInput = {
  id?: SearchableIDFilterInput | null,
  body?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  userNotesId?: SearchableIDFilterInput | null,
  leadNotesId?: SearchableIDFilterInput | null,
  type?: SearchableStringFilterInput | null,
  and?: Array< SearchableNoteFilterInput | null > | null,
  or?: Array< SearchableNoteFilterInput | null > | null,
  not?: SearchableNoteFilterInput | null,
};

export type SearchableNoteSortInput = {
  field?: SearchableNoteSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableNoteSortableFields {
  id = "id",
  body = "body",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userNotesId = "userNotesId",
  leadNotesId = "leadNotesId",
}


export type SearchableNoteAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableNoteAggregateField,
};

export enum SearchableNoteAggregateField {
  id = "id",
  body = "body",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userNotesId = "userNotesId",
  leadNotesId = "leadNotesId",
}


export type SearchableNoteConnection = {
  __typename: "SearchableNoteConnection",
  items:  Array<Note | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
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
  profileImage?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLeadFilterInput | null > | null,
  or?: Array< ModelSubscriptionLeadFilterInput | null > | null,
};

export type ModelSubscriptionAddressFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  country?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  line1?: ModelSubscriptionStringInput | null,
  line2?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAddressFilterInput | null > | null,
  or?: Array< ModelSubscriptionAddressFilterInput | null > | null,
};

export type ModelSubscriptionContactFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  contactValue?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContactFilterInput | null > | null,
  or?: Array< ModelSubscriptionContactFilterInput | null > | null,
};

export type ModelSubscriptionNoteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  body?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNoteFilterInput | null > | null,
  or?: Array< ModelSubscriptionNoteFilterInput | null > | null,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
  } | null,
};

export type CreateAddressMutationVariables = {
  input: CreateAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type CreateAddressMutation = {
  createAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type UpdateAddressMutationVariables = {
  input: UpdateAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type UpdateAddressMutation = {
  updateAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type DeleteAddressMutationVariables = {
  input: DeleteAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type DeleteAddressMutation = {
  deleteAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type CreateContactMutationVariables = {
  input: CreateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type CreateContactMutation = {
  createContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type UpdateContactMutationVariables = {
  input: UpdateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type UpdateContactMutation = {
  updateContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type DeleteContactMutationVariables = {
  input: DeleteContactInput,
  condition?: ModelContactConditionInput | null,
};

export type DeleteContactMutation = {
  deleteContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type CreateNoteMutation = {
  createNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
  } | null,
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type UpdateNoteMutation = {
  updateNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
  } | null,
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type DeleteNoteMutation = {
  deleteNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: Array< SearchableUserSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableUserAggregationInput | null > | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
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
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchLeadsQueryVariables = {
  filter?: SearchableLeadFilterInput | null,
  sort?: Array< SearchableLeadSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableLeadAggregationInput | null > | null,
};

export type SearchLeadsQuery = {
  searchLeads?:  {
    __typename: "SearchableLeadConnection",
    items:  Array< {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetAddressQueryVariables = {
  id: string,
};

export type GetAddressQuery = {
  getAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type ListAddressesQueryVariables = {
  filter?: ModelAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAddressesQuery = {
  listAddresses?:  {
    __typename: "ModelAddressConnection",
    items:  Array< {
      __typename: "Address",
      id: string,
      country?: string | null,
      state?: string | null,
      city?: string | null,
      line1?: string | null,
      line2?: string | null,
      type?: AddressTypes | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      lead?:  {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null,
      leadAddressesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchAddressesQueryVariables = {
  filter?: SearchableAddressFilterInput | null,
  sort?: Array< SearchableAddressSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableAddressAggregationInput | null > | null,
};

export type SearchAddressesQuery = {
  searchAddresses?:  {
    __typename: "SearchableAddressConnection",
    items:  Array< {
      __typename: "Address",
      id: string,
      country?: string | null,
      state?: string | null,
      city?: string | null,
      line1?: string | null,
      line2?: string | null,
      type?: AddressTypes | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      lead?:  {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null,
      leadAddressesId?: string | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetContactQueryVariables = {
  id: string,
};

export type GetContactQuery = {
  getContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type ListContactsQueryVariables = {
  filter?: ModelContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContactsQuery = {
  listContacts?:  {
    __typename: "ModelContactConnection",
    items:  Array< {
      __typename: "Contact",
      id: string,
      contactValue?: string | null,
      description?: string | null,
      category?: ContactCategory | null,
      type?: ContactType | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      lead?:  {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null,
      leadContactsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchContactsQueryVariables = {
  filter?: SearchableContactFilterInput | null,
  sort?: Array< SearchableContactSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableContactAggregationInput | null > | null,
};

export type SearchContactsQuery = {
  searchContacts?:  {
    __typename: "SearchableContactConnection",
    items:  Array< {
      __typename: "Contact",
      id: string,
      contactValue?: string | null,
      description?: string | null,
      category?: ContactCategory | null,
      type?: ContactType | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      lead?:  {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null,
      leadContactsId?: string | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetNoteQueryVariables = {
  id: string,
};

export type GetNoteQuery = {
  getNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      body?: string | null,
      type?: NoteType | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      lead?:  {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      userNotesId?: string | null,
      leadNotesId?: string | null,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchNotesQueryVariables = {
  filter?: SearchableNoteFilterInput | null,
  sort?: Array< SearchableNoteSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableNoteAggregationInput | null > | null,
};

export type SearchNotesQuery = {
  searchNotes?:  {
    __typename: "SearchableNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      body?: string | null,
      type?: NoteType | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      lead?:  {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null,
      user?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      userNotesId?: string | null,
      leadNotesId?: string | null,
      userId?: string | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
    leads?:  {
      __typename: "ModelLeadConnection",
      items:  Array< {
        __typename: "Lead",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        gender?: Genders | null,
        profileImage?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userLeadsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
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
    profileImage?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    creator?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    addresses?:  {
      __typename: "ModelAddressConnection",
      items:  Array< {
        __typename: "Address",
        id: string,
        country?: string | null,
        state?: string | null,
        city?: string | null,
        line1?: string | null,
        line2?: string | null,
        type?: AddressTypes | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadAddressesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    contacts?:  {
      __typename: "ModelContactConnection",
      items:  Array< {
        __typename: "Contact",
        id: string,
        contactValue?: string | null,
        description?: string | null,
        category?: ContactCategory | null,
        type?: ContactType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        leadContactsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    notes?:  {
      __typename: "ModelNoteConnection",
      items:  Array< {
        __typename: "Note",
        id: string,
        body?: string | null,
        type?: NoteType | null,
        createdAt?: string | null,
        updatedAt?: string | null,
        userNotesId?: string | null,
        leadNotesId?: string | null,
        userId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    userLeadsId?: string | null,
  } | null,
};

export type OnCreateAddressSubscriptionVariables = {
  filter?: ModelSubscriptionAddressFilterInput | null,
};

export type OnCreateAddressSubscription = {
  onCreateAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type OnUpdateAddressSubscriptionVariables = {
  filter?: ModelSubscriptionAddressFilterInput | null,
};

export type OnUpdateAddressSubscription = {
  onUpdateAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type OnDeleteAddressSubscriptionVariables = {
  filter?: ModelSubscriptionAddressFilterInput | null,
};

export type OnDeleteAddressSubscription = {
  onDeleteAddress?:  {
    __typename: "Address",
    id: string,
    country?: string | null,
    state?: string | null,
    city?: string | null,
    line1?: string | null,
    line2?: string | null,
    type?: AddressTypes | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadAddressesId?: string | null,
  } | null,
};

export type OnCreateContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnCreateContactSubscription = {
  onCreateContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type OnUpdateContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnUpdateContactSubscription = {
  onUpdateContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type OnDeleteContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnDeleteContactSubscription = {
  onDeleteContact?:  {
    __typename: "Contact",
    id: string,
    contactValue?: string | null,
    description?: string | null,
    category?: ContactCategory | null,
    type?: ContactType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    leadContactsId?: string | null,
  } | null,
};

export type OnCreateNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null,
};

export type OnCreateNoteSubscription = {
  onCreateNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
  } | null,
};

export type OnUpdateNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null,
};

export type OnUpdateNoteSubscription = {
  onUpdateNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
  } | null,
};

export type OnDeleteNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null,
};

export type OnDeleteNoteSubscription = {
  onDeleteNote?:  {
    __typename: "Note",
    id: string,
    body?: string | null,
    type?: NoteType | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    lead?:  {
      __typename: "Lead",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      gender?: Genders | null,
      profileImage?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      creator?:  {
        __typename: "User",
        id: string,
        firstName?: string | null,
        middleName?: string | null,
        lastName?: string | null,
        createdAt?: string | null,
        updatedAt?: string | null,
      } | null,
      addresses?:  {
        __typename: "ModelAddressConnection",
        nextToken?: string | null,
      } | null,
      contacts?:  {
        __typename: "ModelContactConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
      userLeadsId?: string | null,
    } | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      middleName?: string | null,
      lastName?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
      leads?:  {
        __typename: "ModelLeadConnection",
        nextToken?: string | null,
      } | null,
      notes?:  {
        __typename: "ModelNoteConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    userNotesId?: string | null,
    leadNotesId?: string | null,
    userId?: string | null,
  } | null,
};
