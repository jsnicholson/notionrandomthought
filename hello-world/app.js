// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
//import { Client } from "@notionhq/client";

var AWS = require('aws-sdk');

exports.lambdaHandler = async (event, context) => {
    let secretManager = new AWS.SecretsManager({region:process.env.SECRET_REGION});
    const data = await secretManager.getSecretValue({SecretId:process.env.SECRET_ARN}).promise();
    const key = JSON.parse(data.SecretString).api_key;

    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
