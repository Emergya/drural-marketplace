import * as React from "react";
import { FormattedMessage } from "react-intl";

import { OfflinePlaceholder } from "@components/atoms";
import { CloseIcon } from "@components/atoms/CloseIcon";
import { LoginTabs } from "@components/molecules/LoginTabs";

import { SocialMediaLogin } from "@components/molecules/SocialMediaLogin";

import {
  LoginForm,
  Offline,
  Online,
  Overlay,
  OverlayContextInterface,
} from "../..";
import ForgottenPassword from "./ForgottenPassword";
import RegisterForm from "./RegisterForm";

import "./scss/index.scss";

import { GoogleOAuthProvider } from '@react-oauth/google';

class Login extends React.Component<
  { overlay: OverlayContextInterface; active?: "login" | "register" },
  { active: "login" | "register" }
> {
  static defaultProps = {
    active: "login",
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    this.setState({ active });
  };

  render() {
    const { overlay } = this.props;
    const { redirectUrl, hide } = overlay;
    const Google_OAUTH_ClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENTID;

    return (
      <Overlay testingContext="loginOverlay" context={overlay}>
        <div className="login-container">
          <div className="login">
            <Online>
              <div className="overlay__header">
                <h2 className="overlay__header-text">
                  {this.state.active === "login" ? (
                    <FormattedMessage defaultMessage="Welcome back to dRural!" />
                  ) : (
                    <FormattedMessage defaultMessage="Create an account" />
                  )}
                </h2>
                <CloseIcon
                  className="overlay__header__close-icon"
                  onClose={hide}
                  size={20}
                />
              </div>
              <LoginTabs
                active={this.state.active}
                setActive={this.changeActiveTab}
              />
              <div className="login__content">
                {this.state.active === "login" ? (
                  <>
                    <LoginForm redirectUrl={redirectUrl} hide={hide} />
                    <ForgottenPassword onClick={hide} />
                  </>
                ) : (
                  <RegisterForm hide={hide} />
                )}
              </div>
              <div className="separator">You can also</div>
              <GoogleOAuthProvider clientId={Google_OAUTH_ClientId}>
                <SocialMediaLogin />
              </GoogleOAuthProvider>  
            </Online>
            <Offline>
              <OfflinePlaceholder />
            </Offline>
          </div>

          <div className="login-image">
            <CloseIcon
              className="overlay__header__close-icon-desktop"
              onClose={hide}
              size={22}
            />
          </div>
        </div>
      </Overlay>
    );
  }
}

export default Login;
