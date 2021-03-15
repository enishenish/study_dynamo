import * as AWS from "aws-sdk"
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"
import * as fs from "fs"

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
  const params = {
    TableName: "Movies",
    Item: {
      "year": movie.year,
      "title": movie.title,
      "info": movie.info
    }
  }

  docClient.put(params, (err, data) => {
    if (err) {
      console.error("fail to add movie data", JSON.stringify(err, null, 2));
    } else {
      console.log("success to put data", movie.title);
      
    }
  })
})