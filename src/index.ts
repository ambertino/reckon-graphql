import { ApolloServer } from 'apollo-server';
import Query from './graphql/schema/Query.schema';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({ typeDefs: [Query], resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
