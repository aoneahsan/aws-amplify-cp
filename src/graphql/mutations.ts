/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      middleName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const createLead = /* GraphQL */ `
  mutation CreateLead(
    $input: CreateLeadInput!
    $condition: ModelLeadConditionInput
  ) {
    createLead(input: $input, condition: $condition) {
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
export const updateLead = /* GraphQL */ `
  mutation UpdateLead(
    $input: UpdateLeadInput!
    $condition: ModelLeadConditionInput
  ) {
    updateLead(input: $input, condition: $condition) {
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
export const deleteLead = /* GraphQL */ `
  mutation DeleteLead(
    $input: DeleteLeadInput!
    $condition: ModelLeadConditionInput
  ) {
    deleteLead(input: $input, condition: $condition) {
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
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
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
