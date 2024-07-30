import * as Unicons from "@iconscout/react-unicons";
import React from "react";

export const getUnicon = (
  uniconId: string | null
): React.FC<{ size?: number }> => Unicons[uniconId || "UilImageBlock"];
