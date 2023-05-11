/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      notes {
        items {
          id
          body
          type
          createdAt
          updatedAt
          userNotesId
          leadNotesId
          userId
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
        leads {
          nextToken
        }
        notes {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
        leads {
          nextToken
        }
        notes {
          nextToken
        }
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getLead = /* GraphQL */ `
  query GetLead($id: ID!) {
    getLead(id: $id) {
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
        notes {
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
      notes {
        items {
          id
          body
          type
          createdAt
          updatedAt
          userNotesId
          leadNotesId
          userId
        }
        nextToken
      }
      userLeadsId
    }
  }
`;
export const listLeads = /* GraphQL */ `
  query ListLeads(
    $filter: ModelLeadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        notes {
          nextToken
        }
        userLeadsId
      }
      nextToken
    }
  }
`;
export const searchLeads = /* GraphQL */ `
  query SearchLeads(
    $filter: SearchableLeadFilterInput
    $sort: [SearchableLeadSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableLeadAggregationInput]
  ) {
    searchLeads(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
        notes {
          nextToken
        }
        userLeadsId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
        notes {
          nextToken
        }
        userLeadsId
      }
      leadAddressesId
    }
  }
`;
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        lead {
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
        leadAddressesId
      }
      nextToken
    }
  }
`;
export const searchAddresses = /* GraphQL */ `
  query SearchAddresses(
    $filter: SearchableAddressFilterInput
    $sort: [SearchableAddressSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableAddressAggregationInput]
  ) {
    searchAddresses(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
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
        lead {
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
        leadAddressesId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
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
        notes {
          nextToken
        }
        userLeadsId
      }
      leadContactsId
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          userLeadsId
        }
        leadContactsId
      }
      nextToken
    }
  }
`;
export const searchContacts = /* GraphQL */ `
  query SearchContacts(
    $filter: SearchableContactFilterInput
    $sort: [SearchableContactSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableContactAggregationInput]
  ) {
    searchContacts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
          userLeadsId
        }
        leadContactsId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      body
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
        notes {
          nextToken
        }
        userLeadsId
      }
      user {
        id
        firstName
        middleName
        lastName
        createdAt
        updatedAt
        leads {
          nextToken
        }
        notes {
          nextToken
        }
      }
      userNotesId
      leadNotesId
      userId
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        body
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
          userLeadsId
        }
        user {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        userNotesId
        leadNotesId
        userId
      }
      nextToken
    }
  }
`;
export const searchNotes = /* GraphQL */ `
  query SearchNotes(
    $filter: SearchableNoteFilterInput
    $sort: [SearchableNoteSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableNoteAggregationInput]
  ) {
    searchNotes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        body
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
          userLeadsId
        }
        user {
          id
          firstName
          middleName
          lastName
          createdAt
          updatedAt
        }
        userNotesId
        leadNotesId
        userId
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
