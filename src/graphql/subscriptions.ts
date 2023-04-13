/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLead = /* GraphQL */ `
  subscription OnCreateLead($filter: ModelSubscriptionLeadFilterInput) {
    onCreateLead(filter: $filter) {
      id
      firstName
      middleName
      lastName
      gender
      createdAt
      updatedAt
      addresses {
        items {
          id
          country
          state
          city
          line1
          line2
          type
          createdAt
          updatedAt
          leadAddressesId
        }
        nextToken
      }
    }
  }
`;
export const onUpdateLead = /* GraphQL */ `
  subscription OnUpdateLead($filter: ModelSubscriptionLeadFilterInput) {
    onUpdateLead(filter: $filter) {
      id
      firstName
      middleName
      lastName
      gender
      createdAt
      updatedAt
      addresses {
        items {
          id
          country
          state
          city
          line1
          line2
          type
          createdAt
          updatedAt
          leadAddressesId
        }
        nextToken
      }
    }
  }
`;
export const onDeleteLead = /* GraphQL */ `
  subscription OnDeleteLead($filter: ModelSubscriptionLeadFilterInput) {
    onDeleteLead(filter: $filter) {
      id
      firstName
      middleName
      lastName
      gender
      createdAt
      updatedAt
      addresses {
        items {
          id
          country
          state
          city
          line1
          line2
          type
          createdAt
          updatedAt
          leadAddressesId
        }
        nextToken
      }
    }
  }
`;
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onCreateAddress(filter: $filter) {
      id
      country
      state
      city
      line1
      line2
      type
      createdAt
      updatedAt
      lead {
        id
        firstName
        middleName
        lastName
        gender
        createdAt
        updatedAt
        addresses {
          nextToken
        }
      }
      leadAddressesId
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onUpdateAddress(filter: $filter) {
      id
      country
      state
      city
      line1
      line2
      type
      createdAt
      updatedAt
      lead {
        id
        firstName
        middleName
        lastName
        gender
        createdAt
        updatedAt
        addresses {
          nextToken
        }
      }
      leadAddressesId
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
    onDeleteAddress(filter: $filter) {
      id
      country
      state
      city
      line1
      line2
      type
      createdAt
      updatedAt
      lead {
        id
        firstName
        middleName
        lastName
        gender
        createdAt
        updatedAt
        addresses {
          nextToken
        }
      }
      leadAddressesId
    }
  }
`;
