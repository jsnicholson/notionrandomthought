const utils = require("../utils.js");

async function run(appContext, dbDestination) {
    console.log("fetching all unwanted items from destination database")
    return await utils.FetchAllItemsFromDatabase(appContext.notionClient, 
        {
            databaseId:dbDestination.id,
            filter: {
                property:"Don't show this again",
                checkbox:{
                    equals:true
                }
            }
        });
}

module.exports = {run};