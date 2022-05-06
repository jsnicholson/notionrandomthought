export default defineComponent({
    props: {
      dbDest: {
        type: "string",
        label: "DB Destination",
        description: "Id of database to put data into",
      },
      numEntries: {
        type: "integer",
        label: "Number of Entries",
        description: 'How many entries to randomly display',
      },
      thoughtForgotten: {
        type: "integer",
        label: "Weeks until thought forgotten",
        description: '',
      }
    },
    async run({ steps, $ }) {
      $.export("DB_DEST", this.dbDest)
      $.export("CONSTANTS_NOTIONPAGETITLE","title")
      $.export("CONSTANTS_HEADER", this.Header())
      $.export("NUM_ENTRIES", this.numEntries)
      $.export("WEEKS_UNTIL_FORGOTTEN", this.thoughtForgotten)
      
      return steps.trigger.event
    },
    methods: {
      Header() {
        return {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.API_KEY_NOTION_RANDOM_THOUGHT}`, // API KEY
          "Notion-Version": "2022-02-22"
        }
      },
    }
  })