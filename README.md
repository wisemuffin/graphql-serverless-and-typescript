# design

[inital architecture](https://www.youtube.com/watch?v=bqfEVhlE2Qw&t=509s)

This example has both graphql end point and 3 rest lambda endpoints

to add [dynamodbOffline](https://www.youtube.com/watch?v=ul_85jfM0oo&list=LL7qNKApydA06JByH7iNY_Lw&index=2&t=152s)
[Java SE Runtime Environment 8 Downloads](https://www.oracle.com/java/technologies/javase-jre8-downloads.html)

```bash
sls dynamodb install
```

# TODO

- okta integration -> done backend, now need to re deploy and need to send header: Authorization: Bearer
- tracing x ray: in serverless.ts in provider. currently can only set manually and missing dynamodb tracking and annotations.
- nodemon or just get serverless offline to actualy restart graphql server properly
- how to handle errors in graphql
- migrations

# bugs

need to uncomment these env in serverless.ts.
this works fine in prod, but not in dev?

```javascript
// OKTA_ORG_URL: process.env.OKTA_ORG_URL,
// OKTA_CLIENT_ID: process.env.OKTA_CLIENT_ID,
// OKTA_CLIENT_SECRET: process.env.OKTA_CLIENT_SECRET,
// OKTA_TOKEN: process.env.OKTA_TOKEN,
```

# dynamoDb

- scan max 1mb then will return even if havent found all but you benefit from not having to set up secondary index.

# why sls

- individual function uploads (with webpack)
- offline aws API gateway, lambda, dynamo development (faster iterations)

# X-ray

add around a sdk

```javascript
import * as AWSXRay from "aws-xray-sdk-core";
import * as AWS from "aws-sdk";

const s3 = AWSXRay.captureAWSClient(new AWS.s3());
```

add sub sections to test long running code

```javascript
import * as AWSXRay from "aws-xray-sdk-core";

const segment = AWSXRay.getSegment();

const subSegment = segment.addNewSubsegment("Epensive code");

subSegment.annotation("userid", userid);

expensive_fn();

subSegment.close();
```

# Inital set up

```bash
sls create -t aws-nodejs-typescript
```

can add --stage but defaults to prod

# logging from serverless

from aws

```bash
sls logs -f funcName -t
```

# deployment

## only deploy function (only if serverless.ts hasnt changed!)

if we do graphql then there is only one lambda

```bash
sls deploy -f <func_name>
```

# example graphql

```graphql
# Write your query or mutation here
query q1 {
  second
}

query q2 {
  first
}

mutation createPlayer {
  createPlayerScore(player: { ID: "2", name: "emma", score: 2, game: "uno" }) {
    ID
    name
    score
    game
  }
}

mutation createPlayer1 {
  createPlayerScore(
    player: { ID: "1", name: "dave", score: 100, game: "uno" }
  ) {
    ID
    name
    score
    game
  }
}

query getPlayer {
  getPlayerScore(ID: "2") {
    name
    score
    game
  }
}

mutation updateplayer {
  updatePlayerScore(ID: "2", score: 63) {
    ID
    name
    score
  }
}

query getGameScores {
  getGameScores(game: "uno") {
    ID
    name
    score
  }
}
```

# subscriptions graphql & lambda

## aws-lambda-graphql

in alpha 19/8/2020 [aws-lambda-graphql](https://github.com/michalkvasnicak/aws-lambda-graphql)

uses:

- dynamodb streams
- dynamodb to remeber state (since lambda is stateless)

have this working in

```bash
cd ~/aws/aws-lambda-graphql-pubsub/packages
```

make sure to start server before client. Can also have issue with websocket already taken (had to restart)

## issues with apsync

khaledosman commented on Oct 5, 2019 [issue](https://github.com/apollographql/apollo-server/issues/2129)

AppSync subscriptions use API Gateway sockets which also has its own limitations like:
a. Maximum 2 hours connection duration then timeout
b. custom @aws_subscribe directive in your graphql schema <-- vendor lockin
c. 10 minutes idle connection timeout
d. There’s no way to broadcast messages to all connected clients with one API call. you need to make an API call to AWS for each connection you want to send a message to. Publishing a single update to 1m clients requires fetching all 1m connection IDs out of the database and making 1m API calls which is slow and unscalable, unless you use SQS and lambdas to defer the logic, which adds even more latency due to the extra roundtrips.
e. Connection metadata needs to be stored in a database, This means that for every connection and disconnection, a Lambda needs to be run. to store information about who connects/disconnects in a database which makes it stateful, adds extra roundtrips/latency and makes it less scalable for a big number of users as it can easily hit lambda/API gateway execution limits.
I believe the only way to do a proper scalable graphql server setup in AWS is to create your own websocket server via an ECS or use PubNub, use an external redis cluster like redislabs or also create your own via ECS, and you can use lambdas for the apollo-server setup with a database of your choice. and manually connect/publish to your websocket server for subscriptions. The AWS solutions are not really well thought through IMO.
