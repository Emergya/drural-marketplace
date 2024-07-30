export const getRreviewsFromProducts = products =>
  products.map(product => product.reviews);

export const getReviewsRatingAverage = reviews => {
  const average =
    reviews.reduce(
      (previousValue, currentValue) => previousValue + currentValue.rating,
      0
    ) / reviews.length;

  return Math.round(average);
};
