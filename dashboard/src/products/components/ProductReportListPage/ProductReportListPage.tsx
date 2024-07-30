import { Card } from "@material-ui/core";
import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import ProductReportList from "@saleor/products/components/ProductReportList";
import { GetFraudulentProductReports_fraudulentProductReports_edges_node } from "@saleor/products/types/GetFraudulentProductReports";
import { PageListProps } from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";

export interface ProductReportListPageProps extends PageListProps {
  reports: GetFraudulentProductReports_fraudulentProductReports_edges_node[];
  onOpenModal: (
    report: GetFraudulentProductReports_fraudulentProductReports_edges_node
  ) => void;
}

export const ProductReportListPage: React.FC<ProductReportListPageProps> = ({
  reports,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.serviceReports)} />
      <Card>
        <ProductReportList reports={reports} {...listProps} />
      </Card>
    </Container>
  );
};
export default ProductReportListPage;
