import { gql } from 'apollo-server';

export default gql`
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        likedByUsers: [User]
        createdDate: DateTime!
    }

    extend type Query {
        posts: [Post]!
        post(id: String!): Post!
    }

    extend type Mutation {
        addPost(title: String!, content: String!): Post!
        deletePost(id: String!): String!
        likeOrUnlikePost(id: String!): Post!
    }
`;
