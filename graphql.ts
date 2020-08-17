const { ApolloServer, gql } = require("apollo-server-lambda");
import createPlayerScore from "./src/resolvers/createPlayerScore";
import getPlayerScore from "./src/resolvers/getPlayerScore";

// const tableName = process.env.tableName;
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Player {
    ID: String
    name: String
    score: Int
  }
  input PlayerInput {
    ID: String
    name: String
    score: Int
  }
  type Query {
    first: String
    second: String
    getPlayerScore(ID: String): Player!
  }
  type Mutation {
    createPlayerScore(player: PlayerInput!): Player!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    first: () => "Hello world!",
    second: () => "Hello Emma",
    getPlayerScore,
  },
  Mutation: {
    createPlayerScore,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();
