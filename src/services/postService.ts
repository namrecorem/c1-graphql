import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';
import Post from '../models/Post';

const postService = () => {
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);

    const getAllPosts = async () => {
        const posts = await postRepository.find({});
    
        return posts;
    };
    
    const getPostById = async (id: string) => {
        const foundPost = await postRepository.findOne({ id });
    
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

    return {
        getAllPosts,
        getPostById,
        createPost,
        deletePostById
    }
}

export default postService;
