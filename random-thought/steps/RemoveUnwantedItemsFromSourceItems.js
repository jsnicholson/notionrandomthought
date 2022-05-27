function run(sourceAllItems, destinationUnwantedItems) {
    console.log("removing unwanted items from source items");
    let sourceWantedItems = sourceAllItems;
    for(const unwanted of destinationUnwantedItems)
        FilterInPlace(sourceWantedItems, item => item.properties.original_id != unwanted.id);
    return sourceWantedItems;
}

function FilterInPlace(array, condition) {
    let i = 0, j = 0;
    while(i < array.length) {
        const val = array[i];
        if(condition(val, i, array)) array[j++] = val;
        i++;
    }
    array.length = j;
    return array;
}

module.exports = {run};