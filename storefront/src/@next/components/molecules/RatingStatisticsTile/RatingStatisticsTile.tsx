import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { FormattedMessage } from "react-intl";

import { StarsRating } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const RatingStatisticsTile: React.FC<IProps> = ({
  starPercentages,
  rating,
  onStarClick,
  totalReviews,
}) => {
  return (
    <S.Container>
      <S.RatingChip>
        <StarsRating readonly starsNumber={rating} />
        <S.Span>
          <FormattedMessage
            defaultMessage="{rating} out of 5"
            values={{ rating: rating || 0 }}
          />
        </S.Span>
      </S.RatingChip>
      <S.P>
        <FormattedMessage
          defaultMessage="{totalReviews} reviews"
          values={{ totalReviews: totalReviews || 0 }}
        />
      </S.P>
      {starPercentages?.length === 5 &&
        starPercentages?.map((value, index) => (
          <S.PercentageTile key={index} onClick={() => onStarClick(5 - index)}>
            <S.StarNumber>
              <FormattedMessage
                defaultMessage="{star} stars"
                values={{ star: 5 - index }}
              />
            </S.StarNumber>
            <S.ProgressBarWrapper>
              <ProgressBar
                completed={value || 0}
                maxCompleted={100}
                isLabelVisible={false}
                width="100%"
                height="4px"
                bgColor="#3CDCAA"
                baseBgColor="#E0DEE3"
              />
            </S.ProgressBarWrapper>

            <S.Percentage>
              <FormattedMessage defaultMessage="{value} %" values={{ value }} />
            </S.Percentage>
          </S.PercentageTile>
        ))}
    </S.Container>
  );
};
