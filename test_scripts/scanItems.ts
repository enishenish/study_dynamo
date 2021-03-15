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


const params = {
  TableName: "Movies",
  ProjectionExpression: "#yr, title, info.rating",
  FilterExpression: "#yr between :start_yr and :end_yr",
  ExpressionAttributeNames: {
    "#yr": "year"
  },
  ExpressionAttributeValues: {
    ":start_yr": 2001,
    ":end_yr": 2011
  }
}

docClient.scan(params, (err, data)=> {
  if (err) {
    console.error("fail to query", JSON.stringify(err, null, 2))
  } else {
    console.log("success to query");
    data.Items!.forEach((item) => {
      console.log(" -", item.year + ": " + item.title);
      console.log("   -", item.info.rating);
    })
  }
})