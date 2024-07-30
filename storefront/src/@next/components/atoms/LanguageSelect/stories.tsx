import { storiesOf } from "@storybook/react";
import React from "react";
import { useIntl } from "react-intl";

import { LanguageSelect } from ".";
import { getLanguageObject } from "./utils";

const DEFAULT_PROPS = {
  optionLabelKey: "label",
  optionValueKey: "value",
  options: [
    { value: "es", label: "Spanish" },
    { value: "en", label: "English" },
  ],
};

const Container = () => {
  const intl = useIntl();
  const [value, setValue] = React.useState("en");
  return (
    <div style={{ backgroundColor: "black", marginTop: "200px" }}>
      <LanguageSelect
        value={getLanguageObject(value, intl)}
        onChange={value => setValue(value)}
        {...DEFAULT_PROPS}
      />
    </div>
  );
};

storiesOf("@components/atoms/LanguageSelect", module)
  .addParameters({ component: LanguageSelect })
  .add("sample select", () => {
    return <Container />;
  });
