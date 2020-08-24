const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require("apollo-server-lambda");
require("dotenv").config();
const uuid = require("uuidv4");

import resolvers from "./src/resolvers";
import typeDefs from "./src/schema";
const { getToken, getUserIdFromToken, getUser } = require("./src/util/auth");

const userInfo = async (headers) => {
  const [, token] = (headers.Authorization || "").split("Bearer ");

  const user = await getUser(await getUserIdFromToken(token));

  return user;
};

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
  context: async ({ event, context }) => {
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      user: await userInfo(event.headers),
    };
  },
  playground: {
    endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
      ? process.env.REACT_APP_GRAPHQL_ENDPOINT
      : "/production/graphql",
  },
  tracing: true,
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
