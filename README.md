# notionrandomthought
This is an integration for Notion that allows for data from multiple sources to be funnelled into a single database view on a regular schedule, in order for thoughts to be resurfaced.
It runs on a serverless function via [Pipedream](https://www.pipedream.com) running Node.js

## what is this repository?
Unfortunately, Pipedream doesn't allow for exporting the code it runs so this repository represents what might be run
All code included in the step scripts are actual code running on Pipedream, tied together in this repo by ```app.js```

Included below for additional clarity is a procedural list of the steps run

## workflow steps
1. trigger
    - a cron job that triggers the workflow at 02:00 each morning
2. Config
    - a couple of simple parameters for how many random thoughts to grab, when a thought is considered forgotten, and the id of the destination database
    - a default header to be used in requests to the notion api
3. FindAllAvailableDb
    - notion api endpoint provides access to all of the pages that have been shared with this integration
    - filters for just pages of type 'database'
4. FetchAllForgottenItemsFromAllSources
    - grab all items from available databases that are classed as 'forgotten' (if their last edited time is older than the configured amount)
5. FetchAllUnwantedItemsFromDestination
    - items can sit in the destination database and be marked as 'Don't show this again'. In this case they are unwanted to resurface
    - it is done in this way so that only the destination needs to have a don't show again as opposed to every source
    - this does result in more calls and more data throughput, but it makes for a cleaner user experience
6. RemoveUnwantedItemsFromSourceItems
    - intersect the lists retrieved in previous steps to remove any unwanted items from the forgotten items
7. PickRandomitems
    - choose the configured number of items from the remaining list
8. SimplifyItems
    - as the items are coming from many databases with different schemas, a simple schema is in place on the destination with just the original name, edited time and created time (as well as the original id for linking purposes)
9. ClearWantedItemsFromDest
    - clear random items chosen from the previous invocation
10. PushALlSimpleItemsToSimpleDb
    - push the simple items to the destination
    - this step involves formatting page which in this instance looks like:
    {
        name,
        created,
        last-edited,
        children:
            "link to page",
            link to original page,
            explanation that this item is a random thought
    }