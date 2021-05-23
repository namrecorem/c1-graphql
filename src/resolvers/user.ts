import { ApolloError } from 'apollo-server';

export default {
    Mutation: {
        signUp: async (parent, { username, password }, { services }) => {
            try {
                const newUser = await services.userService.createUser({ username, password });

                return newUser;
            }
            catch(err) {
                throw new ApolloError(err.message);
            }
        }
    }
}