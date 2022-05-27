const utils = require("../utils.js");

async function run(appContext, dbSources) {
    console.log("fetching all forgotten items from all sources");
    const forgottenTime = CalculateForgottenTime(process.env.WEEKS_UNTIL_FORGOTTEN);
    let data = [];
    for(const database of dbSources) {
        let items = await utils.FetchAllItemsFromDatabase(appContext.notionClient, 
            {
                databaseId:database.id,
                filter:{
                    timestamp:"last_edited_time",
                    last_edited_time: {
                        before:`${forgottenTime}`
                    }
                }
            });
        data.push(...items);
    }
    return data;
}

function CalculateForgottenTime(weeks) {
    let stamp = new Date()
    stamp.setDate(stamp.getDate() - (7*weeks))
    return stamp.toISOString()
}

module.exports = {run};