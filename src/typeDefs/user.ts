import { gql } from 'apollo-server';

export default gql`
    type User {
        id: ID!
        username: String!
        password: String!
        posts: [Post]!
        createdDate: DateTime!
    }

    type Token {
        token: String!
    }

    extend type Query {
        users: [User]!
        user(id: String!): User!
    }

    extend type Mutation {
        signUp(username: String!, password: String!): User!
    }
`;
