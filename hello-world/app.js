const notion = require("node_modules/@notionhq/client");

async function Start() {
    const notionApiKey = await GetNotionApiKey();
    notionClient = new notion.Client({auth:notionApiKey});
    await FindAllAvailableDb();
    await FetchAllForgottenItemsFromAllSources();
    await FetchAllUnwantedItemsFromDestination();
    RemoveUnwantedItemsFromSourceItems();
    PickRandomItems();
    SimplifyItems();
    await ClearUnwantedItemsFromDest();
    await PushAllSimpleItemsToSimpleDb();
}

async function FindAllAvailableDb() {
    let response = {};
    try {
        response = await notionClient.search({
            filter: {
                property:'objct',
                value:'database'
            }
        });
    } catch (err) {
        console.log(JSON.stringify(err));
    }

    if(response.status != 200)
        return response;

    let allSourceDb = []
    let destDb = 0
    for(const db of response.results) {
        if(db.id != process.env.NOTION_DATABASE_DESTINATION)
            allSourceDb.push({
                id:db.id,
                name:db.title[0].plain_text,
            })
        else
            destDb = {
            id:db.id,
            name:db.title[0].plain_text
            }
    }
}

async function GetNotionApiKey() {
    var AWS = require('aws-sdk');
    let secretManager = new AWS.SecretsManager({region:process.env.SECRET_REGION});
    const data = await secretManager.getSecretValue({SecretId:process.env.SECRET_ARN}).promise();
    const key = JSON.parse(data.SecretString).api_key;
    return key;
}

module.exports = {Start};