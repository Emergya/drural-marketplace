import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  BookableResourceBulkDelete,
  BookableResourceBulkDeleteVariables
} from "./types/BookableResourceBulkDelete";
import {
  BookableResourceCreate,
  BookableResourceCreateVariables
} from "./types/BookableResourceCreate";
import {
  BookableResourceDelete,
  BookableResourceDeleteVariables
} from "./types/BookableResourceDelete";
import {
  BookableResourceUpdate,
  BookableResourceUpdateVariables
} from "./types/BookableResourceUpdate";

const bookableResourceCreateMutation = gql`
  mutation BookableResourceCreate($input: BookableResourceCreateInput!) {
    bookableResourceCreate(input: $input) {
      errors {
        field
        message
        code
      }
      bookableResource {
        id
        company {
          id
        }
        name
        isActive
        quantity
        quantityInfinite
        calendar {
          day
          timePeriods {
            startTime
            endTime
          }
        }
      }
    }
  }
`;
export const useBookableResourceCreateMutation = makeMutation<
  BookableResourceCreate,
  BookableResourceCreateVariables
>(bookableResourceCreateMutation);

const bookableResourceUpdateMutation = gql`
  mutation BookableResourceUpdate($id: ID!, $input: BookableResourceInput!) {
    bookableResourceUpdate(id: $id, input: $input) {
      errors {
        field
        message
        code
      }
      bookableResource {
        id
        name
        isActive
        quantity
        quantityInfinite
        calendar {
          id
          day
          timePeriods {
            id
            startTime
            endTime
          }
        }
      }
    }
  }
`;
export const useBookableResourceUpdateMutation = makeMutation<
  BookableResourceUpdate,
  BookableResourceUpdateVariables
>(bookableResourceUpdateMutation);

const bookableResourceDeleteMutation = gql`
  mutation BookableResourceDelete($id: ID!) {
    bookableResourceDelete(id: $id) {
      errors {
        field
        message
        code
      }
      bookableResource {
        id
        name
        isActive
        quantity
        quantityInfinite
        calendar {
          id
          day
          timePeriods {
            id
            startTime
            endTime
          }
        }
      }
    }
  }
`;

export const usebookableResourceDeleteMutation = makeMutation<
  BookableResourceDelete,
  BookableResourceDeleteVariables
>(bookableResourceDeleteMutation);

export const BookableResourceBulkDeleteMutation = gql`
  mutation BookableResourceBulkDelete($ids: [ID!]!) {
    bookableResourceBulkDelete(ids: $ids) {
      errors {
        field
        code
        message
      }
    }
  }
`;

export const useBookableResourceBulkDeleteMutation = makeMutation<
  BookableResourceBulkDelete,
  BookableResourceBulkDeleteVariables
>(BookableResourceBulkDeleteMutation);
