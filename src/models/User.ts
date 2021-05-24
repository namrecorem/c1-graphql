import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany, ManyToMany } from 'typeorm';

import Post from './Post';

@Entity({ database: 'test', name: 'users' })
export default class User {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @ManyToMany(type => Post, post => post.likedByUsers)
    likedPosts: Post[];

    @CreateDateColumn()
    createdDate: Date;
};
