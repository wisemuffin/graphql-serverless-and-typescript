const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Player {
    ID: String
    name: String
    score: Int
    game: String
    playerID: String
  }
  input PlayerInput {
    ID: String
    name: String
    score: Int
    game: String
    playerID: String
  }
  type Query {
    first: String
    second: String
    getPlayerScore(ID: String!): Player!
    getGameScores(game: String!): [Player]
    getGamesForPlayer(playerID: String!, minScore: Int): [Player]
  }
  type Mutation {
    createPlayerScore(player: PlayerInput!): Player!
    updatePlayerScore(ID: String!, score: Int!): Player!
  }
`;

export default typeDefs;