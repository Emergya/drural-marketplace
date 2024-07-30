import { createUploadLink } from "apollo-upload-client";
import { getLinkOptions } from "../utils";

// IMPORTANT: this is a terminanting link
export const getUploadLink = (apiUrl: string) =>
  createUploadLink(getLinkOptions(apiUrl));
