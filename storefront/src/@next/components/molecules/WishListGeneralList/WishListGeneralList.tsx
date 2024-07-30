import { UilTrashAlt } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const WishListGeneralList: React.FC<IProps> = ({
  wishlists,
  handleClick,
  active,
  setListToDelete,
  showDeleteListModal,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.ListHeader>
        <h3>
          <FormattedMessage defaultMessage="My lists" />
        </h3>
      </S.ListHeader>
      {wishlists.map((wishlist, index) => (
        <S.ListTile key={wishlist.id} active={active === wishlist.id}>
          <S.ListInfoContainer
            onClick={() =>
              handleClick(wishlist.id, wishlist.name, wishlist.imageUrl || "")
            }
          >
            <S.Image>
              <img src={wishlist.imageUrl || ""} alt="wishlist" />
            </S.Image>
            {wishlist.name}
          </S.ListInfoContainer>
          {wishlists.length !== index + 1 && (
            <S.DeleteIcon
              onClick={e => {
                e.stopPropagation();
                setListToDelete({
                  listId: wishlist.id,
                  listImageUrl: wishlist.imageUrl || "",
                  listName: wishlist.name,
                });
                showDeleteListModal(true);
              }}
            >
              <UilTrashAlt size="24" />
            </S.DeleteIcon>
          )}
        </S.ListTile>
      ))}
    </S.Wrapper>
  );
};
