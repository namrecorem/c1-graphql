import { gql } from 'apollo-server';

export default gql`
    type User {
        id: ID!
        username: String!
        posts: [Post!]
        createdDate: DateTime!
    }

    type Token {
        token: String!
    }

    input UsernameAndPassword {
        username: String!,
        password: String!
    }

    extend type Query {
        users: [User]!
        user(id: String!): User!
    }

    extend type Mutation {
        signUp(data: UsernameAndPassword!): User!
        signIn(data: UsernameAndPassword!): Token!
    }
`;
