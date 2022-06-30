const app = require("app.js");

exports.lambdaHandler = async (event, context) => {
    try {
        let response = await app.Main(context);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Success',
            })
        }
        return response;
    } catch(e) {
        console.log(e);
        return e;
    }
};