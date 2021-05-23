import { ApolloServer, gql } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import services from './services';

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
    context: { services }
});

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
