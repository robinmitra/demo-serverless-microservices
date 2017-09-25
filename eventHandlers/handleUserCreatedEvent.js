const AWS = require('aws-sdk');
const lambdaClient = new AWS.Lambda();

exports.handler = (event, context, callback) => {
  const user = JSON.parse(event.Records[0].Sns.Message);
  console.log(user);
  const task = {
    title: "Explore the API",
    due: (new Date()).toISOString(),
    status: "pending",
    userId: user.userId,
  };
  lambdaClient.invoke({
    FunctionName: 'createTask',
    Payload: JSON.stringify(task, null, 2),
  }, (err, data) => (err ? callback(err) : callback(null, data)));
};