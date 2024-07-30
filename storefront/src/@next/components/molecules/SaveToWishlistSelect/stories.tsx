import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { WishLists_me_wishlists_edges_node } from "@pages/WishList/gqlTypes/WishLists";
import { styled } from "@styles";

import { SaveToWishListSelect } from ".";

const Wrapper = styled.div`
  margin-top: 100px;
  width: 360px;
`;

const wishlists: WishLists_me_wishlists_edges_node[] = [
  {
    __typename: "Wishlist",
    id: "MTY3NjE2ODA1",
    name: "My private wishlist",
    image:
      "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F0c3x8fHx8fDE2MzM2OTE4Nzc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    imageUrl: "",
  },
  {
    __typename: "Wishlist",
    id: "MTY3NjE2ODB1",
    name: "Default wishlist",
    image:
      "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F0c3x8fHx8fDE2MzM2OTE4Nzc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    imageUrl: "",
  },
];

const handleClick = () => {};
const handleClickAddService = () => {};

storiesOf("@components/molecules/SaveToWishListSelect", module)
  .addParameters({ component: SaveToWishListSelect })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => (
    <Wrapper>
      <SaveToWishListSelect
        wishlists={wishlists}
        handleClickListItem={handleClick}
        handleClickAddService={handleClickAddService}
      />
    </Wrapper>
  ));
