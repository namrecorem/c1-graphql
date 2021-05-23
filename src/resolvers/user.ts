import { ApolloError } from 'apollo-server';

import services from '../services';

export default {
    User: {
        posts: async (parent) => {
            try {
                const userService = services.userService();

                return (await userService.getUserById(parent.id)).posts;
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        },
        likedPosts: async (parent) => {
            try {
                const userService = services.userService();

                return (await userService.getUserById(parent.id)).likedPosts;
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        }
    },

    Query: {
        users: () => {
            const userService = services.userService();

            return userService.getAllUsers();
        },
        user: async (_, { id }) => {
            try {
                const userService = services.userService();

                return userService.getUserById(id);
            }
            catch(err) {
                throw new ApolloError(err.message)
            }
        }
    },

    Mutation: {
        signUp: async (_, { data }) => {
            try {
                const { username, password } = data;
                const userService = services.userService();

                const newUser = await userService.createUser({ username, password });

                return newUser;
            }
            catch(err) {
                throw new ApolloError(err.message);
            }
        },
        signIn: async (_, { data }) => {
            try {
                const { username, password } = data;
                const userService = services.userService();

                const token = await userService.authenticateUser({ username, password });

                return token;
            }
            catch(err) {
                throw new ApolloError(err.message);
            }
        }
    }
}