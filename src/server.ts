import { ApolloServer, gql } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import typeDefs from './typeDefs/index';
import resolvers from './resolvers/index';

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

const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => ({}) });

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
