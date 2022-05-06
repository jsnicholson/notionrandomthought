import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    let data = []
    let database = steps.FindAllAvailableDb.DB_DEST
    console.log(`fetching from database ${database.name}`)
    var response = {data:{next_cursor:undefined}}
    do {
      response = await this.FetchUnwantedItemsFromDest(steps.Config.CONSTANTS_HEADER, database.id, response.data.next_cursor)
      data.push(...response.data.results)
    } while(response.data.has_more === true)
    console.log(`fetch completed from database ${database.name}`)
    $.export('DEST_UNWANTED_ITEMS',data)
  },
  methods: {
    async FetchUnwantedItemsFromDest(header, databaseId, startCursor = undefined) {
      const resp = await axios({
        method: "POST",
        url: `https://api.notion.com/v1/databases/${databaseId}/query`,
        headers: header,
        data: {
          page_size:100, // default to 100 but made explicit for clarity
          start_cursor: startCursor,
          filter:{
            property:"Don't show this again",
            checkbox:{
              equals:true
            }
          }
        }
      }).catch(error => {
        console.log(error)
        throw error
      })
      return resp
    },
  },
})