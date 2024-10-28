import gql from "graphql-tag";

export const authenticateSocialMediaUser = gql `
    mutation AuthenticateSocialMediaUser ($openId: String!){
        authenticateSocialMediaUser(openId: $openId){
            token,
            refreshToken,
            csrfToken,
            errors{
                field
            },
            user{
                id
                email
                firstName
                lastName
                isStaff
                # New ones
                isOnboard
                avatar(size: 760) {
                url
                }
            }
        }
    }
`;

export const socialMediaAccountRegister = gql `
    mutation SocialMediaAccountRegister($firstName: String!, $lastName: String!, $email: String!, $openId: String!){
        socialMediaAccountRegister(input:{firstName: $firstName, lastName: $lastName, email: $email, openId: $openId}){
            user{
                id,
                email
            }
        }
    }
`;