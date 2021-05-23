import { ApolloError } from 'apollo-server';

import services from '../services';

export default {
    Query: {
        posts: () => {
            const postService = services.postService();

            return postService.getAllPosts();
        },
        user: async (_, { id }) => {
            try {
                const postService = services.postService();

                return postService.getPostById(id);
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        }
    },

    Mutation: {
        addPost: async (_, { title, content }, { user }) => {
            try {
                if (!user) throw new ApolloError('Unauthorization');

                const postService = services.postService();
                const { id } = user;

                const newPost = await postService.createPost({ title, content, authorId: id });

                return newPost;
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        },
        deletePost: async (_, { id }, { user }) => {
            try {
                if (!user) throw new ApolloError('Unauthorization');

                const postService = services.postService();

                await postService.deletePostById(id, user.id);

                return "Delete post successfully";
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        }
    }
};
