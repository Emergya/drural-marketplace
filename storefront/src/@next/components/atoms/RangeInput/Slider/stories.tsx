import { storiesOf } from "@storybook/react";
import React from "react";

import { SliderInput } from "..";
import * as S from "../styles";

// Marks
const sliderMarks = {
  50: {
    label: "50 Km",
    style: {
      ...S.rangeInput.markStyle,
      width: "50%",
    },
  },
};

storiesOf("@components/atoms/RangeInput", module)
  .addParameters({ component: SliderInput })
  .add("SliderInput", () => (
    <div style={{ width: "400px", padding: "22px 52px 32px 32px" }}>
      <SliderInput
        value={20}
        min={10}
        max={50}
        step={5}
        marks={sliderMarks}
        units="Km"
      />
    </div>
  ));
