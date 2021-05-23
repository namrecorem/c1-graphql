import { gql } from 'apollo-server';

export default gql`
    type User {
        id: ID!
        username: String!
        password: String!
        posts: [Post]!
        createdAt: DateTime!
    }

    type Token {
        token: String!
    }

    extend type Mutation {
        signUp(username: String!, password: String!): Token!
    }
`;
