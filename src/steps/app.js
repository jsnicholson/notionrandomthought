const vue = require('https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js');

import Config from "Config.js";
import FindAllAvailableDb from "FindAllAvailableDb.js";
import FetchAllForgottenItemsFromAllSources from "FetchAllForgottenItemsFromAllSources.js";
import FetchAllUnwantedItemsFromDestination from "FetchAllUnwantedItemsFromDestination.js";
import RemoveUnwantedItemsFromSourceItems from "RemoveUnwantedItemsFromSourceItems";
import PickRandomItems from "PickRandomItems.js";
import SimplifyItems from "SimplifyItems.js";
import ClearWantedItemsFromDest from "ClearWantedItemsFromDest.js";
import PushAllSimpleItemsToSimpleDb from "PushAllSimpleItemsToSimpleDb.js";

let vm = new vue({
    $:{},
    steps: {
        "Config":Config,
        "FindAllAvailableDb":FindAllAvailableDb,
        "FetchAllForgottenItemsFromAllSources":FetchAllForgottenItemsFromAllSources,
        "FetchAllUnwantedItemsFromDestination":FetchAllUnwantedItemsFromDestination,
        "RemoveUnwantedItemsFromSourceItems":RemoveUnwantedItemsFromSourceItems,
        "PickRandomItems":PickRandomItems,
        "SimplifyItems":SimplifyItems,
        "ClearUnwantedItemsFromDest":ClearWantedItemsFromDest,
        "PushAllSimpleItemsToSimpleDb":PushAllSimpleItemsToSimpleDb
    },
    trigger: {
        event:"WorkflowStarted",
        handle:this.Handler(e)
    },
    methods: {
        async Handle(e) {
            Config(steps,$);
            FindAllAvailableDb(steps,$);
            FetchAllForgottenItemsFromAllSources(steps,$);
            FetchAllUnwantedItemsFromDestination(steps,$);
            RemoveUnwantedItemsFromSourceItems(steps,$);
            PickRandomItems(steps,$);
            SimplifyItems(steps,$);
            ClearUnwantedItemsFromDest(steps,$);
            PushAllSimpleItemsToSimpleDb(steps,$);
        }
    }
});