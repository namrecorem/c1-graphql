import { ApolloError, withFilter, PubSub } from 'apollo-server';

import services from '../services';

const pubsub = new PubSub();

export default {
    Post: {
        author: async (parent) => {
            try {
                const postService = services.postService();

                return (await postService.getPostById(parent.id)).author;
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        },
        likedByUsers: async (parent) => {
            try {
                const postService = services.postService();

                return (await postService.getPostById(parent.id)).likedByUsers;
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        }
    },

    Query: {
        posts: () => {
            const postService = services.postService();

            return postService.getAllPosts();
        },
        post: async (_, { id }) => {
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

                pubsub.publish('POST_ADDED', { postAdded: newPost });

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
        },
        likeOrUnlikePost: async (_, { id }, { user }) => {
            try {
                if (!user) throw new ApolloError('Unauthorization');

                const postService = services.postService();

                const updatedPost = await postService.likeOrUnlikePostById(id, user.id);

                return updatedPost;
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        }
    },

    Subscription: {
        postAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('POST_ADDED'),
                (payload, variables) => {
                    return payload.postAdded.author.id === variables.authorId;
                }
            )
        }
    }
};
