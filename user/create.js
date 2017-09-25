const AWS = require('aws-sdk');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const snsClient = new AWS.SNS();

const publishCreatedEvent = (user, callback) => {
  const params = {
    TopicArn: process.env.USER_CREATED_EVENT_ARN,
    Subject: 'User Created',
    Message: JSON.stringify(user),
  };
  snsClient.publish(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    }
    return callback(null, data);
  });
};

exports.handler = (event, context, callback) => {
  const params = {
    ClientId: process.env.USER_POOL_CLIENT_ID,
    Password: event.password,
    Username: event.email,
    UserAttributes: [
      { Name: 'given_name', Value: event.firstName },
      { Name: 'family_name', Value: event.lastName }
    ],
  };
  cognitoIdentityServiceProvider.signUp(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      publishCreatedEvent({ userId: data.UserSub }, callback);
    }
  });
};