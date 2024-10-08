import { MetadataFormData } from "@saleor/components/Metadata/types";
import { MetadataErrorFragment } from "@saleor/fragments/types/MetadataErrorFragment";
import {
  ProductDetails,
  ProductDetailsVariables
} from "@saleor/products/types/ProductDetails";
import { MetadataInput } from "@saleor/types/globalTypes";
import { arrayDiff } from "@saleor/utils/arrays";
import { ApolloQueryResult } from "apollo-client";
import { MutationFetchResult } from "react-apollo";

import {
  UpdateMetadata,
  UpdateMetadataVariables
} from "../metadata/types/UpdateMetadata";
import {
  UpdatePrivateMetadata,
  UpdatePrivateMetadataVariables
} from "../metadata/types/UpdatePrivateMetadata";

interface ObjectWithMetadata {
  id: string;
  metadata: MetadataInput[];
  privateMetadata: MetadataInput[];
}

function createMetadataUpdateHandler<TData extends MetadataFormData, TError>(
  initial: ObjectWithMetadata,
  update: (data: TData) => Promise<TError[]>,
  updateMetadata: (
    variables: UpdateMetadataVariables
  ) => Promise<MutationFetchResult<UpdateMetadata>>,
  updatePrivateMetadata: (
    variables: UpdatePrivateMetadataVariables
  ) => Promise<MutationFetchResult<UpdatePrivateMetadata>>,
  refetchProductData?: (
    variables?: ProductDetailsVariables
  ) => Promise<ApolloQueryResult<ProductDetails>>
) {
  return async (
    data: TData
  ): Promise<Array<MetadataErrorFragment | TError>> => {
    const errors = await update(data);

    if (errors.length > 0) {
      return errors;
    }

    if (errors.length === 0) {
      if (data.metadata) {
        const initialKeys = initial.metadata.map(m => m.key);
        const modifiedKeys = data.metadata.map(m => m.key);

        const keyDiff = arrayDiff(initialKeys, modifiedKeys);

        const updateMetaResult = await updateMetadata({
          id: initial.id,
          input: data.metadata,
          keysToDelete: keyDiff.removed
        });
        const updateMetaErrors = [
          ...(updateMetaResult.data.deleteMetadata.errors || []),
          ...(updateMetaResult.data.updateMetadata.errors || [])
        ];

        if (updateMetaErrors.length > 0) {
          return updateMetaErrors;
        }
      }

      if (data.privateMetadata) {
        const initialKeys = initial.privateMetadata.map(m => m.key);
        const modifiedKeys = data.privateMetadata.map(m => m.key);

        const keyDiff = arrayDiff(initialKeys, modifiedKeys);

        const updatePrivateMetaResult = await updatePrivateMetadata({
          id: initial.id,
          input: data.privateMetadata,
          keysToDelete: keyDiff.removed
        });

        const updatePrivateMetaErrors = [
          ...(updatePrivateMetaResult.data.deletePrivateMetadata.errors || []),
          ...(updatePrivateMetaResult.data.updatePrivateMetadata.errors || [])
        ];

        if (updatePrivateMetaErrors.length > 0) {
          return updatePrivateMetaErrors;
        }
      }
      if (refetchProductData) {
        refetchProductData();
      }
    }

    return [];
  };
}

export default createMetadataUpdateHandler;
