import React from "react";
import { FormattedMessage } from "react-intl";

import { StarsRating, StyledLink } from "@components/atoms";
import { Moment } from "@components/atoms/Moment";
import { dateFormat } from "@utils/date";

import { IReview } from "../../../types/IReview";
import * as S from "./styles";
// import { IProps } from "./types";

interface IProps {
  review: IReview;
}

// TODO - add types from codegen
export const Review: React.FC<IProps> = ({ review }) => {
  const [message, setMessage] = React.useState("");
  const trimIndex = 145;
  const isTrimed = review.comment.length !== message.length;

  React.useEffect(() => {
    if (review.comment && review.comment.length > trimIndex) {
      setMessage(`${review.comment.slice(0, trimIndex)}...`);
    } else {
      setMessage(review.comment);
    }
  }, [review.comment]);

  const onLinkClick = () => {
    setMessage(review.comment);
  };

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <S.Text>
          <span>{review.user}</span>
        </S.Text>
        <S.ExtraSmallText>
          <Moment format={dateFormat}>{review.createdAt}</Moment>
        </S.ExtraSmallText>
      </S.HeaderWrapper>
      <StarsRating starsNumber={review.rating} readonly />
      {review.comment && (
        <S.MessageWrapper>
          <S.Text>{message}</S.Text>
          {isTrimed && (
            <StyledLink onClick={onLinkClick} underline>
              <FormattedMessage defaultMessage="More" />
            </StyledLink>
          )}
        </S.MessageWrapper>
      )}
    </S.Wrapper>
  );
};
