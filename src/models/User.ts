import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import Post from './Post';

@Entity({ database: 'test', name: 'users' })
export default class User {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @CreateDateColumn()
    createdAt: Date;
};
