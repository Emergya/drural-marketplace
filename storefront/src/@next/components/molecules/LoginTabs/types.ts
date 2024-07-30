export interface IProps {
  active: "login" | "register";
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
