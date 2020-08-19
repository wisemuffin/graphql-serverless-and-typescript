// Load the AWS SDK for Node.js
const fs = require("fs");

const tableName = process.env.tableName || "player-points";
import Dynamo from "../util/Dynamo";

console.log("Importing data into DynamoDB. Please wait.");

// const allUsers = JSON.parse(fs.readFileSync("Users.json", "utf8"));
// const allTweets = JSON.parse(fs.readFileSync("Tweets.json", "utf8"));
const allPlayers = JSON.parse(fs.readFileSync("Players.json", "utf8"));

allPlayers.forEach(function (player) {
  const Playerparams = {
    ID: player.ID,
    name: player.name,
    score: player.score,
    game: player.game,
    playerID: player.playerID,
  };

  Dynamo.write(Playerparams, tableName);
});

// allUsers.forEach(function (user) {
//   const Userparams = {
//     name: user.name,
//     handle: user.handle,
//     location: user.location,
//     description: user.description,
//     followers_count: user.followers_count,
//     friends_count: user.friends_count,
//     favourites_count: user.favourites_count,
//     following: user.following,
//   };

//   Dynamo.write(Userparams, "userTable");
// });

// allTweets.forEach(function (tweet) {
//   const Tweetparams = {
//     handle: tweet.handle,
//     tweet_id: tweet.tweet_id,
//     tweet: tweet.tweet,
//     retweeted: tweet.retweeted,
//     retweet_count: tweet.retweet_count,
//     favorited: tweet.favorited,
//     created_at: tweet.created_at,
//   };
//   Dynamo.write(Tweetparams, "tweetsTable");
// });
