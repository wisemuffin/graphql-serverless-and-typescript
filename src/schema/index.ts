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

  type Authentication {
    token: String!
  }

  type Query {
    first: String
    second: String
    getPlayerScore(ID: String!): Player!
    getGameScores(game: String!): [Player!]
    getGamesForPlayer(playerID: String!, minScore: Int): [Player!]
    getAllGamesAnyPlayers: [Player!]
  }
  type Mutation {
    login(username: String!, password: String!): Authentication
    createPlayerScore(player: PlayerInput!): Player!
    updatePlayerScore(ID: String!, score: Int!): Player!
    deletePlayerScore(ID: String!): Player!
  }
`;

export default typeDefs;
