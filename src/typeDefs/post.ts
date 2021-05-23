import { gql } from 'apollo-server';

export default gql`
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        createdDate: DateTime!
    }
`;
