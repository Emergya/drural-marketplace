/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConfigurationTypeFieldEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: Plugin
// ====================================================

export interface Plugin_plugin_globalConfiguration_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Plugin_plugin_globalConfiguration_configuration {
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

export interface Plugin_plugin_globalConfiguration {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: Plugin_plugin_globalConfiguration_channel | null;
  /**
   * Configuration of the plugin.
   */
  configuration: (Plugin_plugin_globalConfiguration_configuration | null)[] | null;
}

export interface Plugin_plugin_channelConfigurations_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Plugin_plugin_channelConfigurations_configuration {
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

export interface Plugin_plugin_channelConfigurations {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: Plugin_plugin_channelConfigurations_channel | null;
  /**
   * Configuration of the plugin.
   */
  configuration: (Plugin_plugin_channelConfigurations_configuration | null)[] | null;
}

export interface Plugin_plugin {
  __typename: "Plugin";
  /**
   * Identifier of the plugin.
   */
  id: string;
  /**
   * Name of the plugin.
   */
  name: string;
  /**
   * Description of the plugin.
   */
  description: string;
  /**
   * Global configuration of the plugin (not channel-specific).
   */
  globalConfiguration: Plugin_plugin_globalConfiguration | null;
  /**
   * Channel-specific plugin configuration.
   */
  channelConfigurations: Plugin_plugin_channelConfigurations[];
}

export interface Plugin {
  /**
   * Look up a plugin by ID.
   */
  plugin: Plugin_plugin | null;
}

export interface PluginVariables {
  id: string;
}
