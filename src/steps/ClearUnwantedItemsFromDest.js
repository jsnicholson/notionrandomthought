import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    console.log("fetching items from destination db")
    var items = await this.FetchAllWantedItemsFromDest(steps.Config, steps.FindAllAvailableDb.DB_DEST.id)
    console.log("items fetched from destination db")
    for(const item of items) {
      console.log(`removing item`)
      await this.RemoveItemFromDb(steps.Config, item.id)
    }
  },
  methods: {
    async FetchAllWantedItemsFromDest(config, databaseId) {
      const resp = await axios({
        method: "POST",
        url: `https://api.notion.com/v1/databases/${databaseId}/query`,
        headers: config.CONSTANTS_HEADER,
        data: {
          page_size: config.NUM_ENTRIES,
          filter: {
            property:"Don't show this again",
            checkbox:{
              equals:false
            }
          }
        },
      }).catch(error => {
        console.log(error)
        throw error
      })
      console.log(resp)
      return resp.data.results
    },
    async RemoveItemFromDb(config, itemId) {
      const resp = await axios({
        method:"DELETE",
        url: `https://api.notion.com/v1/blocks/${itemId}`,
        headers: config.CONSTANTS_HEADER,
      }).catch(error => {
        console.log(JSON.stringify(error))
        throw error
      })
      console.log(resp)
      return resp
    }
  },
})