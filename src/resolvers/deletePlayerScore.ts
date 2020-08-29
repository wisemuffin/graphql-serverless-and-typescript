const { AuthenticationError } = require("apollo-server-lambda");
import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

import * as AWSXRay from "aws-xray-sdk-core";
import * as https from "https";

const deletePlayerScore = async (_parent, args, context, _info) => {
  if (process.env._X_AMZN_TRACE_ID) {
    AWSXRay.captureHTTPsGlobal(https, true);
    const segment = AWSXRay.getSegment();
    const subSegment = segment.addNewSubsegment("Delete Segment");
    subSegment.addAnnotation("what up", "delete me baby");
  }

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
