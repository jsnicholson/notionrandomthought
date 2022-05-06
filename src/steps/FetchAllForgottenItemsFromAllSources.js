import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    let data = []
    const forgottenTime = this.CalculateForgottenTime(steps.Config.WEEKS_UNTIL_FORGOTTEN)
    for(const database of steps.FindAllAvailableDb.DB_SOURCES) {
      console.log(`fetching from database ${database.name}`)
      let response = {data:{next_cursor:undefined}}
      do {
        response = await this.FetchItemsFromSource(steps.Config.CONSTANTS_HEADER, database.id, response.data.next_cursor, forgottenTime)
        data.push(...response.data.results)
      } while(response.data.has_more === true)
      console.log(`fetch completed from database ${database.name}`)
    }
    $.export('SOURCE_ALL_ITEMS',data)
  },
  methods: {
    CalculateForgottenTime(weeks) {
      let stamp = new Date()
      stamp.setDate(stamp.getDate() - (7*weeks))
      return stamp.toISOString()
    },
    async FetchItemsFromSource(header, databaseId, startCursor = undefined, forgottenTime) {
      const resp = await axios({
        method: "POST",
        url: `https://api.notion.com/v1/databases/${databaseId}/query`,
        headers: header,
        data: {
          page_size:100, // default to 100 but made explicit for clarity
          start_cursor: startCursor,
          filter:{
            "timestamp":"last_edited_time",
            "last_edited_time":{
              before:forgottenTime
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