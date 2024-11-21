import AWS from "aws-sdk";

AWS.config.update({
    region: "us-east-1",
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export { cognito };
