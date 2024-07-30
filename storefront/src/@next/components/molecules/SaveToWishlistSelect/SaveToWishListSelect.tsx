import { UilAngleDown, UilPlus } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useHandlerWhenClickedOutside } from "@hooks";
import { dRuralTheme } from "@styles";

import * as S from "./styles";
import { IProps } from "./types";

export const SaveToWishListSelect: React.FC<IProps> = ({
  wishlists,
  handleClickListItem,
  handleClickAddService,
}: IProps) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowMenu(false);
  });

  return (
    <S.Wrapper
      rotate={showMenu}
      onClick={() => {
        setShowMenu(!showMenu);
      }}
      ref={setElementRef()}
    >
      <S.SelectTitle>
        <FormattedMessage defaultMessage="Save to wishlist" />
      </S.SelectTitle>
      <UilAngleDown size={24} color={dRuralTheme.colors.druralGray_400} />
      {showMenu && (
        <S.Overlay>
          {wishlists.map(wishlist => (
            <div
              onClick={evt => {
                evt.stopPropagation();
                setShowMenu(false);
              }}
              key={wishlist.id}
            >
              <S.MenuItem
                onClick={evt => {
                  evt.stopPropagation();
                  handleClickListItem(wishlist.id, wishlist.name);
                  setShowMenu(false);
                }}
              >
                {wishlist.name}
              </S.MenuItem>
            </div>
          ))}
          <S.SaveToNewListItem
            onClick={evt => {
              evt.stopPropagation();
              handleClickAddService();
              setShowMenu(false);
            }}
          >
            <UilPlus size={24} color="#FFF" />
            <FormattedMessage defaultMessage="Save to new list" />
          </S.SaveToNewListItem>
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};
