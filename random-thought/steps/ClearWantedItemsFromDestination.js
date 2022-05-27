const utils = require("../utils.js");
let appContext;

async function run(_appContext, dbDestination) {
    console.log("clearing existing wanted items from destination database");
    appContext = _appContext;

    const wantedItems = await utils.FetchAllItemsFromDatabase(appContext.notionClient,
        {
           databaseId:dbDestination.id,
           filter: {
               property:"Don't show this again",
               checkbox: {
                   equals:false
               }
           }
        });
    for(item of wantedItems)
        await RemoveItemFromDatabase(item.id);
}

async function RemoveItemFromDatabase(id) {
    let response = await appContext.notionClient.blocks.delete({
        block_id:id,
    });
}

module.exports = {run};