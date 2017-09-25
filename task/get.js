// GET
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = (event, context, callback) => {
  let params = {
    TableName: tableName,
    Key: { id: event.id },
  };

  dynamo.get(params).promise()
    .then((data) => {
      if (!data.Item) return callback(new Error("Task not found"));
      return callback(null, data.Item);
    })
    .catch((err) => callback(err));
};