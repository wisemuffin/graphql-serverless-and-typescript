import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const updatePlayerScore = async (_parent, args, _context, _info) => {
  const { ID, score } = args;

  // check ID exists
  const getPlayer = await Dynamo.get(ID, tableName).catch((err) => {
    console.log("error getting player", err);
    return null;
  });

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
  const getUpdatedPlayer = await Dynamo.get(ID, "player-points").catch(
    (err) => {
      console.log("error getting player", err);
      return null;
    }
  );

  return getUpdatedPlayer;
};

export default updatePlayerScore;