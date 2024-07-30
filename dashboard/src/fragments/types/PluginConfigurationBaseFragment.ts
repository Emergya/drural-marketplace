/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PluginConfigurationBaseFragment
// ====================================================

export interface PluginConfigurationBaseFragment_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface PluginConfigurationBaseFragment {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: PluginConfigurationBaseFragment_channel | null;
}
