import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    const response = await this.FindAllAvailableDb(steps.Config.CONSTANTS_HEADER)
    let allSourceDb = []
    let destDb = 0
    for(const db of response.data.results) {
      if(db.id != steps.Config.DB_DEST)
        allSourceDb.push({
          id:db.id,
          name:db.title[0].plain_text,
        })
      else
        destDb = {
          id:db.id,
          name:db.title[0].plain_text
        }
    }
    $.export("DB_SOURCES", allSourceDb)
    $.export("DB_DEST", destDb)
  },
  methods: {
    async FindAllAvailableDb(header) {
      const response = await axios({
        method: "POST",
        url: `https://api.notion.com/v1/search`,
        headers: header,
        data: {
          "filter": {
            "property":"object",
            "value":"database",
          }
        }
      }).catch(error => {
        console.log(error)
        throw error
      })
      return response
    }
  }
})