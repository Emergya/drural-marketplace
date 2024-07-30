import { UilSearch } from "@iconscout/react-unicons";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { dRuralTheme } from "src/@next/globalStyles/";

import { IconButtonDrural } from "@components/atoms";
import { SearchbarMobileTile } from "@components/atoms/SearchbarMobileTile";
import { SearchMobileTile } from "@components/molecules/SearchMobileTile";
import { UserMenu } from "@components/molecules/UserMenu";
import { useHandlerWhenClickedOutside } from "@hooks/useHandlerWhenClickedOutside";
import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import {
  MenuDropdown,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../../../components/index";
import logoPositive from "../../../../images/logo.svg";
import logoNegative from "../../../../images/logo_negative.svg";
import { Avatar } from "../../atoms/Avatar";
import { LogoBrandContext } from "../../containers/LogoBrandProvider/LogoBrandProvider";
import { SearchbarDesktop } from "../SearchbarDesktop";
import * as S from "./styles";
import { IProps } from "./types";

export const Header: React.FC<IProps> = ({
  loading,
  user,
  handleSignOut,
  location,
  distance,
  onDistanceChange,
  onMobileItemClick,
  onPriceChange,
  onQueryChange,
  onSearchItemClick,
  onSubmit,
  price,
  query,
  resetSearch,
  suggestions,
}) => {
  const [scrollY, setScrollY] = useState<boolean>(false);
  const overlayContext = useContext(OverlayContext);
  const [searchTileShow, setSearchTileShow] = React.useState(false);
  const brand = useContext(LogoBrandContext);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setSearchTileShow(false);
    resetSearch();
  });

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY >= parseInt(dRuralTheme.header.height.desktop, 10)) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <S.HeaderContainer color={location} scroll={scrollY} ref={setElementRef()}>
      <S.GridContainer color={location} scroll={scrollY}>
        <S.GridItem className="grid-item-1">
          <Link href={paths.home}>
            <a>
              <Media
                query={{ minWidth: dRuralTheme.breakpoints.mediumScreen }}
                render={() =>
                  location === "/" && !scrollY ? (
                    <S.LogoWrapper path={brand?.logo || logoNegative} />
                  ) : (
                    <S.LogoWrapper path={brand?.logo || logoPositive} />
                  )
                }
              />
              <Media
                query={{ maxWidth: dRuralTheme.breakpoints.mediumScreen }}
                render={() => (
                  <S.LogoWrapper path={brand?.logo || logoPositive} />
                )}
              />
            </a>
          </Link>
        </S.GridItem>
        <S.GridItem className="grid-item-2">
          <>
            <Media
              query={{ maxWidth: dRuralTheme.breakpoints.mediumScreen }}
              render={() =>
                location !== "/" && !searchTileShow ? (
                  <IconButtonDrural
                    color="primary"
                    onClick={() => setSearchTileShow(true)}
                    testingContext="editCategoriesButton"
                  >
                    <UilSearch size="24" color="#fff" />
                  </IconButtonDrural>
                ) : (
                  <></>
                )
              }
            />
            <Media
              query={{ minWidth: dRuralTheme.breakpoints.mediumScreen }}
              render={() =>
                location !== "/" && !searchTileShow ? (
                  <SearchbarMobileTile
                    onClick={() => setSearchTileShow(true)}
                  />
                ) : (
                  <></>
                )
              }
            />
          </>
        </S.GridItem>
        <S.GridItem className="grid-item-3">
          {!loading && (
            <>
              {user ? (
                <MenuDropdown
                  head={<Avatar source={user.avatar?.url} />}
                  content={
                    <UserMenu
                      name={user?.firstName}
                      notifications={0}
                      messages={0}
                      handleSignOut={handleSignOut}
                    />
                  }
                />
              ) : (
                <S.RestyledButton
                  color="labelOnlyPrimary"
                  testingContext="testButton"
                  onClick={() =>
                    overlayContext.show(OverlayType.login, OverlayTheme.modal)
                  }
                >
                  <FormattedMessage {...commonMessages.logIn} />
                </S.RestyledButton>
              )}
            </>
          )}
        </S.GridItem>
      </S.GridContainer>

      <S.SearchPopUpContainer>
        <Media
          query={{ minWidth: dRuralTheme.breakpoints.mediumScreen }}
          render={() => {
            if (location !== "/" && searchTileShow) {
              return (
                <SearchbarDesktop
                  query={query || ""}
                  onQueryChange={onQueryChange}
                  distance={distance}
                  onDistanceChange={onDistanceChange}
                  price={price}
                  onPriceChange={onPriceChange}
                  suggestions={suggestions}
                  onSearchItemClick={onSearchItemClick}
                  onSubmit={event => {
                    onSubmit(event);
                    resetSearch();
                    setSearchTileShow(false);
                  }}
                />
              );
            }
            return null;
          }}
        />
        <Media
          query={{ maxWidth: dRuralTheme.breakpoints.mediumScreen }}
          render={() =>
            searchTileShow ? (
              <SearchMobileTile
                query={query || ""}
                suggestions={suggestions}
                onItemClick={search => {
                  onMobileItemClick(search);
                  setSearchTileShow(false);
                }}
                onChange={onQueryChange}
                onSubmit={event => {
                  onSubmit(event);
                  resetSearch();
                  setSearchTileShow(false);
                }}
                onClose={() => {
                  setSearchTileShow(false);
                  resetSearch();
                }}
              />
            ) : (
              <></>
            )
          }
        />
      </S.SearchPopUpContainer>
    </S.HeaderContainer>
  );
};
