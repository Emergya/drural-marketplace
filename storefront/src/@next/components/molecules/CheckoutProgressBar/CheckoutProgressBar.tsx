import { UilCheck } from "@iconscout/react-unicons";
import Link from "next/link";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import { checkoutMessages } from "@temp/intl";
import { ICheckoutStep } from "@types";

import * as S from "./styles";
import { IProps } from "./types";

const activeDot = (i: number) => (
  <S.ActiveDot>
    <S.Dot done>
      <S.DotNumber>{i + 1}</S.DotNumber>
    </S.Dot>
  </S.ActiveDot>
);

const doneDot = (i: number) => (
  <S.Dot done>
    <UilCheck color="#fff" />
  </S.Dot>
);

const inactiveDot = (i: number) => (
  <S.Dot>
    <S.DotNumber>{i + 1}</S.DotNumber>
  </S.Dot>
);

const generateDot = (stepIndex: number, currentActiveStep: number) => {
  if (stepIndex < currentActiveStep) {
    return doneDot(stepIndex);
  }
  if (stepIndex === currentActiveStep) {
    return activeDot(stepIndex);
  }
  if (stepIndex > currentActiveStep) {
    return inactiveDot(stepIndex);
  }
};

const generateLabel = (
  stepIndex: number,
  name: string,
  numberOfSteps: number
) => {
  if (stepIndex === 0) {
    return <S.LeftLabel>{name}</S.LeftLabel>;
  }
  if (stepIndex === numberOfSteps - 1) {
    return <S.RightLabel>{name}</S.RightLabel>;
  }
  return <S.Label>{name}</S.Label>;
};

const generateProgressBar = (
  index: number,
  currentActive: number,
  numberOfSteps: number
) => {
  if (index !== numberOfSteps - 1) {
    return <S.ProgressBar done={currentActive > index} />;
  }
};

const generateSteps = (
  steps: ICheckoutStep[],
  currentActive: number,
  intl: IntlShape
) => {
  return steps?.map((step, index) => {
    let { name } = step;
    /* eslint-disable default-case */
    switch (step.name) {
      case "Address":
        name = intl.formatMessage(checkoutMessages.stepNameAddress);
        break;
      case "Shipping":
        name = intl.formatMessage(checkoutMessages.stepNameShipping);
        break;
      case "Payment":
        name = intl.formatMessage(checkoutMessages.stepNamePayment);
        break;
      case "Review":
        name = intl.formatMessage(checkoutMessages.stepNameDetails);
        break;
    }
    return (
      <S.Step key={step.index}>
        <Link href={step.link}>
          <a>
            {generateDot(index, currentActive)}
            {generateLabel(index, name, steps.length)}
          </a>
        </Link>
        {generateProgressBar(index, currentActive, steps.length)}
      </S.Step>
    );
  });
};

/**
 * Progress bar showing current step of checkout process.
 */
const CheckoutProgressBar: React.FC<IProps> = ({
  steps,
  activeStep,
}: IProps) => {
  const intl = useIntl();
  return <S.Wrapper>{generateSteps(steps, activeStep, intl)}</S.Wrapper>;
};

export { CheckoutProgressBar };
