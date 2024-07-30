import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { RatingStatisticsTile } from ".";

storiesOf("@components/molecules/RatingStatisticsTile", module)
  .addParameters({ component: RatingStatisticsTile })
  .add("default", () => (
    <div style={{ width: "370px" }}>
      <RatingStatisticsTile
        starPercentages={[60, 35, 5, 5, 10]}
        rating={2}
        totalReviews={11}
        onStarClick={starNumber =>
          action(`show reviews with ${starNumber} stars`)
        }
      />
    </div>
  ));
