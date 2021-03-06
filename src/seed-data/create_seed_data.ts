import * as faker from "faker";
import * as jsonfile from "jsonfile";
const numUsers = 1000;
const tweetsPerUser = 5;
const followersPerUser = 2;

const udata = [];
const tdata = [];
const pdata = [];
const handleNames = [];

faker.seed(1000);

for (let i = 0; i < numUsers; i++) {
  const handle = faker.internet.userName();
  handleNames.push(handle);
}

for (let i = 0; i < handleNames.length; i++) {
  const following = [];

  //create user info
  for (let k = 0; k < followersPerUser; k++) {
    following.push(handleNames[Math.floor(Math.random() * handleNames.length)]);
  }

  const followers_count = faker.random.number({
    min: 1,
    max: 500,
  });

  const friends_count = faker.random.number({
    min: 1,
    max: 500,
  });

  const favourites_count = faker.random.number({
    min: 1,
    max: 5000,
  });

  const name = faker.name.findName();
  const location = faker.address.city();
  const description = faker.name.jobTitle();

  const userInfo = {
    handle: handleNames[i],
    name: name,
    location: location,
    description: description,
    followers_count: followers_count,
    friends_count: friends_count,
    favourites_count: favourites_count,
    following: following,
  };

  udata.push(userInfo);

  //create tweet info
  for (let j = 0; j < tweetsPerUser; j++) {
    const id = faker.random.uuid();

    const tweetInfo = {
      handle: handleNames[i],
      tweet_id: id,
      tweet: faker.lorem.sentence(),
      retweeted: faker.random.boolean(),
      retweet_count: faker.random.number({
        min: 1,
        max: 50,
      }),
      favorited: faker.random.boolean(),
      created_at: faker.date.between("2016-01-01", "2017-01-27"),
    };

    tdata.push(tweetInfo);
  }

  const id = faker.random.uuid();
  const game = faker.hacker.phrase();
  const playerID = faker.random
    .number({
      min: 1,
      max: 10,
    })
    .toString();

  //create player info
  const playerInfo = {
    ID: id,
    name: name,
    game: faker.commerce.color(),
    playerID: playerID,
    score: faker.random.number({
      min: 1,
      max: 50,
    }),
  };

  pdata.push(playerInfo);
}

const ufile = "Users.json";
const tfile = "Tweets.json";
const pfile = "Players.json";

jsonfile
  .writeFile(ufile, udata)
  .then((res) => {
    console.log("Write complete");
  })
  .catch((error) => console.error(error));

jsonfile
  .writeFile(tfile, tdata)
  .then((res) => {
    console.log("Write complete");
  })
  .catch((error) => console.error(error));

jsonfile
  .writeFile(pfile, pdata)
  .then((res) => {
    console.log("Write complete");
  })
  .catch((error) => console.error(error));
