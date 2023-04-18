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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateLead = /* GraphQL */ `
  subscription OnCreateLead($filter: ModelSubscriptionLeadFilterInput) {
    onCreateLead(filter: $filter) {
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
export const onUpdateLead = /* GraphQL */ `
  subscription OnUpdateLead($filter: ModelSubscriptionLeadFilterInput) {
    onUpdateLead(filter: $filter) {
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
export const onDeleteLead = /* GraphQL */ `
  subscription OnDeleteLead($filter: ModelSubscriptionLeadFilterInput) {
    onDeleteLead(filter: $filter) {
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
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
    onCreateContact(filter: $filter) {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
    onUpdateContact(filter: $filter) {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
    onDeleteContact(filter: $filter) {
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
