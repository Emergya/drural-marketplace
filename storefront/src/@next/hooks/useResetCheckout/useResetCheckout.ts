import { useEffect, useState } from "react";

import { useResetCheckoutType } from "./types";

export const useResetCheckout: useResetCheckoutType = (
  checkout,
  checkoutLoaded,
  removeCheckout
) => {
  let hasCheckoutBeenDeleted = false;
  const [loadingCheckoutRemoved, setLoadingCheckoutRemoved] = useState(false);

  useEffect(() => {
    if (checkout?.id && !hasCheckoutBeenDeleted) {
      setLoadingCheckoutRemoved(true);

      removeCheckout(true)
        .then(data => {
          setLoadingCheckoutRemoved(!!data.pending);
        })
        .catch(() => {
          setLoadingCheckoutRemoved(false);
        });

      hasCheckoutBeenDeleted = true;
    }

    return () => {
      removeCheckout(true);
    };
  }, [checkoutLoaded]);

  return loadingCheckoutRemoved;
};
