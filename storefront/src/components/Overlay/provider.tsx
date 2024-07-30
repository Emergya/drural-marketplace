/* eslint-disable react/no-unused-state */

import * as React from "react";
import { UrlObject } from "url";

import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "./context";

class Provider extends React.Component<
  { pathname: string },
  OverlayContextInterface
> {
  notificationCloseDelay = 2500;

  constructor(props) {
    super(props);
    this.state = {
      context: null,
      hide: this.hide,
      show: this.show,
      theme: null,
      type: null,
      redirectUrl: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.pathname !== prevProps.pathname &&
      this.state.type !== OverlayType.message
    ) {
      this.hide();
    }
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme,
    context?: InnerOverlayContextInterface,
    redirectUrl?: UrlObject | string
  ) => {
    this.setState({ type, theme, context, redirectUrl });
    document.body.style.overflow = type !== OverlayType.message ? "hidden" : "";
    if (type === OverlayType.message) {
      setTimeout(this.hide, this.notificationCloseDelay);
    }
  };

  hide = () => {
    this.setState({ type: null, redirectUrl: null });
    document.body.style.overflow = "";
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default Provider;
