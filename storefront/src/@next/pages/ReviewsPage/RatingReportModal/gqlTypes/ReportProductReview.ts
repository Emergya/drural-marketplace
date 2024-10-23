/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProductDeleteMyRating
// ====================================================

export interface ReportProductReview_productReviewReport {
    __typename:"ProductReviewReport";
    success: boolean;
  }
  
  export interface ReportProductReview {
    productRatingDelete: ReportProductReview_productReviewReport | null;
  }
  
  export interface ReportProductReviewVariables {
    id: string;
    reasons: string[];
  }