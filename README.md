# design

[inital architecture](https://www.youtube.com/watch?v=bqfEVhlE2Qw&t=509s)

This example has both graphql end point and 3 rest lambda endpoints

to add [dynamodbOffline](https://www.youtube.com/watch?v=ul_85jfM0oo&list=LL7qNKApydA06JByH7iNY_Lw&index=2&t=152s)
[Java SE Runtime Environment 8 Downloads](https://www.oracle.com/java/technologies/javase-jre8-downloads.html)

```bash
sls dynamodb install
```

# TODO

- table name from env
- nodemon or just get serverless offline to actualy restart graphql server properly
- how to handle errors in graphql
- migrations

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
