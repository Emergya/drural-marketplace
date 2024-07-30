import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { Loader } from "@components/atoms";

import { MetaWrapper, NotFound } from "../../components";
import Page from "./Page";
import { usePageQuery } from "./query";

export const ArticleView: NextPage = () => {
  const {
    query: { slug },
  } = useRouter();

  const { data: pageData, loading: loadingPage } = usePageQuery(
    {
      slug: slug as string,
    },
    !slug
  );

  const { page } = pageData || {};

  if (loadingPage) {
    return <Loader fullScreen />;
  }

  if (!page) {
    return <NotFound />;
  }

  return (
    <MetaWrapper
      meta={{
        description: page.seoDescription,
        title: page.seoTitle,
      }}
    >
      <Page page={page} />
    </MetaWrapper>
  );
};
