import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    for(const item of steps.SimplifyItems.SOURCE_SIMPLE_ITEMS) {
      await this.PushSimpleItemToSimpleDb(steps.Config.CONSTANTS_HEADER, item, steps.FindAllAvailableDb.DB_DEST.id)
    }
  },
  methods: {
    async PushSimpleItemToSimpleDb(header, item, databaseId) {
      const resp = await axios({
        method: "POST",
        url: `https://api.notion.com/v1/pages`,
        headers: header,
        data: this.SimpleItem(databaseId, item)
      }).catch(error => {
        console.log(error)
        throw error
      })
      console.log(resp)
      return resp
    },
    SimpleItem(databaseId, item) {
      return {
        parent: {
          database_id:`${databaseId}`,
        },
        icon:null,
        cover:null,
        properties: {
          Name: {
            title: [
              {
                text: {
                  content:`${item.name}`
                }
              }
            ]
          },
          Created: {
            rich_text: [
              {
                text: {
                content: `${item.created_time} ago`,
                },
              },
            ],
          },
          'Last Edited': {
            rich_text: [
              {
                text: {
                content: `${item.last_edited_time} ago`,
                },
              },
            ],
          },
          "Don't show this again": {
            checkbox:false
          },
          original_id:{
            rich_text: [
              {
                text: {
                  content:`${item.id}`
                }
              }
            ]
          }
        },
        children: [
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                  content: 'Link to Page',
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'link_to_page',
            link_to_page: {
                type: "page_id",
                page_id: `${item.id}`
            },
          },
          {
            object: 'block',
            type: 'synced_block',
            synced_block: {
              synced_from: {
                block_id:'cd1f6cc3-2b90-46a7-849b-d2338222c4fd',
              }
            }
          }
        ]
      }
    }
  }
})