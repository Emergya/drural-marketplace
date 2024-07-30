import gql from "graphql-tag";

export const avatarUpdateMutation = gql`
  mutation AvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      errors {
        code
        field
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;

export const avatarDeleteMutation = gql`
  mutation AvatarDelete {
    userAvatarDelete {
      errors {
        code
        field
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
