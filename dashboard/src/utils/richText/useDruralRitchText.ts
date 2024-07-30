import { OutputData } from "@editorjs/editorjs";
import { RichTextEditorChange } from "@saleor/components/RichTextEditor";
import { useEffect, useState } from "react";

function useDruralRichText(opts: {
  initial: string | null;
  triggerChange: () => void;
}): [OutputData, RichTextEditorChange] {
  const [data, setData] = useState<OutputData>();
  const [, setLoaded] = useState(false);

  useEffect(() => {
    if (opts.initial === null) {
      setData({ blocks: [] });
      setLoaded(true);
      return;
    }

    try {
      setData(JSON.parse(opts.initial));
      setLoaded(true);
    } catch {
      setData(undefined);
    }
  }, [opts.initial]);

  const change: RichTextEditorChange = newData => {
    opts.triggerChange();
    setData(newData);
  };

  return [data, change];
}

export default useDruralRichText;
