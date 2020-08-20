import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const deletePlayerScore = async (_parent, args, _context, _info) => {
  const { ID } = args;
  const getPlayer = await Dynamo.get(ID, tableName);

  if (!getPlayer) {
    return "cant find player";
  }

  const deletedPlayer = await Dynamo.delete({ tableName, ID });

  return getPlayer;
};

export default deletePlayerScore;
