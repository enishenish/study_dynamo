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
  TableName: "User",
  ProjectionExpression: "userId, #name, likes, description",
  ExpressionAttributeNames: {
    "#name": "name"
  },
}

docClient.scan(params, (err, data)=> {
  if (err) {
    console.error("fail to scan", JSON.stringify(err, null, 2))
  } else {
    console.log("success to scan");
    console.log(data.Items);
    data.Items!.forEach((item) => {
      console.log(" -", item.userId+ ": " + item.name);
      item.likes?.map((data:any, index:any) => {
        console.log("  -", index, ": ", data);
      })
    })
  }
})