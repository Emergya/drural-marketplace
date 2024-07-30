import React from "react";

export interface StatusLabelProps {
  label: string | React.ReactNode;
  status: "success" | "alert" | "neutral" | "error" | string;
}
