import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

import User from './User';

@Entity({ database: 'test', name: 'posts' })
export default class Post {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @ManyToOne(type => User, user => user.posts)
    author: User;

    @CreateDateColumn()
    createdDate: Date;
};
