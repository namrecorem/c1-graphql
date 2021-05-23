import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import auth from './services/auth';

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
        context: auth
    });

    server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
}

export default initServer;
