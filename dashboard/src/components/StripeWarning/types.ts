export interface IStripeWarningProps {
  spacer?: boolean;
  text: string;
  onClose: () => void;
  onConfigureStripe: () => void;
}
