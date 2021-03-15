import * as AWS from "aws-sdk"
import { TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();
const movieId = "33e0c2d3-3112-4f91-ab9d-bac64b75d2df"
const userId = "4ab73993-76ce-46d7-9e2a-fe8829d9a603"

const params:TransactWriteItemsInput = {
  TransactItems: [
    {Update: {
      TableName: "User",
      Key: {userId: {S: userId}},
      ExpressionAttributeValues: {
        ":newMovieId": {L: [{S: movieId}]},
        ":newMovieIdVal": {S: movieId}
      },
      ConditionExpression: "NOT contains(likes, :newMovieIdVal)",
      UpdateExpression: "SET likes = list_append(likes, :newMovieId)"
    }},
    {Put: {
      TableName: "Like",
      Item: {
        "movieId": {S: movieId},
        "userId": {S: userId}
      },
    }}
  ]
}

dynamodb.transactWriteItems(params, (err, data) => {
  if (err) {
    console.error("fail to query", JSON.stringify(err, null, 2))
  } else {
    console.log("success to query");
    console.log(data);
    
  }
})