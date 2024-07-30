import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import * as S from "./styles";
import { IProps } from "./types";

export const Overlay: React.FC<IProps> = ({
  children,
  duration = 600,
  hide,
  position = "center",
  show,
  overlayStyles,
  lightboxStyles,
  transparent = false,
  target,
  testingContext,
  testingContextId,
}: IProps) => {
  const [portalTarget, setPortalTarget] = useState(
    target || document.getElementById("modal-root")
  );

  const animationProps = {
    open: show,
    position,
  };

  useEffect(() => {
    if (target) {
      setPortalTarget(target);
    }
  }, [target]);

  return (
    portalTarget &&
    ReactDOM.createPortal(
      <Transition in={show} timeout={duration} unmountOnExit>
        {state => (
          <S.Overlay
            {...animationProps}
            style={overlayStyles}
            state={state}
            onClick={hide}
            transparent={transparent}
            data-test={testingContext}
            data-test-id={testingContextId}
          >
            <S.Lightbox
              {...animationProps}
              style={lightboxStyles}
              state={state}
              onClick={e => e.stopPropagation()}
            >
              {children}
            </S.Lightbox>
          </S.Overlay>
        )}
      </Transition>,
      portalTarget
    )
  );
};
