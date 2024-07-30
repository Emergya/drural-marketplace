export interface IProps {
  starPercentages: (number | undefined | null)[] | undefined;
  rating: number | undefined;
  totalReviews: number | undefined;
  onStarClick: (starNumber: number) => void;
}
