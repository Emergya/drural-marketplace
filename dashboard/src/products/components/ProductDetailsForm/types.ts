import { OutputData } from "@editorjs/editorjs";
import { ChannelData, ChannelPriceArgs } from "@saleor/channels/utils";
import { RichTextEditorChange } from "@saleor/components/RichTextEditor";
import { ProductChannelListingErrorFragment } from "@saleor/fragments/types/ProductChannelListingErrorFragment";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";

export interface ProductDetailsFormProps {
  channelsErrors: ProductChannelListingErrorFragment[];
  data: {
    channelListings: ChannelData[];
    description: OutputData;
    details?: OutputData;
    isAvailable?: boolean;
    isBillable: boolean;
    hasNoPrice: boolean;
    name: string;
    rating?: number;
  };
  disabled?: boolean;
  isSimpleProduct?: boolean;
  isUpdatePage?: boolean;
  errors: ProductErrorFragment[];
  onDescriptionChange: RichTextEditorChange;
  onDetailsChange?: RichTextEditorChange;
  onPriceChange?: (id: string, data: ChannelPriceArgs) => void;
  onChange(event: any);
  onHasNoPriceChange(event: any);
}
