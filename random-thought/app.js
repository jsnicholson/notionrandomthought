const notion = require("node_modules/@notionhq/client");
const FindAllAvailableDb = require("steps/FindAllAvailableDb.js");
const FetchAllForgottenItemsFromAllSources = require("steps/FetchAllForgottenItemsFromAllSources.js");
const FetchAllUnwantedItemsFromDestination = require("steps/FetchAllUnwantedItemsFromDestination.js");
const RemoveUnwantedItemsFromSourceItems = require("steps/RemoveUnwantedItemsFromSourceItems.js");
const PickRandomItems = require("steps/PickRandomItems.js");
const SimplifyItems = require("steps/SimplifyItems.js");
const ClearWantedItemsFromDestination = require("steps/ClearWantedItemsFromDestination.js");
const PushAllSimpleItemsToDestinationDatabase = require("steps/PushAllSimpleItemsToDestinationDatabase.js");

async function Main(envContext) {
    const notionApiKey = await GetNotionApiKey();
    notionClient = new notion.Client({auth:notionApiKey});
    const appContext = {
        notionClient,
        envContext
    };
    const allAvailableDb = await FindAllAvailableDb.run(appContext);
    const sourceAllItems = await FetchAllForgottenItemsFromAllSources.run(appContext, allAvailableDb.dbSources);
    const destinationUnwantedItems = await FetchAllUnwantedItemsFromDestination.run(appContext, allAvailableDb.dbDestination);
    const sourceWantedItems = RemoveUnwantedItemsFromSourceItems.run(sourceAllItems, destinationUnwantedItems);
    const sourceRandomItems = PickRandomItems.run(sourceWantedItems);
    const sourceSimpleItems = SimplifyItems.run(sourceRandomItems);
    await ClearWantedItemsFromDestination.run(appContext, allAvailableDb.dbDestination);
    await PushAllSimpleItemsToDestinationDatabase.run(appContext, sourceSimpleItems, allAvailableDb.dbDestination);
}

async function GetNotionApiKey() {
    var AWS = require('aws-sdk');
    let secretManager = new AWS.SecretsManager({region:process.env.SECRET_REGION});
    const data = await secretManager.getSecretValue({SecretId:process.env.SECRET_ARN}).promise();
    const key = JSON.parse(data.SecretString).api_key;
    return key;
}

module.exports = {Main};