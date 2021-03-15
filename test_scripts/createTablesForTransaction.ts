import * as AWS from "aws-sdk"
import { CreateTableInput } from "aws-sdk/clients/dynamodb";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service"

const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-northeast-1",
  endpoint: "http://localhost:20002",
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}
AWS.config.update(serviceConfigOptions)

const dynamodb = new AWS.DynamoDB();

const movieParams:CreateTableInput = {
  TableName: "Movies",
  KeySchema: [
    {AttributeName: "movieId", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    {AttributeName: "movieId", AttributeType: "S"},
    {AttributeName: "title", AttributeType: "S"},
    {AttributeName: "year", AttributeType: "N"},
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "TitleAndYear",
      KeySchema: [
        {AttributeName: "year", KeyType:"HASH"},
        {AttributeName: "title", KeyType:"RANGE"}
      ],
      Projection: {"ProjectionType": "ALL"},
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

const likeParams:CreateTableInput = {
  TableName: "Like",
  KeySchema: [
    {AttributeName: "movieId", KeyType: "HASH"},
    {AttributeName: "userId", KeyType: "RANGE"}
  ],
  AttributeDefinitions: [
    {AttributeName: "movieId", AttributeType: "S"},
    {AttributeName: "userId", AttributeType: "S"},
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

const userParams:CreateTableInput = {
  TableName: "User",
  KeySchema: [
    {AttributeName: "userId", KeyType: "HASH"},
  ],
  AttributeDefinitions: [
    {AttributeName: "userId", AttributeType: "S"},
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

const makeTable = async (params: CreateTableInput) => {
  console.log(params);
  await dynamodb.createTable(params, (error, data) => {
    if (error) {
      console.error(
        "Unable to create table. Error JSON",
        JSON.stringify(error, null, 2)
      );
    } else {
      console.log("Created table.", JSON.stringify(data, null, 2));
    }
  });
};

makeTable(movieParams);
makeTable(userParams);
makeTable(likeParams);