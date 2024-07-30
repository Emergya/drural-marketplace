import { RefreshToken_tokenRefresh } from "@saleor/auth/types/RefreshToken";

import { accessTokenField } from "./utils";

export type ServerError = Error & {
  response: Response;
  result: Record<string, any>;
  statusCode: number;
};

export type ServerParseError = Error & {
  response: Response;
  statusCode: number;
  bodyText: string;
};

export interface IParseBoby {
  data: {
    [accessTokenField]: Omit<RefreshToken_tokenRefresh, "user">;
  };
  errors: any[];
}
