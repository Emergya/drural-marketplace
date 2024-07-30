import { media, styled } from "@styles";

export const DiscountForm = styled.form``;

export const Input = styled.div`
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const InputWithButton = styled.div`
  display: flex;
  ${media.smallScreen`
  flex-direction: column;
`}
`;

export const InputWrapper = styled.div`
  margin-right: ${props => props.theme.spacing.fieldSpacer};

  ${props => media.smallScreen`
    margin-right: 0;
    margin-bottom: ${props.theme.spacing.fieldSpacer};
  `}
`;

export const ButtonWrapper = styled.div`
  width: auto;
  min-width: 110px;
  ${media.smallScreen`
    text-align: center;
  `}
  button {
    margin-top: 0;
  }
`;

export const ChipsWrapper = styled.div`
  margin: 0.4rem 0 0 0;
`;
