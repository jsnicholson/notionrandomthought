function run(sourceAllItems, destinationUnwantedItems) {
    console.log("removing unwanted items from source items");
    let sourceWantedItems = [];
    for(const item of sourceAllItems) {
        let unwanted = false;
        for(const unwantedItem of destinationUnwantedItems) {
            if(item.id == unwantedItem.properties.original_id.rich_text[0].text.content)
                unwanted = true;
        }
        if(!unwanted)
            sourceWantedItems.push(item);
    }
    return sourceWantedItems;
}

module.exports = {run};