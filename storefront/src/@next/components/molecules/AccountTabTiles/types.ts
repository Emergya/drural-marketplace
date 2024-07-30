export interface IProps {
  avatarURL: string | undefined;
  updateAvatar: (file: File) => void;
  deleteAvatar: () => void;
}
