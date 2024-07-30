import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";
import React from "react";

import { dRuralTheme } from "@styles";
import { getBackgroundColor } from "@utils/styles";

import { InputLabel } from "../InputLabel";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Wrapper component for Stripe input elements.
 */
const StripeInputElement: React.FC<IProps> = ({
  onBlur,
  onFocus,
  contentLeft = null,
  contentRight = null,
  error = false,
  placeholder,
  label,
  onChange,
  type,
  options,
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [filled, setFilled] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [labelBackground, setColor] = React.useState<string>("transparent");

  const OPTIONS = {
    ...options,

    style: {
      ...options?.style,
      base: {
        ":-webkit-autofill": {
          color: dRuralTheme.colors.primary,
        },
        "::placeholder": {
          color: active && !filled ? "#aaa" : "transparent",
          visibility: active && !filled ? "visible" : "hidden",
        },
        color: "#111",
        fontFamily: dRuralTheme.typography.baseFontFamily,
        fontSize: "16px",
        fontSmoothing: "antialiased",
        fontWeight: "500",
        iconColor: dRuralTheme.colors.primary,
        ...options?.style?.base,
      },
      invalid: {
        color: dRuralTheme.colors.error,
        iconColor: dRuralTheme.colors.error,
        ...options?.style?.invalid,
      },
    },
  };

  React.useEffect(() => {
    if (elementRef) {
      const color = getBackgroundColor(elementRef.current);
      setColor(color);
    }
  }, []);

  const handleFocus = React.useCallback(() => {
    setActive(true);
    if (onFocus) {
      onFocus();
    }
  }, [setActive, onFocus]);
  const handleBlur = React.useCallback(() => {
    setActive(false);
    if (onBlur) {
      onBlur();
    }
  }, [setActive, onBlur]);
  const handleStripeElementChange = (
    event:
      | StripeCardNumberElementChangeEvent
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent
  ) => {
    setFilled(!event?.empty);
    if (onChange) {
      onChange(event);
    }
  };

  const renderStripeElement = () => {
    switch (type) {
      case "CardNumber":
        return (
          <CardNumberElement
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleStripeElementChange}
            options={OPTIONS}
          />
        );
      case "CardExpiry":
        return (
          <CardExpiryElement
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleStripeElementChange}
            options={OPTIONS}
          />
        );
      case "CardCvc":
        return (
          <CardCvcElement
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleStripeElementChange}
            options={OPTIONS}
          />
        );
      default:
        throw new Error("Unsupported stripe element");
    }
  };

  return (
    <S.Wrapper active={active} error={error} ref={elementRef}>
      {contentLeft && <S.Content>{contentLeft}</S.Content>}
      <S.InputWrapper>
        {renderStripeElement()}
        {label && (
          <InputLabel
            labelBackground={labelBackground}
            active={active || !!filled}
          >
            {label}
          </InputLabel>
        )}
      </S.InputWrapper>
      {contentRight && <S.Content>{contentRight}</S.Content>}
    </S.Wrapper>
  );
};

export { StripeInputElement };
