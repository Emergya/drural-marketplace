import { UilTrashAlt } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { DropdownSelect, Loader } from "@components/atoms";
import {
  SORT_REVIEW_OPTIONS,
  STARS_REVIEW_OPTIONS,
} from "@pages/ReviewsPage/utils";
import { commonMessages } from "@temp/intl";

import { IReview } from "../../../types/IReview";
import { Review } from "../Review";
import * as S from "./styles";

// TODO - add types from codegen
interface IProps {
  myReview?: IReview | null | undefined;
  reviews: IReview[];
  onClick?: () => void;
  onDelete?: (reviewID: string) => void;
  consumedService?: boolean;
  onSortChange: (sortValue: string) => void;
  activeSort: string;
  onStarFilterChange: (sortValue: number) => void;
  activeStarFilter: number | undefined;
  loading?: boolean;
  type?: "product" | "company";
}

export const ServiceReviewsList: React.FC<IProps> = ({
  myReview,
  reviews,
  onClick = () => null,
  onDelete = () => null,
  consumedService = false,
  onSortChange,
  activeSort,
  activeStarFilter,
  onStarFilterChange,
  loading = false,
  type = "product",
}) => {
  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.Title>
          <FormattedMessage defaultMessage="All the reviews" />
        </S.Title>
      </S.HeaderWrapper>
      {myReview && (
        <>
          <S.ReviewTile>
            <Review review={myReview} />
            <S.DeleteIcon
              onClick={e => {
                e.stopPropagation();
                onDelete(myReview.id);
              }}
            >
              <UilTrashAlt size="24" />
            </S.DeleteIcon>
          </S.ReviewTile>
          <S.Separator />
        </>
      )}
      <S.ContentWrapper>
        {consumedService && !myReview && (
          <S.StyledButton
            color="ghost"
            testingContext="leave-review-button"
            onClick={onClick}
          >
            <FormattedMessage defaultMessage="Leave my review" />
          </S.StyledButton>
        )}
        <S.SelectWrapper>
          <S.SelectOrderFilter>
            <S.SelectTitle>
              <FormattedMessage defaultMessage="ORDER BY" />
            </S.SelectTitle>
            <DropdownSelect
              name="order"
              options={SORT_REVIEW_OPTIONS}
              value={SORT_REVIEW_OPTIONS.find(
                option => option.value === activeSort
              )}
              onChange={value => {
                onSortChange(value.value);
              }}
            />
          </S.SelectOrderFilter>
          <S.SelectOrderFilter>
            <S.SelectTitle>
              <FormattedMessage defaultMessage="FILTER BY" />
            </S.SelectTitle>
            <DropdownSelect
              name="filter"
              options={STARS_REVIEW_OPTIONS}
              value={STARS_REVIEW_OPTIONS.find(
                option => option.value === activeStarFilter
              )}
              onChange={value => {
                onStarFilterChange(value.value);
              }}
            />
          </S.SelectOrderFilter>
        </S.SelectWrapper>
        {type === "product" &&
          (loading ? (
            <Loader />
          ) : (
            <S.ReviewsWrapper>
              {reviews.map((review, index) => (
                <S.ReviewTile key={index}>
                  <Review review={review} />
                </S.ReviewTile>
              ))}
            </S.ReviewsWrapper>
          ))}
        {type === "company" &&
          (loading ? (
            <Loader />
          ) : (
            <S.ReviewsTable>
              <S.TableHead>
                <S.TableRow>
                  <S.HeadCell>
                    <FormattedMessage {...commonMessages.service} />
                  </S.HeadCell>
                  <S.HeadCell>
                    <FormattedMessage {...commonMessages.review} />
                  </S.HeadCell>
                </S.TableRow>
              </S.TableHead>
              <S.TableBody>
                {reviews.map((review, index) => (
                  <S.TableRow key={index}>
                    <S.DataCellProduct>
                      {review?.product?.name || ""}
                    </S.DataCellProduct>
                    <S.DataCellReview>
                      <Review review={review} />
                    </S.DataCellReview>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.ReviewsTable>
          ))}
      </S.ContentWrapper>
    </S.Container>
  );
};
