import { createUploadLink } from "apollo-upload-client";

import { linkOptions } from "../utils";

// IMPORTANT: this is a terminanting link
export const uploadLink = createUploadLink(linkOptions);
