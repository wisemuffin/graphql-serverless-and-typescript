const { AuthenticationError } = require("apollo-server-lambda");
import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
AWSXRay.captureHTTPsGlobal(require("https"));

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
