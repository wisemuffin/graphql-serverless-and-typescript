const { AuthenticationError } = require("apollo-server-lambda");
import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const updatePlayerScore = async (_parent, args, context, _info) => {
  if (!context.user)
    throw new AuthenticationError(
      "You must be logged in to perform this action"
    );
  const { ID, score } = args;

  // check ID exists
  const getPlayer = await Dynamo.get(ID, tableName);

  if (!getPlayer) {
    return "cant find player";
  }

  // update score
  const res = await Dynamo.update({
    tableName: "player-points",
    primaryKey: "ID",
    primaryKeyValue: ID,
    updateKey: "score",
    updateValue: score,
  });

  // get updated player
  const getUpdatedPlayer = await Dynamo.get(ID, tableName);

  return getUpdatedPlayer;
};

export default updatePlayerScore;
