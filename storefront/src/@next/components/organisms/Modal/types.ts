export interface IProps {
  target?: HTMLElement | null;
  title: string;
  hide: () => void;
  cancelBtnText?: string;
  children: React.ReactNode;
  contentStyles?: React.CSSProperties;
  lightboxStyles?: React.CSSProperties;
  overlayStyles?: React.CSSProperties;
  submitBtnText: string;
  submitButtonTestingContext: string;
  testingContext: string;
  disabled: boolean;
  formId?: string;
  show: boolean;
  onSubmit?: () => void;
}
