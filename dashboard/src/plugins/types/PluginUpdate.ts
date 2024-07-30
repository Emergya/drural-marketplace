/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PluginUpdateInput, PluginErrorCode, ConfigurationTypeFieldEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PluginUpdate
// ====================================================

export interface PluginUpdate_pluginUpdate_errors {
  __typename: "PluginError";
  /**
   * The error code.
   */
  code: PluginErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface PluginUpdate_pluginUpdate_plugin_globalConfiguration_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface PluginUpdate_pluginUpdate_plugin_globalConfiguration_configuration {
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

export interface PluginUpdate_pluginUpdate_plugin_globalConfiguration {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: PluginUpdate_pluginUpdate_plugin_globalConfiguration_channel | null;
  /**
   * Configuration of the plugin.
   */
  configuration: (PluginUpdate_pluginUpdate_plugin_globalConfiguration_configuration | null)[] | null;
}

export interface PluginUpdate_pluginUpdate_plugin_channelConfigurations_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface PluginUpdate_pluginUpdate_plugin_channelConfigurations_configuration {
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

export interface PluginUpdate_pluginUpdate_plugin_channelConfigurations {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: PluginUpdate_pluginUpdate_plugin_channelConfigurations_channel | null;
  /**
   * Configuration of the plugin.
   */
  configuration: (PluginUpdate_pluginUpdate_plugin_channelConfigurations_configuration | null)[] | null;
}

export interface PluginUpdate_pluginUpdate_plugin {
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
  globalConfiguration: PluginUpdate_pluginUpdate_plugin_globalConfiguration | null;
  /**
   * Channel-specific plugin configuration.
   */
  channelConfigurations: PluginUpdate_pluginUpdate_plugin_channelConfigurations[];
}

export interface PluginUpdate_pluginUpdate {
  __typename: "PluginUpdate";
  errors: PluginUpdate_pluginUpdate_errors[];
  plugin: PluginUpdate_pluginUpdate_plugin | null;
}

export interface PluginUpdate {
  /**
   * Update plugin configuration.
   */
  pluginUpdate: PluginUpdate_pluginUpdate | null;
}

export interface PluginUpdateVariables {
  channelId?: string | null;
  id: string;
  input: PluginUpdateInput;
}
