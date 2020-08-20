import * as AWSXRay from "aws-xray-sdk";
import * as AWSSDK from "aws-sdk";

let AWS;
if (process.env._X_AMZN_TRACE_ID) {
  AWS = AWSXRay.captureAWS(require("aws-sdk"));
  //testingout x ray
  const segment = AWSXRay.getSegment();

  const subSegment = segment.addNewSubsegment("Epensive code");

  subSegment.addAnnotation("what up", "DAVES UP");

  const adder = () => {
    1 + 1;
  };
  adder();

  subSegment.close();
} else {
  console.log("Serverless Offline detected; skipping AWS X-Ray setup");
  AWS = require("aws-sdk");
}

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}
const documentClient: AWSSDK.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(
  options
);

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );
    }

    return data.Item;
  },
  async write(data, TableName) {
    if (!data.ID) {
      throw Error("no ID on the data");
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${data.ID} in table ${TableName}`
      );
    }

    return data;
  },
  update: async ({
    tableName,
    primaryKey,
    primaryKeyValue,
    updateKey,
    updateValue,
  }) => {
    const params = {
      TableName: tableName,
      Key: { [primaryKey]: primaryKeyValue },
      UpdateExpression: `set ${updateKey} = :updateValue`,
      ExpressionAttributeValues: {
        ":updateValue": updateValue,
      },
    };

    const res = await documentClient.update(params).promise();

    return res;
  },
  query: async ({ tableName, index, queryKey, queryValue }) => {
    const params = {
      TableName: tableName,
      IndexName: index,
      KeyConditionExpression: `${queryKey} = :hkey`,
      ExpressionAttributeValues: {
        ":hkey": queryValue,
      },
    };

    const res = await documentClient.query(params).promise();

    return res.Items || [];
  },
  scan: async ({ tableName, filterExpression, expressionAttributes }) => {
    const params = {
      TableName: tableName,
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributes,
    };
    const res = await documentClient.scan(params).promise();

    return res.Items || [];
  },
  delete: async ({ tableName, ID }) => {
    const params: AWSSDK.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: { ID },
    };
    const res = await documentClient.delete(params).promise();
    return ID;
  },
};

export default Dynamo;
