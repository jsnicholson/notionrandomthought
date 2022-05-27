function run(sourceRandomItems) {
    console.log("simplifying chosen items");
    let simplifiedItems = []
    for(const page of sourceRandomItems) {
        for(const [, prop] of Object.entries(page.properties)) {
            if(prop.type == "title") {
                let obj = {
                    id:page.id,
                    name:prop.title[0].plain_text,
                    created_time:timeSince(Date.parse(page.created_time)),
                    last_edited_time:timeSince(Date.parse(page.last_edited_time))
                }
                simplifiedItems.push(obj)
            }
        }
    }
    return simplifiedItems;
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) { return Math.floor(interval) + " years"; }
    interval = seconds / 2592000;
    if (interval > 1) { return Math.floor(interval) + " months"; }
    interval = seconds / 86400;
    if (interval > 1) { return Math.floor(interval) + " days"; }
    interval = seconds / 3600;
    if (interval > 1) { return Math.floor(interval) + " hours"; }
    interval = seconds / 60;
    if (interval > 1) { return Math.floor(interval) + " minutes"; }
    return Math.floor(seconds) + " seconds";
}

module.exports = {run};