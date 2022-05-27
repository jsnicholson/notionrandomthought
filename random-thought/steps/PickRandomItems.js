function run(sourceWantedItems) {
    console.log("picking random source items");
    let data = sourceWantedItems;
    let items = []
    const limit = Math.min(process.env.NUMBER_RESURFACED_ENTRIES, data.length)
    for(let i = 0; i < limit; i++) {
        let item = data[Math.floor(Math.random()*data.length)];
        items.push(item)
        // remove the item from the original data to ensure it isnt picked again
        data.splice(data.indexOf(item), 1)
    }
    return items;
}

module.exports = {run};