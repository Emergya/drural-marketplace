import { useAuth } from "@drural/sdk";
import { useRouter } from "next/router";
import * as React from "react";
import { useLazyQuery, useQuery } from "react-apollo";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { generatePath } from "react-router";
import { dRuralTheme } from "src/@next/globalStyles/";

import { IconBackground } from "@components/atoms";
import { LogoBrandContext } from "@components/containers/LogoBrandProvider/LogoBrandProvider";
import {
  ItemList,
  ItemTile,
  StartSellingRow,
  Thumbnail,
} from "@components/molecules";
import { NotificationModal } from "@components/organisms/NotificationModal";
import { SearchbarDesktop } from "@components/organisms/SearchbarDesktop";
import { SearchbarMobileHome } from "@components/organisms/SearchbarMobileHome";
import { useGeoLocation } from "@hooks";
import { paths } from "@paths";
import {
  dashboardUrl,
  locationFilterMaxValue,
  priceFilterMaxValue,
} from "@temp/constants";
import { commonMessages } from "@temp/intl";
import { mapEdgesToItems } from "@utils/misc";
import { FeaturedProducts, PopularServices } from "@utils/ssr";

import { ProductsFeatured } from "../../components";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
import HomeImage from "../../images/dRuralImages/Home-image.svg";
import {
  HomePageProducts_categories,
  HomePageProducts_collections,
  HomePageProducts_shop,
} from "./gqlTypes/HomePageProducts";
import {
  NearbyServices,
  NearbyServicesVariables,
} from "./gqlTypes/NearbyServices";
import {
  SearchSuggestionsQuery,
  SearchSuggestionsQueryVariables,
} from "./gqlTypes/SearchSuggestionsQuery";
import { UserDistance } from "./gqlTypes/UserDistance";
import {
  nearbyServices,
  searchSuggestionsQuery,
  userDistance,
} from "./queries";

import "./scss/index.scss";

interface Search {
  query: string;
  distance: number;
  price: number[];
}

const Page: React.FC<{
  categories: HomePageProducts_categories;
  collections: HomePageProducts_collections;
  featuredProducts: FeaturedProducts;
  shop: HomePageProducts_shop;
  popularServices: PopularServices;
}> = ({ categories, collections, featuredProducts, shop, popularServices }) => {
  // Categories functions
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  const collectionsExist = () =>
    collections && collections.edges && collections.edges.length > 0;
  const [showLocationAlert, setShowLocationAlert] = React.useState(false);
  const intl = useIntl();
  const { push } = useRouter();
  const { location, getLocation } = useGeoLocation();
  const [getNearByProducts, { data, refetch }] = useLazyQuery<
    NearbyServices,
    NearbyServicesVariables
  >(nearbyServices);
  const { user } = useAuth();
  const { data: distanceRadius, refetch: refetchDistance } = useQuery<
    UserDistance
  >(userDistance, {
    skip: !user,
  });

  const handleClickLocation = () => {
    getLocation();
    setShowLocationAlert(false);
  };

  const distance = React.useMemo(() => {
    if (distanceRadius?.me?.distance || distanceRadius?.me?.distance === 0) {
      return distanceRadius.me.distance;
    }
    return parseInt(process.env.NEXT_PUBLIC_RADIUS!, 10);
  }, [distanceRadius]);
  const brand = React.useContext(LogoBrandContext);
  React.useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        if (result.state === "prompt") {
          setShowLocationAlert(true);
        } else {
          getLocation();
        }
      });
    } else {
      getLocation();
    }
    // unsures that user distance is up to date everytime page is loaded
    if (user && distanceRadius?.me?.distance) {
      refetchDistance();
    }
  }, []);

  React.useEffect(() => {
    // first time fetching data
    if (location?.loaded && !data) {
      getNearByProducts({
        variables: {
          first: 4,
          closeness: {
            radius: distance,
            latitude: location.coordinates.lat,
            longitude: location.coordinates.long,
          },
        },
      });
    }
    // refetch everytime distance changes when the user loggin and changes the default distance
    if (location?.loaded && data) {
      refetch({
        first: 4,
        closeness: {
          radius: distance,
          latitude: location.coordinates.lat,
          longitude: location.coordinates.long,
        },
      });
    }
  }, [location?.loaded, distance, data]);

  // Search state and serach-query section

  const [searchState, setSearchState] = React.useState<Search>({
    query: undefined,
    distance: undefined,
    price: [],
  });

  const { data: search } = useQuery<
    SearchSuggestionsQuery,
    SearchSuggestionsQueryVariables
  >(searchSuggestionsQuery, {
    variables: {
      query: searchState.query,
      channel: "default-channel",
      pageSize: 5,
    },
    skip: !searchState.query,
  });

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let urlSearchQuery = "/search/?";

    if (searchState.query) {
      urlSearchQuery += `q=${searchState.query}`;
    }
    if (
      searchState.distance !== undefined &&
      searchState.distance !== locationFilterMaxValue
    ) {
      urlSearchQuery += `&distance=${searchState.distance}`;
    }
    if (searchState.price.length > 1) {
      urlSearchQuery += `&priceGte=${searchState.price[0]}`;

      if (priceFilterMaxValue !== searchState.price[1]) {
        urlSearchQuery += `&priceLte=${searchState.price[1]}`;
      }
    }

    push(urlSearchQuery);
  };

  const onQueryChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setSearchState({
      ...searchState,
      query: target.value,
    });
  };

  const onSearchItemClick = (searchQuery: string) => {
    setSearchState({
      ...searchState,
      query: searchQuery,
    });
  };

  const onDistanceChange = (distanceQuery: number) => {
    setSearchState({
      ...searchState,
      distance: distanceQuery,
    });
  };

  const onPriceChange = (priceQuery: number[]) => {
    setSearchState({
      ...searchState,
      price: priceQuery,
    });
  };

  return (
    <>
      <script className="structured-data-list" type="apication/ld+json">
        {structuredData(shop)}
      </script>
      <div
        className="home-page__hero"
        style={{
          backgroundImage: `url(${brand?.banner || HomeImage})`,
          backgroundPosition: "top center",
        }}
      >
        <Media
          query={{ minWidth: dRuralTheme.breakpoints.largeScreen }}
          render={() => (
            <>
              <div className="home-page__hero-text">
                <div>
                  <span className="home-page__hero__title">
                    <h1>
                      <FormattedMessage defaultMessage="Welcome to dRural!" />
                    </h1>
                  </span>
                </div>
                <div>
                  <span className="home-page__hero__title">
                    <h4>
                      <FormattedMessage defaultMessage="Connecting you to the services you need" />
                    </h4>
                  </span>
                </div>
              </div>
              <SearchbarDesktop
                query={searchState.query || ""}
                onQueryChange={onQueryChange}
                distance={searchState.distance}
                onDistanceChange={onDistanceChange}
                price={searchState.price}
                onPriceChange={onPriceChange}
                suggestions={
                  search?.products
                    ? search.products.edges.map(product => product.node)
                    : []
                }
                onSearchItemClick={onSearchItemClick}
                onSubmit={handleSubmitSearch}
              />
            </>
          )}
        />
        <Media
          query={{ maxWidth: dRuralTheme.breakpoints.largeScreen }}
          render={() => (
            <>
              <SearchbarMobileHome
                query={searchState.query || ""}
                onChange={onQueryChange}
                onItemClick={search => {
                  push(`/search/?q=${search}`);
                }}
                suggestions={
                  search?.products
                    ? search.products.edges.map(product => product.node)
                    : []
                }
                onSubmit={handleSubmitSearch}
              />
              <div className="home-page__mobile">
                <div>
                  <span className="home-page__mobile__title">
                    <h6>
                      <FormattedMessage defaultMessage="dRural, the digital marketplace that connects users with local service providers nearby" />
                    </h6>
                  </span>
                </div>
              </div>
            </>
          )}
        />
      </div>
      {data?.products?.edges.length > 0 && (
        <div className="home-page__row-square-items">
          <ProductsFeatured
            products={data.products.edges.map(edge => edge.node)}
            title={intl.formatMessage({ defaultMessage: "Services near you" })}
            link={`/search/?distance=${distance}`}
          />
        </div>
      )}
      <div className="home-page__row-square-items">
        <ProductsFeatured
          products={featuredProducts.products}
          title={intl.formatMessage({ defaultMessage: "Featured services" })}
        />
      </div>
      {collectionsExist() && (
        <div className="home-page__row-circle-items">
          <div className="container">
            <ItemList
              title={intl.formatMessage(commonMessages.collections)}
              items={mapEdgesToItems(collections) || []}
              columns={6}
            >
              {({ id, name, slug, backgroundImage }) => (
                <ItemTile
                  key={id}
                  name={name}
                  picture={
                    <Thumbnail
                      source={{
                        thumbnail: backgroundImage,
                      }}
                    />
                  }
                  pictureSize={144}
                  onClick={() => push(generatePath(paths.collection, { slug }))}
                />
              )}
            </ItemList>
          </div>
        </div>
      )}
      <div className="home-page__row-square-items">
        <ProductsFeatured
          products={popularServices.products}
          title={intl.formatMessage({ defaultMessage: "Popular services" })}
          link="/search/?sortBy=-popular"
        />
      </div>
      {categoriesExist() && (
        <div className="home-page__row-circle-items">
          <div className="container">
            <ItemList
              title={intl.formatMessage(commonMessages.categories)}
              items={mapEdgesToItems(categories) || []}
              columns={6}
            >
              {({ id, name, slug, iconId }) => (
                <ItemTile
                  key={id}
                  name={name}
                  picture={
                    <IconBackground
                      iconId={iconId}
                      iconBackgroundSize="100%"
                      iconSize={42}
                    />
                  }
                  pictureSize={144}
                  onClick={() => push(generatePath(paths.category, { slug }))}
                />
              )}
            </ItemList>
          </div>
        </div>
      )}
      <StartSellingRow
        title={intl.formatMessage({
          defaultMessage: "Sell your services in dRural",
        })}
        description={intl.formatMessage({
          defaultMessage: "Millions of shoppers are waiting for you to join",
        })}
        buttonText={intl.formatMessage({ defaultMessage: "Start selling now" })}
        onButtonClick={() => push(dashboardUrl || "/")}
      />
      {showLocationAlert && (
        <NotificationModal
          title={intl.formatMessage({ defaultMessage: "GeoLocalization" })}
          text={intl.formatMessage({
            defaultMessage:
              "dRural wants to access your location in order to offer a better service and to show you the services closest to you.",
          })}
          buttonText="OK"
          onClick={handleClickLocation}
          hide={() => {
            handleClickLocation();
            setShowLocationAlert(false);
          }}
        />
      )}
    </>
  );
};

export default Page;
