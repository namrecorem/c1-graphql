import { ApolloError } from 'apollo-server';
import { v2 as cloudinary } from 'cloudinary';

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
        },
        uploadAvatar: async (_, { avatar }, { user }) => {
            try {
                const { createReadStream, filename, mimetype } = await avatar;
                const { id } = user
                const userService = services.userService();
                
                cloudinary.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.CLOUD_KEY,
                    api_secret: process.env.CLOUD_SECRET
                });

                console.log(filename, mimetype);

                try {
                    const result: any = await new Promise((resolve, reject) => {
                        console.log("Run here");
                        createReadStream().pipe(cloudinary.uploader.upload_stream((err, result) => {
                            if (err) reject(err);
                            
                            resolve(result);
                        }))
                    });
                    
                    const updatedUser = await userService.uploadAvatar({ id, avatarUrl: result.secure_url });

                    return updatedUser;
                }
                catch(err) {
                    throw new Error('There was a problem uploading your avatar');
                }
            }
            catch(err) {
                throw new ApolloError(err.message);
            }
        }
    }
}