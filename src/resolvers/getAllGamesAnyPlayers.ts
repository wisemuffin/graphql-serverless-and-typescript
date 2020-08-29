import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

import * as AWSXRay from "aws-xray-sdk-core";
import * as https from "https";

const getAllGamesAnyPlayers = async (_parent, args, _context, _info) => {
  console.log("_X_AMZN_TRACE_ID: ", process.env._X_AMZN_TRACE_ID);

  if (process.env._X_AMZN_TRACE_ID) {
    AWSXRay.captureHTTPsGlobal(https, true);
    const segment = AWSXRay.getSegment();
    const subSegment = segment.addNewSubsegment("Scan Segment");
    subSegment.addAnnotation("what up", "scan all my babies");
  }

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
