import { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "graphql-serverless-and-typescript",
  },
  // app and org for use with dashboard.serverless.com
  org: "davidgg777",
  app: "learning-serverless",
  frameworkVersion: ">=1.72.0",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-offline"],
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
    },
  },
  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },
    dave: {
      handler: "handler.dave",
      events: [
        {
          http: {
            method: "get",
            path: "dave",
          },
        },
      ],
    },
    postSomeData: {
      handler: "handler.postSomeData",
      events: [
        {
          http: {
            method: "post",
            path: "postSomeData",
          },
        },
      ],
    },
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
