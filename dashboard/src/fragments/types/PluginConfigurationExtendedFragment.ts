/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConfigurationTypeFieldEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: PluginConfigurationExtendedFragment
// ====================================================

export interface PluginConfigurationExtendedFragment_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface PluginConfigurationExtendedFragment_configuration {
  __typename: "ConfigurationItem";
  /**
   * Name of the field.
   */
  name: string;
  /**
   * Current value of the field.
   */
  value: string | null;
  /**
   * Type of the field.
   */
  type: ConfigurationTypeFieldEnum | null;
  /**
   * Help text for the field.
   */
  helpText: string | null;
  /**
   * Label for the field.
   */
  label: string | null;
}

export interface PluginConfigurationExtendedFragment {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: PluginConfigurationExtendedFragment_channel | null;
  /**
   * Configuration of the plugin.
   */
  configuration: (PluginConfigurationExtendedFragment_configuration | null)[] | null;
}
