import gql from "graphql-tag";

export const googleAccountRegister = gql `
    mutation GoogleAccount($firstName: String!, $lastName: String!, $email: String!, $googleId: String!, $redirectUrl: String!){
        googleAccountRegister(firstName: $firstName, lastName: $lastName, email: $email, googleId: $googleId, redirectUrl: $redirectUrl){
            user{
                id
            }
        }
    }
`;

export const authenticateGoogleUser = gql `
    mutation AuthenticateGoogleUser ($googleId: String!){
        autenticateGoogleUser(googleId: $googleId){
            token,
            refreshToken,
            csrfToken,
            errors{
                field
            },
            user{
                id
            }
        }
    }
`;