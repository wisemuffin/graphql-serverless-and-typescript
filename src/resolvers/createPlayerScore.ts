import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const createPlayerScore = async (_parent, args, _context, _info) => {
  const { player } = args;
  const newUser = await Dynamo.write(player, tableName).catch((err) => {
    console.log("error in dynamo write", err);
    return null;
  });

  if (!newUser) {
    return "failed to add player";
  }

  return newUser;
};

export default createPlayerScore;
