import gql from "graphql-tag";

export const reportProductReview = gql`
    mutation ReportProductReview($id:ID!, $reasons:[String]!){
        productReviewReport(input:{reviewId:$id, reasons:$reasons})
        {
            success
        }
    }
`;
