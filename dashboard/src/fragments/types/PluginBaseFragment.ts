/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PluginBaseFragment
// ====================================================

export interface PluginBaseFragment_channelConfigurations_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface PluginBaseFragment_channelConfigurations {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: PluginBaseFragment_channelConfigurations_channel | null;
}

export interface PluginBaseFragment_globalConfiguration_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface PluginBaseFragment_globalConfiguration {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: PluginBaseFragment_globalConfiguration_channel | null;
}

export interface PluginBaseFragment {
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
   * Channel-specific plugin configuration.
   */
  channelConfigurations: PluginBaseFragment_channelConfigurations[];
  /**
   * Global configuration of the plugin (not channel-specific).
   */
  globalConfiguration: PluginBaseFragment_globalConfiguration | null;
}
