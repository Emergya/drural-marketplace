import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <MetaConsumer>
    {({ title, description, image, type, url, custom }) => (
      <>
        <Helmet
          title={title}
          meta={[
            // Prymary meta tags
            { name: "description", content: description },
            // Open Graph / Facebook meta tags
            { property: "og:url", content: url },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:type", content: type },
            { property: "og:image", content: image },
            // Twitter meta tags
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:url", content: url },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description },
            { name: "twitter:image", content: image },
            ...custom,
          ]}
        />
        {children}
      </>
    )}
  </MetaConsumer>
);

export default Consumer;
