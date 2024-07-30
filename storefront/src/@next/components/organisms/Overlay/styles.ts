import { css, keyframes } from "styled-components";

import { styled } from "@styles";

import { Position, TransitionState } from "./types";

interface IStyleProps {
  open: boolean;
  position: Position;
  state: TransitionState;
  transparent?: boolean;
}

const getTranslate = (side: "left" | "right") =>
  side === "left" ? "-100%" : "100%";

const slideAnimation = (open: boolean, side: "left" | "right") => {
  const initialValue = open ? getTranslate(side) : 0;
  const endValue = open ? 0 : getTranslate(side);
  return keyframes`
    from {
      transform: translateX(${initialValue});
    }
    to {
      transform: translateX(${endValue});
    }`;
};

const opacity = {
  entered: 1,
  entering: 0,
  exited: 0,
  exiting: 0,
  unmounted: 0,
};

const justify = {
  notification: "center",
  center: "center",
  left: "flex-start",
  right: "flex-end",
};

const align = {
  notification: "center",
  center: "center",
  left: "flex-start",
  right: "flex-start",
};

const lightboxHeight = {
  notification: "auto",
  center: "auto",
  left: "auto",
  right: "auto",
};

const lightboxWidth = (width: number) => ({
  notification: `700px`,
  center: `${width}px`,
  left: "auto",
  right: "auto",
});

export const Lightbox = styled.div<IStyleProps>`
  display: flex;
  flex-direction: ${props => {
    if (props.position === "center") return "column";
  }};
  position: ${props =>
    props.position === "center" || props.position === "notification"
      ? "fixed"
      : "relative"};
  ${({ position }) => {
    if (position === "center") {
      return css`
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        justify-content: space-between;
      `;
    }
  }}
  overflow-y: auto;
  max-height: 100vh;
  border-radius: ${props => {
    if (props.position === "center" || props.position === "notification")
      return "16px";
  }};
  width: ${({ position, theme: { modal } }) =>
    lightboxWidth(modal.modalWidth)[position]};
  max-width: 100vw;

  min-height: ${props => {
    if (props.position === "center") return "90vh";
    if (props.position === "notification") return "0";
    if (props.position === "left" || props.position === "right") return "728px";
  }};

  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    min-height: ${props => {
      if (props.position === "center")
        return `${props.theme.modal.modalMinHeight}px`;
    }};
  }
  height: ${({ position }) => lightboxHeight[position]};
  background-color: ${props => props.theme.colors.white};
  ${({ open, position }) => {
    if (position === "left" || position === "right") {
      return css`
        ${position}: 0;
        transform: translateX(${getTranslate(position)});
        animation: ${slideAnimation(open, position)} 0.4s both;
        animation-delay: ${open ? ".1s" : 0};
      `;
    }
  }}
`;
Lightbox.displayName = "S.Lightbox";

export const Overlay = styled.div<IStyleProps>`
  display: flex;
  position: fixed;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  top: 0;
  z-index: 15;
  transition: opacity 0.2s ease;
  transition-delay: ${({ open }) => (open ? 0 : ".4s")};
  background-color: ${({ transparent, theme }) =>
    transparent ? "" : theme.colors.overlay};
  align-items: ${({ position }) => align[position]};
  justify-content: ${({ position }) => justify[position]};
  opacity: ${({ state }) => opacity[state]};
`;
Overlay.displayName = "S.Overlay";
