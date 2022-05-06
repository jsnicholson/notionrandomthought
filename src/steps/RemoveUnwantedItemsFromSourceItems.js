export default defineComponent({
    async run({ steps, $ }) {
      let sourceAllitems = steps.FetchAllForgottenItemsFromAllSources.SOURCE_ALL_ITEMS
      const destUnwantedItems = steps.FetchAllUnwantedItemsFromDestination.DEST_UNWANTED_ITEMS
      for(const unwanted of destUnwantedItems) {
        this.FilterInPlace(sourceAllitems, item => item.properties.original_id != unwanted.id)
      }
      $.export('SOURCE_WANTED_ITEMS', sourceAllitems)
    },
    methods: {
      FilterInPlace(array, condition) {
        let i = 0, j = 0;
        while(i < array.length) {
          const val = array[i];
          if(condition(val, i , array)) array[j++] = val;
          i++;
        }
        array.length = j;
        return array;
      }
    }
  })