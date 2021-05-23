import { ApolloError } from 'apollo-server';

import services from '../services';

export default {
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
        signUp: async (_, { username, password }) => {
            try {
                const userService = services.userService();

                const newUser = await userService.createUser({ username, password });

                return newUser;
            }
            catch(err) {
                throw new ApolloError(err.message);
            }
        }
    }
}