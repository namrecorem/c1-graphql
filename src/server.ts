import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import context from './services/context';

const initServer = () => {
    // Database connection
    createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '',
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
        }
    });

    server.listen().then(({ url, subscriptionsUrl }) => {
        console.log(`Server ready at ${url}`);
        console.log(`Subscription ready at ${subscriptionsUrl}`);
    });
}

export default initServer;
