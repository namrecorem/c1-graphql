import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import 'reflect-metadata';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './services/context';

dotenv.config();

const initServer = () => {
    // Database connection
    createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'test',
        synchronize: true,
        logging: false,
        entities: [ __dirname + '/models/*.ts' ]
    })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        subscriptions: {
            path: '/subscriptions',
            onConnect: () => console.log('Someone connected'),
            onDisconnect: () => console.log('Someone disconnected')
        },
        cors: true,
    });

    server.listen().then(({ url, subscriptionsUrl }) => {
        console.log(`Server ready at ${url}`);
        console.log(`Subscription ready at ${subscriptionsUrl}`);
    });
}

export default initServer;
