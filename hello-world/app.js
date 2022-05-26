const steps = require("steps.js");

exports.lambdaHandler = async (event, context) => {
    const key = await GetNotionApiKey();
    steps.Start(key);
    let response;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

async function GetNotionApiKey() {
    var AWS = require('aws-sdk');
    let secretManager = new AWS.SecretsManager({region:process.env.SECRET_REGION});
    const data = await secretManager.getSecretValue({SecretId:process.env.SECRET_ARN}).promise();
    const key = JSON.parse(data.SecretString).api_key;
    return key;
}