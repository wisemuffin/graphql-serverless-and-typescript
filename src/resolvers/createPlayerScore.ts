const { AuthenticationError } = require("apollo-server-lambda");
import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

import * as AWSXRay from "aws-xray-sdk-core";
import * as https from "https";

if (process.env._X_AMZN_TRACE_ID) {
  AWSXRay.captureHTTPsGlobal(https, true);
  const segment = AWSXRay.getSegment();
  const subSegment = segment.addNewSubsegment("Epensive code");
  subSegment.addAnnotation("what up", "DAVES UP");
}

const createPlayerScore = async (_parent, args, context, _info) => {
  if (!context.user)
    throw new AuthenticationError(
      "You must be logged in to perform this action"
    );

  const { player } = args;
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  const newUser = await Dynamo.write(player, tableName);

  if (!newUser) {
    return "failed to add player";
  }

  return newUser;
};

export default createPlayerScore;
