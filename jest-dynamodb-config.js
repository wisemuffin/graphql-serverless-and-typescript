module.exports = {
  tables: [
    {
      TableName: "player-points",
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
  ],
};
