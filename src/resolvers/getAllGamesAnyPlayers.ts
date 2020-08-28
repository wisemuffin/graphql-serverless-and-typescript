import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

// const AWSXRay = require("aws-xray-sdk-core");
// const AWS = AWSXRay.captureAWS(require("aws-sdk"));
// AWSXRay.captureHTTPsGlobal(require("https"));

import * as AWSXRay from "aws-xray-sdk-core";
import * as https from "https";
AWSXRay.captureHTTPsGlobal(https, true);

const getAllGamesAnyPlayers = async (_parent, args, _context, _info) => {
  console.log("_X_AMZN_TRACE_ID: ", process.env._X_AMZN_TRACE_ID);
  const segment = AWSXRay.getSegment();

  const subSegment = segment.addNewSubsegment("Epensive code");
  subSegment.addAnnotation("what up", "DAVES UP");

  let filterExpression = null;
  let expressionAttributes = null;

  const games = await Dynamo.scan({
    tableName,
    filterExpression,
    expressionAttributes,
  });

  return games;
};

export default getAllGamesAnyPlayers;
