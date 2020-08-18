const { ApolloServer, gql } = require("apollo-server-lambda");
import createPlayerScore from "./src/resolvers/createPlayerScore";
import getPlayerScore from "./src/resolvers/getPlayerScore";
import updatePlayerScore from "./src/resolvers/updatePlayerScore";
import getGameScores from "./src/resolvers/getGameScores";

// const tableName = process.env.tableName;
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Player {
    ID: String
    name: String
    score: Int
    game: String
  }
  input PlayerInput {
    ID: String
    name: String
    score: Int
    game: String
  }
  type Query {
    first: String
    second: String
    getPlayerScore(ID: String!): Player!
    getGameScores(game: String!): [Player]
  }
  type Mutation {
    createPlayerScore(player: PlayerInput!): Player!
    updatePlayerScore(ID: String!, score: Int!): Player!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    first: () => "Hello world!",
    second: () => "Hello Emma",
    getPlayerScore,
    getGameScores,
  },
  Mutation: {
    createPlayerScore,
    updatePlayerScore,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();
