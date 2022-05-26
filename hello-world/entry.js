const app = require("app.js");

exports.lambdaHandler = async (event, context) => {
    let response = await app.Start();
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