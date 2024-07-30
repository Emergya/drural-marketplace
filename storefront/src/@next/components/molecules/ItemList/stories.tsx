import { storiesOf } from "@storybook/react";
import React from "react";

import { ItemTile, Thumbnail } from "@components/molecules";

import { ItemList } from ".";
import { collections } from "./fixures";

storiesOf("@components/molecules/ItemList", module)
  .addParameters({ component: ItemList })
  .add("basic list", () => (
    <ItemList title="Collections" items={collections || []} columns={6}>
      {({ id, name, backgroundImage }) => (
        <ItemTile
          key={id}
          name={name}
          picture={
            <Thumbnail
              source={{
                thumbnail: backgroundImage,
              }}
            />
          }
          pictureSize={144}
          onClick={() => null}
        />
      )}
    </ItemList>
  ))
  .add("can load more", () => (
    <ItemList
      title="Collections"
      items={collections || []}
      columns={6}
      canLoadMore
    >
      {({ id, name, backgroundImage }) => (
        <ItemTile
          key={id}
          name={name}
          picture={
            <Thumbnail
              source={{
                thumbnail: backgroundImage,
              }}
            />
          }
          pictureSize={144}
          onClick={() => null}
        />
      )}
    </ItemList>
  ));
