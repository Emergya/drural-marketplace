import { DEFAULT_INITIAL_PAGINATION_DATA } from "@saleor/config";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import ProductReportDialog from "@saleor/products/components/ProductReportDialog";
import ProductReportListPage from "@saleor/products/components/ProductReportListPage";
import { useGetFraudulentProductReports } from "@saleor/products/queries";
import { GetFraudulentProductReports_fraudulentProductReports_edges_node } from "@saleor/products/types/GetFraudulentProductReports";
import {
  ProductListReportUrlDialog,
  ProductReportDialogEnum,
  productReportListUrl,
  ProductReportListUrlQueryParams
} from "@saleor/products/urls";
import { ListViews } from "@saleor/types";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";

interface ProductReportListProps {
  params: ProductReportListUrlQueryParams;
}

export const ProductReportList: React.FC<ProductReportListProps> = ({
  params
}) => {
  const paginate = usePaginator();
  const navigate = useNavigator();
  const [report, setReport] = React.useState<
    GetFraudulentProductReports_fraudulentProductReports_edges_node
  >();

  const { updateListSettings, settings } = useListSettings(
    ListViews.PRODUCT_REPORT_LIST
  );

  const paginationState = createPaginationState(settings.rowNumber, params);

  // Reset pagination
  React.useEffect(
    () =>
      navigate(
        productReportListUrl({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA
        }),
        true
      ),
    [settings.rowNumber]
  );

  const queryVariables = React.useMemo(
    () => ({
      ...paginationState
      //   channel: params.channel
    }),
    [params]
  );

  const { data, loading /* refetch */ } = useGetFraudulentProductReports({
    displayLoader: true,
    variables: queryVariables
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.fraudulentProductReports.pageInfo),
    paginationState,
    params
  );

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductListReportUrlDialog,
    ProductReportListUrlQueryParams
  >(navigate, productReportListUrl, params);

  return (
    <>
      <ProductReportListPage
        disabled={loading}
        pageInfo={pageInfo}
        reports={mapEdgesToItems(data?.fraudulentProductReports)}
        settings={settings}
        totalCount={data?.fraudulentProductReports.totalCount}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
        onUpdateListSettings={updateListSettings}
        onOpenModal={report => {
          setReport(report);
          openModal(ProductReportDialogEnum.INFO);
        }}
        // Requied for listings
        onAdd={() => undefined}
        onRowClick={() => undefined}
      />
      {report && params.action === ProductReportDialogEnum.INFO && (
        <ProductReportDialog
          open={params.action === ProductReportDialogEnum.INFO}
          onClose={closeModal}
          report={report}
        />
      )}
    </>
  );
};
export default ProductReportList;
