import { DialogContentText, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@saleor/components/ActionDialog";
import useAppChannel from "@saleor/components/AppLayout/AppChannelContext";
import { BusinessContext } from "@saleor/components/BusinessProvider";
import NotFoundPage from "@saleor/components/NotFoundPage";
import Skeleton from "@saleor/components/Skeleton";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useBulkActions from "@saleor/hooks/useBulkActions";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import useUser from "@saleor/hooks/useUser";
import { commonMessages, errorMessages } from "@saleor/intl";
import { getCompany } from "@saleor/products/utils/data";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import createMetadataUpdateHandler from "@saleor/utils/handlers/metadataUpdateHandler";
import { mapEdgesToItems, mapNodeToChoice } from "@saleor/utils/maps";
import {
  useMetadataUpdate,
  usePrivateMetadataUpdate
} from "@saleor/utils/metadata/updateMetadata";
import { getParsedDataForJsonStringField } from "@saleor/utils/richText/misc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { PAGINATE_BY } from "../../config";
import { maybe } from "../../misc";
import { useProductBulkDeleteMutation } from "../../products/mutations";
import { productAddUrl, productUrl } from "../../products/urls";
import { CategoryInput } from "../../types/globalTypes";
import {
  CategoryPageTab,
  CategoryUpdatePage
} from "../components/CategoryUpdatePage/CategoryUpdatePage";
import { CategoryUpdateData } from "../components/CategoryUpdatePage/form";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation
} from "../mutations";
import { useCategoryDetailsQuery } from "../queries";
import { CategoryBulkDelete } from "../types/CategoryBulkDelete";
import { CategoryDelete } from "../types/CategoryDelete";
import { CategoryUpdate } from "../types/CategoryUpdate";
import {
  categoryAddUrl,
  categoryListUrl,
  categoryUrl,
  CategoryUrlDialog,
  CategoryUrlQueryParams
} from "../urls";

export interface CategoryDetailsProps {
  params: CategoryUrlQueryParams;
  id: string;
}

export function getActiveTab(tabName: string): CategoryPageTab {
  return tabName === CategoryPageTab.products
    ? CategoryPageTab.products
    : CategoryPageTab.categories;
}

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { user } = useUser();
  const intl = useIntl();
  const [updateMetadata] = useMetadataUpdate({});
  const [updatePrivateMetadata] = usePrivateMetadataUpdate({});

  // Business data
  const { activeBusiness } = React.useContext(BusinessContext);
  const company = getCompany(user.isStaff, activeBusiness?.active.node.id);
  const paginationState = createPaginationState(PAGINATE_BY, params);
  const { data, loading, refetch } = useCategoryDetailsQuery({
    displayLoader: true,
    variables: {
      ...paginationState,
      ...company,
      id
    }
  });

  const { availableChannels, channel } = useAppChannel(false);

  const channelChoices = mapNodeToChoice(availableChannels);

  const category = data?.category;

  const handleCategoryDelete = (data: CategoryDelete) => {
    if (data.categoryDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Category deleted"
        })
      });
      navigate(categoryListUrl());
    }
  };

  const [deleteCategory, deleteResult] = useCategoryDeleteMutation({
    onCompleted: handleCategoryDelete
  });

  const handleCategoryUpdate = (data: CategoryUpdate) => {
    if (data.categoryUpdate.errors.length > 0) {
      const backgroundImageError = data.categoryUpdate.errors.find(
        error => error.field === ("backgroundImage" as keyof CategoryInput)
      );
      if (backgroundImageError) {
        notify({
          status: "error",
          title: intl.formatMessage(errorMessages.imgageUploadErrorTitle),
          text: intl.formatMessage(errorMessages.imageUploadErrorText)
        });
      }
    }
  };

  const [updateCategory, updateResult] = useCategoryUpdateMutation({
    onCompleted: handleCategoryUpdate
  });

  const handleBulkCategoryDelete = (data: CategoryBulkDelete) => {
    if (data.categoryBulkDelete.errors.length === 0) {
      closeModal();
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
    }
  };

  const [
    categoryBulkDelete,
    categoryBulkDeleteOpts
  ] = useCategoryBulkDeleteMutation({
    onCompleted: handleBulkCategoryDelete
  });

  const [
    productBulkDelete,
    productBulkDeleteOpts
  ] = useProductBulkDeleteMutation({
    onCompleted: data => {
      if (data.productBulkDelete.errors.length === 0) {
        closeModal();
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
        refetch();
        reset();
      }
    }
  });

  const changeTab = (tabName: CategoryPageTab) => {
    reset();
    navigate(
      categoryUrl(id, {
        activeTab: tabName
      })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
    CategoryUrlDialog,
    CategoryUrlQueryParams
  >(navigate, params => categoryUrl(id, params), params);

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    params.activeTab === CategoryPageTab.categories
      ? maybe(() => data.category.children.pageInfo)
      : maybe(() => data.category.products.pageInfo),
    paginationState,
    params
  );

  const handleUpdate = async (formData: CategoryUpdateData) => {
    // TODO remove notification with img error and add succes/error notifications
    const result = await updateCategory({
      variables: {
        id,
        input: {
          description: getParsedDataForJsonStringField(formData.description),
          name: formData.name,
          iconId: formData.iconId,
          seo: {
            description: formData.seoDescription,
            title: formData.seoTitle
          },
          slug: formData.slug
        }
      }
    });

    return result.data.categoryUpdate.errors;
  };
  const handleSubmit = createMetadataUpdateHandler(
    data?.category,
    handleUpdate,
    variables => updateMetadata({ variables }),
    variables => updatePrivateMetadata({ variables })
  );

  if (typeof channel === "undefined") {
    return <Skeleton />;
  }

  if (category === null) {
    return <NotFoundPage onBack={() => navigate(categoryListUrl())} />;
  }

  return (
    <>
      <WindowTitle title={maybe(() => data.category.name)} />
      <CategoryUpdatePage
        channelsCount={availableChannels.length}
        channelChoices={channelChoices}
        changeTab={changeTab}
        currentTab={params.activeTab}
        category={maybe(() => data.category)}
        disabled={loading}
        errors={updateResult.data?.categoryUpdate.errors || []}
        onAddCategory={() => navigate(categoryAddUrl(id))}
        onAddProduct={() => navigate(productAddUrl())}
        onBack={() =>
          navigate(
            maybe(() => categoryUrl(data.category.parent.id), categoryListUrl())
          )
        }
        onCategoryClick={id => () => navigate(categoryUrl(id))}
        onDelete={() => openModal("delete")}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        pageInfo={pageInfo}
        onProductClick={id => () => navigate(productUrl(id))}
        onSubmit={handleSubmit}
        products={mapEdgesToItems(data?.category?.products)}
        productsTotalCount={data?.category?.products?.totalCount}
        saveButtonBarState={updateResult.status}
        selectedChannelId={channel?.id}
        subcategories={mapEdgesToItems(data?.category?.children)}
        subcategoriesTotalCount={data?.category?.children?.totalCount}
        subcategoryListToolbar={
          <IconButton
            color="primary"
            onClick={() =>
              openModal("delete-categories", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        productListToolbar={
          <IconButton
            data-test-id="deleteIcon"
            color="primary"
            onClick={() =>
              openModal("delete-products", {
                ids: listElements
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
      />
      <ActionDialog
        confirmButtonState={deleteResult.status}
        onClose={closeModal}
        onConfirm={() => deleteCategory({ variables: { id } })}
        open={params.action === "delete"}
        title={intl.formatMessage({
          defaultMessage: "Delete category",
          description: "dialog title"
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="Are you sure you want to delete {categoryName}?"
            values={{
              categoryName: (
                <strong>{maybe(() => data.category.name, "...")}</strong>
              )
            }}
          />
        </DialogContentText>
        <DialogContentText>
          <FormattedMessage defaultMessage="Remember this will also unpin all products assigned to this category, making them unavailable in storefront." />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={
          params.action === "delete-categories" &&
          maybe(() => params.ids.length > 0)
        }
        confirmButtonState={categoryBulkDeleteOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          categoryBulkDelete({
            variables: { ids: params.ids }
          }).then(() => refetch())
        }
        title={intl.formatMessage({
          defaultMessage: "Delete categories",
          description: "dialog title"
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this category?} other{Are you sure you want to delete {displayQuantity} categories?}}"
            values={{
              counter: maybe(() => params.ids.length),
              displayQuantity: <strong>{maybe(() => params.ids.length)}</strong>
            }}
          />
        </DialogContentText>
        <DialogContentText>
          <FormattedMessage defaultMessage="Remember this will also delete all products assigned to this category." />
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === "delete-products"}
        confirmButtonState={productBulkDeleteOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          productBulkDelete({
            variables: { ids: params.ids }
          }).then(() => refetch())
        }
        title={intl.formatMessage({
          defaultMessage: "Delete products",
          description: "dialog title"
        })}
        variant="delete"
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="{counter,plural,one{Are you sure you want to delete this product?} other{Are you sure you want to delete {displayQuantity} products?}}"
            values={{
              counter: maybe(() => params.ids.length),
              displayQuantity: <strong>{maybe(() => params.ids.length)}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default CategoryDetails;
