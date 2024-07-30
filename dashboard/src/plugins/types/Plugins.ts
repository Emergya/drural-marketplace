/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PluginFilterInput, PluginSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: Plugins
// ====================================================

export interface Plugins_plugins_edges_node_channelConfigurations_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Plugins_plugins_edges_node_channelConfigurations {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: Plugins_plugins_edges_node_channelConfigurations_channel | null;
}

export interface Plugins_plugins_edges_node_globalConfiguration_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface Plugins_plugins_edges_node_globalConfiguration {
  __typename: "PluginConfiguration";
  /**
   * Determines if plugin is active or not.
   */
  active: boolean;
  /**
   * The channel to which the plugin configuration is assigned to.
   */
  channel: Plugins_plugins_edges_node_globalConfiguration_channel | null;
}

export interface Plugins_plugins_edges_node {
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
  channelConfigurations: Plugins_plugins_edges_node_channelConfigurations[];
  /**
   * Global configuration of the plugin (not channel-specific).
   */
  globalConfiguration: Plugins_plugins_edges_node_globalConfiguration | null;
}

export interface Plugins_plugins_edges {
  __typename: "PluginCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Plugins_plugins_edges_node;
}

export interface Plugins_plugins_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface Plugins_plugins {
  __typename: "PluginCountableConnection";
  edges: Plugins_plugins_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: Plugins_plugins_pageInfo;
}

export interface Plugins {
  /**
   * List of plugins.
   */
  plugins: Plugins_plugins | null;
}

export interface PluginsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: PluginFilterInput | null;
  sort?: PluginSortingInput | null;
}
