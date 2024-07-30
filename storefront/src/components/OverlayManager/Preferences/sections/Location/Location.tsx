/* import { SwitchChangeEventHandler } from "rc-switch"; */
import React from "react";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import { SliderInput /* , SwitchInput  */ } from "@components/atoms";
import * as SliderStyles from "@components/atoms/RangeInput/styles";

import locationIllustration from "../../../../../images/dRuralImages/ilustracion_envio.svg";
import * as S from "./styles";
import { IProps } from "./types";

const sliderMarks = {
  100: {
    label: "100 Km",
    style: {
      ...SliderStyles.rangeInput.markStyle,
      width: "50%",
      left: "95%",
    },
  },
};

const Location: React.FC<IProps> = ({ location, updateLocation }) => {
  /*   const switchChange: SwitchChangeEventHandler = value => {
    updateLocation({ ...location, accessLocation: value });
  }; */
  const sliderChange = (value: number) => {
    updateLocation({ ...location, distanceNearMe: value });
  };
  return (
    <S.Wrapper>
      <S.TextDiv>
        <h2>
          <FormattedMessage defaultMessage="Your location" />
        </h2>
        <p>
          <FormattedMessage defaultMessage="Allow dRural to track your location so we can show you the most amazing services near you." />
        </p>
      </S.TextDiv>
      <S.Container>
        <S.LocationWrapper>
          {/*           <S.SwitchWrapper>
            <p>
              <FormattedMessage defaultMessage="Allow dRural to access my location" />
            </p>
            <SwitchInput
              checked={location.accessLocation}
              onChange={switchChange}
            />
          </S.SwitchWrapper> */}
          <S.DistanceWrapper>
            <p>
              <FormattedMessage defaultMessage="Show services this distance near me" />
            </p>
            <SliderInput
              value={location.distanceNearMe}
              min={0}
              max={100}
              step={5}
              units="Km"
              onChange={sliderChange}
              marks={sliderMarks}
              zIndex={20}
            />
          </S.DistanceWrapper>
        </S.LocationWrapper>
        <S.ImageWrapper>
          <ReactSVG path={locationIllustration} />
        </S.ImageWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

export default Location;
