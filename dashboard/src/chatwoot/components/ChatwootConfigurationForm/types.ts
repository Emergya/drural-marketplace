import {
  ChatwootConfigurationError,
  ChatwootConfigurationType
} from "../ChatwootConfiguration/types";

export interface ChatwootConfigurationFormData {
  chatPassword: string;
  chatPasswordRepeat: string;
  chatEmail?: string;
  hasChat: boolean;
  isChatActive: boolean;
}

export enum ChatwootConfigurationFormDataEnum {
  chatPassword = "chatPassword",
  chatPasswordRepeat = "chatPasswordRepeat",
  chatEmail = "chatEmail",
  hasChat = "hasChat",
  isChatActive = "isChatActive"
}

export interface IChatwootConfigurationFormProps {
  data: ChatwootConfigurationFormData;
  disabled: boolean;
  formDisabled: boolean;
  formErrors: Record<"email" | "password", ChatwootConfigurationError>;
  isFormOpen: boolean;
  passwordError: string;
  type: ChatwootConfigurationType;
  switchDisabled: boolean;
  handlePasswordValidation: () => void;
  onChange: (event: React.ChangeEvent<any>) => void;
  onFormCancel: () => void;
  onFormOpen: () => void;
  onFormSubmit: () => void;
  onSwitch: (isChatActive: boolean) => Promise<void>;
}

export interface IChatwootFormProps {
  data: ChatwootConfigurationFormData;
  disabled: boolean;
  formDisabled: boolean;
  formErrors: Record<"email" | "password", ChatwootConfigurationError>;
  passwordError: string;
  type: ChatwootConfigurationType;
  hasButtons?: boolean;
  handlePasswordValidation: () => void;
  onChange: (event: React.ChangeEvent<any>) => void;
  onFormCancel: () => void;
  onFormSubmit: () => void;
}
