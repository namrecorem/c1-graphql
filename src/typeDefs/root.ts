import { gql } from 'apollo-server';

export default gql`
    scalar DateTime

    type Query {
        _: String
    }

    type Mutation {
        _: String
    }

    type Subscription {
        _: String
    }
`;
