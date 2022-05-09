const vue = require('https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js');

import Config from "/steps/Config.js";
import FindAllAvailableDb from "/steps/FindAllAvailableDb.js";
import FetchAllForgottenItemsFromAllSources from "/steps/FetchAllForgottenItemsFromAllSources.js";
import FetchAllUnwantedItemsFromDestination from "/steps/FetchAllUnwantedItemsFromDestination.js";
import RemoveUnwantedItemsFromSourceItems from "/steps/RemoveUnwantedItemsFromSourceItems";
import PickRandomItems from "/steps/PickRandomItems.js";
import SimplifyItems from "/steps/SimplifyItems.js";
import ClearWantedItemsFromDest from "/steps/ClearWantedItemsFromDest.js";
import PushAllSimpleItemsToSimpleDb from "/steps/PushAllSimpleItemsToSimpleDb.js";

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
        async Handler(e) {
            Config.run(this.steps,this.$);
            FindAllAvailableDb.run(this.steps,this.$);
            FetchAllForgottenItemsFromAllSources.run(this.steps,this.$);
            FetchAllUnwantedItemsFromDestination.run(this.steps,this.$);
            RemoveUnwantedItemsFromSourceItems.run(this.steps,this.$);
            PickRandomItems.run(this.steps,this.$);
            SimplifyItems.run(this.steps,this.$);
            ClearUnwantedItemsFromDest.run(this.steps,this.$);
            PushAllSimpleItemsToSimpleDb.run(this.steps,this.$);
        }
    }
});