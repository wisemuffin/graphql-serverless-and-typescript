const { AuthenticationError } = require("apollo-server-lambda");
import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const deletePlayerScore = async (_parent, args, context, _info) => {
  console.log("delete context: ", JSON.stringify(context));
  if (!context.user)
    throw new AuthenticationError(
      "You must be logged in to perform this action"
    );

  const { ID } = args;
  const getPlayer = await Dynamo.get(ID, tableName);

  if (!getPlayer) {
    return "cant find player";
  }

  const deletedPlayer = await Dynamo.delete({ tableName, ID });

  return getPlayer;
};

export default deletePlayerScore;
