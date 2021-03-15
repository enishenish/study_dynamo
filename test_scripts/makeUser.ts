import * as AWS from "aws-sdk"
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

const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
  TableName: "User",
  Item: {
    userId: uuid.v4(),
    name: "taro",
    likes: [],
  },
  ConditionExpression: "attribute_not_exists(userId)",
};

docClient.put(params, (err, data) => {
  if (err) {
    console.error("fail to add movie data", JSON.stringify(err, null, 2));
  } else {
    console.log(data)
    console.log("success to put data");
  }
})