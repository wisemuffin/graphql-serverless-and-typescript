import { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "gql-sls-and-typescript-dynamodb",
  },
  // app and org for use with dashboard.serverless.com
  org: "davidgg777",
  app: "learning-serverless",
  frameworkVersion: ">=1.72.0",
  custom: {
    tableName: "player-points",
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    dynamodb: {
      stages: ["dev"],
      start: { port: 8000, InMemory: true, migrate: true },
      migration: { dir: "offline/migrations" },
    },
  },
  // Add the serverless-webpack plugin
  plugins: [
    "serverless-webpack",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "ap-southeast-2",
    // stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      tableName: "${self:custom.tableName}",
    },

    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: "*",
      },
    ],
  },
  resources: {
    Resources: {
      MyDynamoDbTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:custom.tableName}",
          AttributeDefinitions: [
            { AttributeName: "ID", AttributeType: "S" },
            { AttributeName: "game", AttributeType: "S" },
          ],
          KeySchema: [{ AttributeName: "ID", KeyType: "HASH" }],
          BillingMode: "PAY_PER_REQUEST",
          GlobalSecondaryIndexes: [
            {
              IndexName: "game-index",
              KeySchema: [{ AttributeName: "game", KeyType: "HASH" }],
              Projection: { ProjectionType: "ALL" },
            },
          ],
        },
      },
    },
  },
  functions: {
    graphql: {
      handler: "graphql.graphqlHandler",
      events: [
        {
          http: {
            method: "post",
            path: "graphql",
          },
        },
        {
          http: {
            method: "get",
            path: "graphql",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
