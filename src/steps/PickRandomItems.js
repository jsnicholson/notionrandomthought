export default defineComponent({
    async run({ steps, $ }) {
      let data = steps.RemoveUnwantedItemsFromSourceItems.SOURCE_WANTED_ITEMS
      let items = []
      const limit = Math.min(steps.Config.NUM_ENTRIES, data.length)
      for(let i = 0; i < limit; i++) {
        let item = data[Math.floor(Math.random()*data.length)];
        items.push(item)
        // remove the item from the original data to ensure it isnt picked again
        data.splice(data.indexOf(item), 1)
      }
      $.export('SOURCE_RANDOM_ITEMS',items)
    },
  })