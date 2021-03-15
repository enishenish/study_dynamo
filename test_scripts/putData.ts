import * as AWS from "aws-sdk"
import { PutItemInput } from "aws-sdk/clients/dynamodb"
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"
import * as fs from "fs"
import * as uuid from "uuid"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)

const docClient = new AWS.DynamoDB.DocumentClient();

const allMovies = JSON.parse(fs.readFileSync("./moviedata.json", "utf8"))
allMovies.forEach((movie:any) => {
  const params:PutItemInput = {
    TableName: "Movies",
    Item: {
      "movieId": uuid.v4() as any,
      "year": movie.year,
      "title": movie.title,
      "info": movie.info
    },
    ConditionExpression: "attribute_not_exists(movieId)"
  }

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("fail to add movie data", JSON.stringify(err, null, 2));
    } else {
      console.log("success to put data", movie.title);
      
    }
  })
})