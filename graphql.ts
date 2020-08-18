const { ApolloServer, gql } = require("apollo-server-lambda");
import resolvers from "./src/resolvers";
import typeDefs from "./src/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  formatResponse: (response) => {
    console.log(response);
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  // playground: {
  //   endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
  //     ? process.env.REACT_APP_GRAPHQL_ENDPOINT
  //     : "/production/graphql",
  // },
  tracing: true,
});

exports.graphqlHandler = server.createHandler();
