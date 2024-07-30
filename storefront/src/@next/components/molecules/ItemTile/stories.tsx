import { storiesOf } from "@storybook/react";
import React from "react";

import { IconBackground } from "@components/atoms";
import { ItemTile, Thumbnail } from "@components/molecules";

import { category, collection } from "./fixures";

storiesOf("@components/molecules/ItemTile", module)
  .addParameters({ component: ItemTile })
  .add("image tile", () => (
    <ItemTile
      name={collection.name}
      picture={
        <Thumbnail
          source={{
            thumbnail: collection.backgroundImage,
          }}
        />
      }
      pictureSize={144}
      onClick={() => null}
    />
  ))
  .add("icon tile", () => (
    <ItemTile
      name={category.name}
      picture={
        <IconBackground
          iconId={category.iconId}
          iconBackgroundSize="100%"
          iconSize={42}
        />
      }
      pictureSize={144}
      onClick={() => null}
    />
  ));
