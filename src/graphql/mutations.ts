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
      leads {
        items {
          id
          firstName
          middleName
          lastName
          gender
          profileImage
          createdAt
          updatedAt
          userLeadsId
        }
        nextToken
      }
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
      leads {
        items {
          id
          firstName
          middleName
          lastName
          gender
          profileImage
          createdAt
          updatedAt
          userLeadsId
        }
        nextToken
      }
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
      leads {
        items {
          id
          firstName
          middleName
          lastName
          gender
          profileImage
          createdAt
          updatedAt
          userLeadsId
        }
        nextToken
      }
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
      profileImage
      createdAt
      updatedAt
      creator {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
        leads {
          nextToken
        }
      }
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
      contacts {
        items {
          id
          contactValue
          description
          category
          type
          createdAt
          updatedAt
          leadContactsId
        }
        nextToken
      }
      userLeadsId
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
      profileImage
      createdAt
      updatedAt
      creator {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
        leads {
          nextToken
        }
      }
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
      contacts {
        items {
          id
          contactValue
          description
          category
          type
          createdAt
          updatedAt
          leadContactsId
        }
        nextToken
      }
      userLeadsId
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
      profileImage
      createdAt
      updatedAt
      creator {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
        leads {
          nextToken
        }
      }
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
      contacts {
        items {
          id
          contactValue
          description
          category
          type
          createdAt
          updatedAt
          leadContactsId
        }
        nextToken
      }
      userLeadsId
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
        profileImage
        createdAt
        updatedAt
        creator {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        addresses {
          nextToken
        }
        contacts {
          nextToken
        }
        userLeadsId
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
        profileImage
        createdAt
        updatedAt
        creator {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        addresses {
          nextToken
        }
        contacts {
          nextToken
        }
        userLeadsId
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
        profileImage
        createdAt
        updatedAt
        creator {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        addresses {
          nextToken
        }
        contacts {
          nextToken
        }
        userLeadsId
      }
      leadAddressesId
    }
  }
`;
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
      id
      contactValue
      description
      category
      type
      createdAt
      updatedAt
      lead {
        id
        firstName
        middleName
        lastName
        gender
        profileImage
        createdAt
        updatedAt
        creator {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        addresses {
          nextToken
        }
        contacts {
          nextToken
        }
        userLeadsId
      }
      leadContactsId
    }
  }
`;
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
      id
      contactValue
      description
      category
      type
      createdAt
      updatedAt
      lead {
        id
        firstName
        middleName
        lastName
        gender
        profileImage
        createdAt
        updatedAt
        creator {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        addresses {
          nextToken
        }
        contacts {
          nextToken
        }
        userLeadsId
      }
      leadContactsId
    }
  }
`;
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
      id
      contactValue
      description
      category
      type
      createdAt
      updatedAt
      lead {
        id
        firstName
        middleName
        lastName
        gender
        profileImage
        createdAt
        updatedAt
        creator {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        addresses {
          nextToken
        }
        contacts {
          nextToken
        }
        userLeadsId
      }
      leadContactsId
    }
  }
`;
