import * as AWS from "aws-sdk"
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)


const dynamoDB = new AWS.DynamoDB();

const params = {
  TableName: "Movies"
};

dynamoDB.deleteTable(params, (err, data) => {
  if (err) {
    console.error("Unable to delete table", JSON.stringify(err, null, 2));
  } else {
    console.log("success to delete table", JSON.stringify(data, null, 2));
  }
})