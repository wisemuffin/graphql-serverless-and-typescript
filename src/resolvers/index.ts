import createPlayerScore from "./createPlayerScore";
import getPlayerScore from "./getPlayerScore";
import updatePlayerScore from "./updatePlayerScore";
import getGameScores from "./getGameScores";
import getGamesForPlayer from "./getGamesForPlayer";
import deletePlayerScore from "./deletePlayerScore";
import login from "./login";
import getAllGamesAnyPlayers from "./getAllGamesAnyPlayers";

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    first: () => "Hello world!",
    second: () => "Hello Emma",
    getPlayerScore,
    getGameScores,
    getGamesForPlayer,
    getAllGamesAnyPlayers,
  },
  Mutation: {
    login,
    createPlayerScore,
    updatePlayerScore,
    deletePlayerScore,
  },
};

export default resolvers;
