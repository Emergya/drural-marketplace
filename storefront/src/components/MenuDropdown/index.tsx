/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { UilTimes } from "@iconscout/react-unicons";
import * as React from "react";

import { useHandlerWhenClickedOutside } from "@hooks/useHandlerWhenClickedOutside";

import * as S from "./styles";

import "./scss/index.scss";

const MenuDropdownClickOutside = Component => {
  return props => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const { setElementRef } = useHandlerWhenClickedOutside(() => {
      setMenuIsOpen(false);
    });

    const onClickMenuToggle = () => {
      setMenuIsOpen(!menuIsOpen);
    };

    return (
      <Component
        {...props}
        menuIsOpen={menuIsOpen}
        setElementRef={setElementRef}
        onClickMenuToggle={onClickMenuToggle}
      />
    );
  };
};

class MenuDropdown extends React.Component<{
  head: React.ReactElement<{}>;
  content: React.ReactElement<{}>;
  suffixClass: string;
  menuIsOpen: boolean;
  onClickMenuToggle: () => void;
  setElementRef: () => React.RefObject<HTMLDivElement>;
}> {
  static defaultProps = {
    suffixClass: "",
  };

  render() {
    return (
      <div
        data-test="userButton"
        className="menu-dropdown"
        onClick={() => this.props.onClickMenuToggle()}
        ref={this.props.setElementRef()}
      >
        {this.props.menuIsOpen ? (
          <S.AvatarClicked className="avatar-clicked">
            <UilTimes color="#FFFFFF" />
          </S.AvatarClicked>
        ) : (
          this.props.head
        )}

        <div
          className={`menu-dropdown__body${` menu-dropdown__body${this.props.suffixClass}`}${
            this.props.menuIsOpen ? " menu-dropdown__body--visible" : ""
          }`}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default MenuDropdownClickOutside(MenuDropdown);
