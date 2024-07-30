import { storiesOf } from "@storybook/react";
import React from "react";

import { RangeInput } from "..";
import * as S from "../styles";

// Marks
const rangeMarks = {
  100: {
    label: "100 €",
    style: {
      ...S.rangeInput.markStyle,
      width: "50%",
    },
  },
};

storiesOf("@components/atoms/RangeInput", module)
  .addParameters({ component: RangeInput })
  .add("RangeInput", () => (
    <div style={{ width: "400px", padding: "22px 52px 32px 32px" }}>
      <RangeInput
        value={[20, 50]}
        min={10}
        max={100}
        step={5}
        marks={rangeMarks}
        units="Km"
      />
    </div>
  ));
