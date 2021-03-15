import * as AWS from "aws-sdk"
import { DeleteTableInput } from "aws-sdk/clients/dynamodb";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)


const dynamoDB = new AWS.DynamoDB();

const movieParams:DeleteTableInput = {
  TableName: "Movies"
};
const likeParams:DeleteTableInput = {
  TableName: "Like"
};
const userParams:DeleteTableInput = {
  TableName: "User"
};



const destroyTable = async (params:DeleteTableInput) => {
  console.log(params);
  await dynamoDB.deleteTable(params, (err, data) => {
    if (err) {
      console.error("Unable to delete table", JSON.stringify(err, null, 2));
    } else {
      console.log("success to delete table", JSON.stringify(data, null, 2));
    }
  });
};

const syncDelete = async () => {
  await destroyTable(movieParams);
  await destroyTable(likeParams);
  await destroyTable(userParams);
};

syncDelete()