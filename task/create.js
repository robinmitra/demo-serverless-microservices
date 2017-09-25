const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

exports.handler = (event, context, callback) => {
  let params = {
    TableName: tableName,
    Item: {
      title: event.title,
      due: event.due,
      status: event.status,
      userId: event.userId,
      id: guid(),
    },
  };

  dynamo.put(params).promise()
    .then(data => callback(null, { message: 'Success' }))
    .catch(err => callback(err));
};