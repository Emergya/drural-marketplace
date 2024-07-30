import { CategoryDetails } from "@drural/sdk/lib/fragments/gqlTypes/CategoryDetails";
import {
  UilAngleLeft,
  UilAngleRight,
  UilEstate,
} from "@iconscout/react-unicons";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { generatePath } from "react-router";

import { paths } from "@paths";

import * as S from "./styles";

import "./scss/index.scss";
import { smallScreen } from "../../globalStyles/scss/variables.scss";

export interface Breadcrumb {
  value: string;
  link: string;
}

type BreadcrumbCategory = Pick<CategoryDetails, "slug" | "name">;

export const extractBreadcrumbs = (
  category: BreadcrumbCategory,
  ancestors?: BreadcrumbCategory[],
  collection: boolean = false
) => {
  const constructLink = ({ slug, name }: BreadcrumbCategory) => ({
    link: generatePath(collection ? paths.collection : paths.category, {
      slug,
    }),
    value: name,
  });

  let breadcrumbs = [constructLink(category)];

  if (ancestors && ancestors.length) {
    const ancestorsList = ancestors.map(category => constructLink(category));
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1
    ? breadcrumbs[breadcrumbs.length - 2].link
    : paths.home;

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
  <Media
    query={{
      minWidth: smallScreen,
    }}
  >
    {matches =>
      matches ? (
        <ul className="breadcrumbs">
          <li>
            <Link href={paths.home}>
              <S.HomeLink>
                <UilEstate size={22} />
              </S.HomeLink>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={`${breadcrumb.value}-${index}`}
              className={classNames({
                breadcrumbs__active: index === breadcrumbs.length - 1,
              })}
            >
              <Link href={breadcrumb.link}>
                <S.BreadCrumbsLink>
                  <UilAngleRight size={22} />
                  {breadcrumb.value}
                </S.BreadCrumbsLink>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <S.BreadCrumbsMobile className="breadcrumbs">
          <Link href={getBackLink(breadcrumbs)}>
            <a className="breadcrumb-mobile">
              <>
                <UilAngleLeft size={22} />
                <FormattedMessage defaultMessage="Back" />
              </>
            </a>
          </Link>
        </S.BreadCrumbsMobile>
      )
    }
  </Media>
);

export default Breadcrumbs;
