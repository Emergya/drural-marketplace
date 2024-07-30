/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MenuQuery
// ====================================================

export interface MenuQuery_menu_items_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface MenuQuery_menu_items_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface MenuQuery_menu_items_page {
  __typename: "Page";
  slug: string;
}

export interface MenuQuery_menu_items_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MenuQuery_menu_items_children_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface MenuQuery_menu_items_children_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
}

export interface MenuQuery_menu_items_children_page {
  __typename: "Page";
  slug: string;
}

export interface MenuQuery_menu_items_children_parent {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MenuQuery_menu_items_children {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: MenuQuery_menu_items_children_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: MenuQuery_menu_items_children_collection | null;
  page: MenuQuery_menu_items_children_page | null;
  parent: MenuQuery_menu_items_children_parent | null;
}

export interface MenuQuery_menu_items {
  __typename: "MenuItem";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: MenuQuery_menu_items_category | null;
  /**
   * URL to the menu item.
   */
  url: string | null;
  collection: MenuQuery_menu_items_collection | null;
  page: MenuQuery_menu_items_page | null;
  parent: MenuQuery_menu_items_parent | null;
  children: (MenuQuery_menu_items_children | null)[] | null;
}

export interface MenuQuery_menu {
  __typename: "Menu";
  /**
   * The ID of the object.
   */
  id: string;
  items: (MenuQuery_menu_items | null)[] | null;
}

export interface MenuQuery {
  /**
   * Look up a navigation menu by ID or name.
   */
  menu: MenuQuery_menu | null;
}

export interface MenuQueryVariables {
  channel: string;
  slug: string;
}
