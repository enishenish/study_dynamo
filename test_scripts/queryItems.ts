import * as AWS from "aws-sdk"
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)

const docClient = new AWS.DynamoDB.DocumentClient();


const params:AWS.DynamoDB.DocumentClient.QueryInput = {
  TableName: "Movies",
  KeyConditionExpression: "#yr =  :yyyy",
  ExpressionAttributeNames: {
    "#yr": "year"
  },
  ExpressionAttributeValues: {
    ":yyyy": 2011
  },
  IndexName: "TitleAndYear"
}

docClient.query(params, (err, data)=> {
  if (err) {
    console.error("fail to query", JSON.stringify(err, null, 2))
  } else {
    console.log("success to query");
    data.Items!.forEach((item) => {
      console.log(" -", item.movieId, ": ", item.year + ": " + item.title);
    })
  }
})