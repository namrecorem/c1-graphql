import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import User from '../models/User';

const userService = () => {
    const userRepository = getRepository(User);

    const getAllUsers = async () => {
        const users = await userRepository.find({});
    
        return users;
    };
    
    const getUserById = async (id: string) => {
        const foundUser = await userRepository.findOne({ id });
    
        if (!foundUser) throw new Error('User not found');
    
        return foundUser;
    }
    
    const createUser = async ({ username, password }: { username: string, password: string }) => {
        const foundUser = await userRepository.findOne({ username });
    
        if (foundUser) throw new Error('Username exists');
    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
    
        // Make user
        const newUser = new User();
        newUser.id = uuidv4();
        newUser.username = username;
        newUser.password = hashed;
    
        const savedUser = await userRepository.save(newUser);
    
        return savedUser;
    }
    
    const deleteUserById = async (id: string) => {
        const foundUser = await userRepository.find({ id });
    
        if (!foundUser) throw new Error('User not found');
    
        await userRepository.delete({ id });
    }

    return {
        getAllUsers,
        getUserById,
        createUser,
        deleteUserById
    }
}

export default userService;
