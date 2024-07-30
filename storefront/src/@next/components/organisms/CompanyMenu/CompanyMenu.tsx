import { UilAngleDown, UilBars } from "@iconscout/react-unicons";
import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useMediaPredicate } from "react-media-hook";
import { ThemeContext } from "styled-components";

import { Loader, SearchInput, StyledLink, Tab, Tabs } from "@components/atoms";
import { useHandlerWhenClickedOutside } from "@hooks";
import { ActiveTab } from "@pages/CompanyPage/types";
import { DruralTheme } from "@styles";
import { largeScreen } from "@styles/constants";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const CompanyMenu: React.FC<IProps> = ({
  activeTab,
  categories,
  categoriesPageInfo,
  loadingCategories,
  queryParams,
  searcherDisabled,
  handleBestSellingClick,
  handleClearProductFilters,
  handleFilterByCategory,
  handleFilterBySearch,
  handleNewInClick,
  handleReviewsClick,
  nextCategories,
}) => {
  // 1. Variables
  const intl = useIntl();
  const themeContext = useContext<DruralTheme>(ThemeContext);
  const isMobile = useMediaPredicate(`(max-width: ${largeScreen}px)`);
  const isDesktop = !isMobile;

  // 2. State
  //   Categories dorpdown state
  const [
    isCategoriesDropdownVisible,
    setCategoriesDropdownVisibility,
  ] = useState(false);
  const {
    setElementRef: setCategoriesDropdownRef,
  } = useHandlerWhenClickedOutside(() => {
    setCategoriesDropdownVisibility(false);
  });
  //   Mobile dropdown state
  const [
    isMobileMenuDropdownVisible,
    setMobileMenuDropdownVisibility,
  ] = useState(false);
  const {
    setElementRef: setMobileMenuDropdownRef,
  } = useHandlerWhenClickedOutside(() => {
    setMobileMenuDropdownVisibility(false);
  });

  // 3. Events
  const closeMobileDropdown = () => {
    if (isMobile) {
      setMobileMenuDropdownVisibility(false);
    }
  };

  // 4. Render
  return (
    <S.Menu ref={isMobile ? setMobileMenuDropdownRef() : null}>
      {isMobile && (
        <S.MobileMenuHeader>
          <Tab
            onClick={() =>
              setMobileMenuDropdownVisibility(!isMobileMenuDropdownVisible)
            }
          >
            <UilBars size={24} color={themeContext.colors.white} />
          </Tab>
          <Tab>
            <SearchInput
              disabled={searcherDisabled}
              fullWidth
              placeholder={intl.formatMessage(commonMessages.searchInTheShop)}
              textSize="small"
              theming="dark"
              value={queryParams.search || ""}
              onChange={e => handleFilterBySearch(e.target?.value)}
            />
          </Tab>
        </S.MobileMenuHeader>
      )}

      {(isDesktop || isMobileMenuDropdownVisible) && (
        <Tabs>
          <Tab
            isActive={activeTab === ActiveTab.ALL_SERVICES}
            onClick={() => {
              handleClearProductFilters();
              closeMobileDropdown();
            }}
          >
            <S.TabText>
              <FormattedMessage {...commonMessages.allServices} />
            </S.TabText>
          </Tab>
          <S.CategoriesTab
            isActive={activeTab === ActiveTab.CATEGORIES}
            ref={setCategoriesDropdownRef()}
          >
            <S.CategoriesDropdown>
              <S.CategoriesDropdownTitle
                onClick={() =>
                  setCategoriesDropdownVisibility(!isCategoriesDropdownVisible)
                }
              >
                <S.TabText>
                  <FormattedMessage {...commonMessages.categories} />
                </S.TabText>
                <UilAngleDown
                  size={themeContext.typography.baseFontSize}
                  color={themeContext.colors.white}
                />
              </S.CategoriesDropdownTitle>
              {isCategoriesDropdownVisible && (
                <S.CategoriesDropdownContent>
                  {categories?.map(({ id, name }) => (
                    <S.CategoriesDropdownItem
                      key={id}
                      onClick={() => {
                        handleFilterByCategory(id);
                        setCategoriesDropdownVisibility(false);
                        closeMobileDropdown();
                      }}
                    >
                      {name}
                    </S.CategoriesDropdownItem>
                  ))}
                  {loadingCategories ? (
                    <S.CategoriesDropdownNoHoverItem>
                      <Loader />
                    </S.CategoriesDropdownNoHoverItem>
                  ) : (
                    categoriesPageInfo?.hasNextPage && (
                      <S.CategoriesDropdownNoHoverItem
                        onClick={() => {
                          nextCategories();
                        }}
                      >
                        <StyledLink underline>
                          <FormattedMessage {...commonMessages.loadMore} />
                        </StyledLink>
                      </S.CategoriesDropdownNoHoverItem>
                    )
                  )}
                </S.CategoriesDropdownContent>
              )}
            </S.CategoriesDropdown>
          </S.CategoriesTab>
          <Tab
            isActive={activeTab === ActiveTab.NEW_IN}
            onClick={() => {
              handleNewInClick();
              closeMobileDropdown();
            }}
          >
            <S.TabText>
              <FormattedMessage {...commonMessages.newIn} />
            </S.TabText>
          </Tab>
          <Tab
            isActive={activeTab === ActiveTab.BEST_SELLING}
            onClick={() => {
              handleBestSellingClick();
              closeMobileDropdown();
            }}
          >
            <S.TabText>
              <FormattedMessage {...commonMessages.bestSelling} />
            </S.TabText>
          </Tab>
          <Tab
            isActive={activeTab === ActiveTab.REVIEWS}
            onClick={() => {
              handleReviewsClick();
              closeMobileDropdown();
            }}
          >
            <S.TabText>
              <FormattedMessage {...commonMessages.reviews} />
            </S.TabText>
          </Tab>
          {isDesktop && (
            <Tab>
              <SearchInput
                disabled={searcherDisabled}
                fullWidth
                placeholder={intl.formatMessage(commonMessages.searchInTheShop)}
                textSize="small"
                theming="dark"
                value={queryParams.search || ""}
                onChange={e => {
                  handleFilterBySearch(e.target?.value);
                }}
              />
            </Tab>
          )}
        </Tabs>
      )}
    </S.Menu>
  );
};
