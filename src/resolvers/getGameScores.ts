import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const getGameScores = async (_parent, args, _context, _info) => {
  const { game } = args;
  const gamePlayers = await Dynamo.query({
    tableName,
    index: "game-index",
    queryKey: "game",
    queryValue: game,
  });

  if (!gamePlayers) {
    return "cant find game";
  }

  return gamePlayers;
};

export default getGameScores;
