import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const getPlayerScore = async (_parent, args, _context, _info) => {
  const { ID } = args;
  const getPlayer = await Dynamo.get(ID, tableName);

  if (!getPlayer) {
    return "cant find player";
  }

  return getPlayer;
};

export default getPlayerScore;
