import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { styled } from "@styles";

import { CategoriesChecklist } from ".";

const categories = [
  { __typename: "Category" as "Category", name: "Sport", id: "jkalsdjla12344" },
  { __typename: "Category" as "Category", name: "Health", id: "jkalsdjla1333" },
  {
    __typename: "Category" as "Category",
    name: "Electronics",
    id: "jkalsdjla1222",
  },
];

const categoriesFilter = ["jkalsdjla12344", "jkalsdjla1222"];

const Container = styled.div`
  width: 360px;
`;

storiesOf("@components/molecules/CategoriesChecklist", module)
  .addParameters({ component: CategoriesChecklist })
  .add("default", () => (
    <Container>
      <CategoriesChecklist
        categories={categories}
        categoriesFilter={categoriesFilter}
        onCategoriesFilterChange={action("click")}
      />
    </Container>
  ));
