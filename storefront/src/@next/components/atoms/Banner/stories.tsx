import { storiesOf } from "@storybook/react";
import React from "react";

import defaultImg from "../../../../images/dRuralImages/seller-img.png";
import { Banner } from ".";

storiesOf("@components/atoms/Banner", module)
  .addParameters({ component: Banner })
  .add("default", () => <Banner imageUrl={defaultImg} />);
