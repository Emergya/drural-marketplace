import { UilEdit, UilTrashAlt } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router";
import ReactSVG from "react-svg";

import { Button, IconButtonDrural } from "@components/atoms";
import { StarsRating } from "@components/atoms/Rating";
import { Thumbnail } from "@components/molecules";
import { paths } from "@paths";

import notAvailableIllustration from "../../../../images/dRuralImages/notAvailableFace.svg";
import * as S from "./styles";
import { IProps } from "./types";

export const WishListServices: React.FC<IProps> = ({
  listName,
  services,
  editList,
  setServiceToDelete,
  showDeleteServiceModal,
}: IProps) => {
  const { push } = useRouter();
  return (
    <S.Wrapper>
      <S.ListHeader>
        {services && (
          <>
            <h3>{listName.listName}</h3>
            <IconButtonDrural
              color="primary"
              onClick={() => editList(true)}
              testingContext="editLocationButton"
            >
              <UilEdit size="24" color="#fff" />
            </IconButtonDrural>
          </>
        )}
      </S.ListHeader>
      {services && services.length > 0 ? (
        services.map(service => (
          <S.ListTile key={service.id}>
            <S.ListInfoContainer
              onClick={() =>
                push(
                  generatePath(paths.product, {
                    slug: service.product.slug,
                  })
                )
              }
            >
              <S.Image>
                <Thumbnail
                  source={{
                    thumbnail: {
                      url: service?.media ? service.media[0].url : "",
                      alt: "image-service",
                    },
                  }}
                />
              </S.Image>
              <S.InfoContainer>
                <span>{service.name}</span>
                <StarsRating readonly />
                <Button
                  color="labelOnlyPrimary"
                  testingContext="delete-service-wishlist"
                  onClick={e => {
                    e.stopPropagation();
                    setServiceToDelete({
                      serviceId: service.id,
                      serviceImageUrl: service.media
                        ? service.media[0].url
                        : "",
                      serviceName: service.name,
                    });
                    showDeleteServiceModal(true);
                  }}
                >
                  <UilTrashAlt size="24" />

                  <FormattedMessage defaultMessage="Remove from list" />
                </Button>
              </S.InfoContainer>
            </S.ListInfoContainer>
          </S.ListTile>
        ))
      ) : (
        <S.Illustration>
          <ReactSVG path={notAvailableIllustration} />
          <S.Text>
            <FormattedMessage defaultMessage="No list selected or no services added to the list yet" />
          </S.Text>
        </S.Illustration>
      )}
    </S.Wrapper>
  );
};
