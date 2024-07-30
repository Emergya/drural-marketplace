import { useRouter } from "next/router";
import * as React from "react";
import { useIntl } from "react-intl";

import { ModalNavButtons } from "@components/molecules/ModalNavButtons";
import { Thumbnail } from "@components/molecules/Thumbnail";
import { Overlay } from "@components/organisms";
import { paths } from "@paths";

import defaultImage from "../../../../images/dRuralImages/default-image-square.svg";
import * as S from "./styles";

export interface ModalFormProps {
  content: {
    title: string;
    text: string;
    thumbnail?: string;
  };
  hide: () => void;
}

const WishListModalAddService: React.FC<ModalFormProps> = ({
  content: { text, title, thumbnail },
  hide,
}) => {
  const { push } = useRouter();
  const intl = useIntl();
  return (
    <Overlay
      testingContext="modalForm"
      duration={0}
      show
      hide={hide}
      position="notification"
    >
      <S.Div>
        <S.CloseIconRestyled onClose={hide} />
        <S.Content>
          <h2>{title}</h2>
          <S.ServiceInfo>
            <S.Image>
              <Thumbnail
                source={{
                  thumbnail: {
                    url: thumbnail || defaultImage,
                    alt: "image-service",
                  },
                }}
              />
            </S.Image>
            <p>{text}</p>
          </S.ServiceInfo>

          <ModalNavButtons
            textNext={intl.formatMessage({
              defaultMessage: "Return to service",
            })}
            textBack={intl.formatMessage({
              defaultMessage: "See list",
            })}
            onNext={hide}
            onBack={() => push(paths.wishlist)}
          />
        </S.Content>
      </S.Div>
    </Overlay>
  );
};

export default WishListModalAddService;
