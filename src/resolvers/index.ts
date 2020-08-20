import createPlayerScore from "./createPlayerScore";
import getPlayerScore from "./getPlayerScore";
import updatePlayerScore from "./updatePlayerScore";
import getGameScores from "./getGameScores";
import getGamesForPlayer from "./getGamesForPlayer";
import deletePlayerScore from "./deletePlayerScore";
import login from "./login";

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    first: () => "Hello world!",
    second: () => "Hello Emma",
    getPlayerScore,
    getGameScores,
    getGamesForPlayer,
  },
  Mutation: {
    login,
    createPlayerScore,
    updatePlayerScore,
    deletePlayerScore,
  },
};

export default resolvers;
