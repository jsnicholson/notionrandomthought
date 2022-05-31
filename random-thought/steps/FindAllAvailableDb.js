async function run(appContext) {
    console.log("finding all available databases");
    let response = await appContext.notionClient.search({
        filter: {
            property:'object',
            value:'database'
        }
    });

    // if(response.status != 200)
    //     throw response;

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
    return {
        "dbSources":allSourceDb,
        "dbDestination":destDb
    }
}

module.exports = {run};