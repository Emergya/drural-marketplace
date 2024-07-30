import EditorJSHTML from "editorjs-html";
import React, { useRef } from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const RichTextEditorContent: React.FC<IProps> = ({ jsonData }) => {
  const editorHtml = useRef(EditorJSHTML());
  const data = jsonData ? JSON.parse(jsonData) : [];

  if (!jsonData) {
    return null;
  }

  return (
    <S.Content
      dangerouslySetInnerHTML={{
        __html: editorHtml.current.parse(data).join(""),
      }}
    />
  );
};
