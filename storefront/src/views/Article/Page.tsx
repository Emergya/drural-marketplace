import { useRouter } from "next/router";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { BackLink } from "@components/molecules";
import { Container } from "@components/templates";
import { paths } from "@paths";

import {
  PageBottomSpacing,
  RichTextEditorContent,
  Tile,
} from "../../@next/components/atoms";
import { PageTitle } from "../../@next/components/atoms/PageTitle/PageTitle";
import { IProps } from "./types";

export const Page: React.FC<IProps> = ({ page }) => {
  const { push } = useRouter();

  return (
    <Container>
      <BackLink onClick={() => push(paths.home)}>
        <FormattedMessage defaultMessage="Back to home" />
      </BackLink>
      <PageTitle title={page.title} />
      {page.content && (
        <Tile>
          <RichTextEditorContent jsonData={page.content} />
        </Tile>
      )}
      <PageBottomSpacing />
    </Container>
  );
};

export default Page;
