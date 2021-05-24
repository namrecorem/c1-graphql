import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';
import Post from '../models/Post';

const postService = () => {
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);

    const getAllPosts = async () => {
        const posts = await postRepository.find({ relations: ['author', 'likedByUsers'] });
        
        return posts;
    };
    
    const getPostById = async (id: string) => {
        const foundPost = await postRepository.findOne({ id }, { relations: ['author', 'likedByUsers'] });
    
        if (!foundPost) throw new Error('Post not found');
    
        return foundPost;
    }

    const createPost = async ({ title, content, authorId }: { title: string, content: string, authorId: string }) => {
        const author = await userRepository.findOne({ id: authorId });

        const newPost = new Post();
        newPost.id = uuidv4();
        newPost.title = title;
        newPost.content = content;
        newPost.author = author;

        const savedPost = await postRepository.save(newPost);

        return savedPost;
    }

    const deletePostById = async (id: string, authorId: string) => {
        const foundPost = await postRepository.findOne({ id }, { relations: ['author'] });

        if (!foundPost) throw new Error('Post not found');
        if (foundPost.author.id !== authorId) throw new Error('Unauthorization');
        
        await postRepository.remove(foundPost);
    }

    const likeOrUnlikePostById = async (id: string, userId: string) => {
        const foundPost = await postRepository.findOne({ id }, { relations: ['likedByUsers'] });
        const foundUser = await userRepository.findOne({ id: userId });

        if (!foundPost) throw new Error('Post not found');

        // There is not anything, so like
        if (!foundPost.likedByUsers) {
            foundPost.likedByUsers = [foundUser];

            const updatedPost = await postRepository.save(foundPost);

            return updatedPost;
        }

        // Not like yet, so like
        if (!foundPost.likedByUsers.includes(foundUser)) {
            foundPost.likedByUsers = foundPost.likedByUsers.concat(foundUser);
        }
        // Liked already, so unlike
        else {
            foundPost.likedByUsers = foundPost.likedByUsers.filter(user => user.id !== foundUser.id);
        }

        const updatedPost = await postRepository.save(foundPost);

        return updatedPost;
    }

    return {
        getAllPosts,
        getPostById,
        createPost,
        deletePostById,
        likeOrUnlikePostById
    }
}

export default postService;
