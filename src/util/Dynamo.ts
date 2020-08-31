import * as AWS from "aws-sdk";

// console.log("process.env._X_AMZN_TRACE_ID: ", process.env._X_AMZN_TRACE_ID);
// console.log("process.env.OKTA_ORG_URL: ", process.env.OKTA_ORG_URL);
// console.log("process.env.IS_OFFLINE: ", process.env.IS_OFFLINE);

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

if (process.env.JEST_WORKER_ID) {
  options = {
    endpoint: "http://localhost:8000",
    region: "local-env",
    sslEnabled: false,
  };
}

const documentClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(
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
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: { ID },
    };
    const res = await documentClient.delete(params).promise();
    return ID;
  },
};

export default Dynamo;
