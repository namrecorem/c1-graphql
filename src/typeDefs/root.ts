import { gql } from 'apollo-server';

export default gql`
    scalar DateTime

    type Query {
        _: String
        users: [User]!
        posts: [Post]!
    }

    type Mutation {
        _: String
    }

    type Subscription {
        _: String
    }
`;
