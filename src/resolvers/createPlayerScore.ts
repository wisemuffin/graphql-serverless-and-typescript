import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const createPlayerScore = async (_parent, args, _context, _info) => {
  const { player } = args;
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  const newUser = await Dynamo.write(player, tableName);

  if (!newUser) {
    return "failed to add player";
  }

  return newUser;
};

export default createPlayerScore;
