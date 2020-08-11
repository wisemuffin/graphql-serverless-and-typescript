import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import service from "./src/service";
import { handler as io } from "./src/io";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const result = service.hello(event);
  return io.returnSuccess(result);
};

export const dave: APIGatewayProxyHandler = async (event, _context) => {
  const result = service.dave(event);
  return io.returnSuccess(result);
};
export const postSomeData: APIGatewayProxyHandler = async (event, _context) => {
  console.log("the event: ", event);

  const result = service.postSomeData(event);
  return io.returnSuccess(result);
};
