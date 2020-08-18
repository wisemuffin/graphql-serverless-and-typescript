import Dynamo from "../util/Dynamo";
const tableName = process.env.tableName;

const getGamesForPlayer = async (_parent, args, _context, _info) => {
  const { playerID, minScore } = args;

  let filterExpression = `playerID = :playerID`;
  let expressionAttributes: any = {
    ":playerID": playerID,
  };

  if (minScore) {
    filterExpression = `playerID = :playerID and score >= :minScore`;
    expressionAttributes = {
      ":playerID": playerID,
      ":minScore": Number(minScore),
    };
  }

  const games = await Dynamo.scan({
    tableName,
    filterExpression,
    expressionAttributes,
  });

  return games;
};

export default getGamesForPlayer;
