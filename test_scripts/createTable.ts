import * as AWS from "aws-sdk"
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "Movies",
  KeySchema: [
    {AttributeName: "year", KeyType: "HASH"},
    {AttributeName: "title", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    {AttributeName: "year", AttributeType: "N"},
    {AttributeName: "title", AttributeType: "S"},
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

dynamodb.createTable(params, (error, data) => {
  if (error) {
    console.error("Unable to create table. Error JSON", JSON.stringify(error, null, 2))
  } else {
    console.log("Created table.", JSON.stringify(data, null, 2))
  }
})