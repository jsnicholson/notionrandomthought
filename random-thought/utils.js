async function FetchAllItemsFromDatabase(notionClient, query) {
    let response = {next_cursor:undefined};
    let data = [];
    do {
        response = await FetchItemsFromDatabase(notionClient, response.next_cursor, query);
        data.push(...response.results);
    } while(response.has_more === true)
    return data;
}

async function FetchItemsFromDatabase(notionClient, startCursor, query) {
    return notionClient.databases.query({
        database_id:query.databaseId,
        page_size:100,
        start_cursor:startCursor,
        filter:query.filter,
        sort:query.sort
    })
}

module.exports = {FetchAllItemsFromDatabase};