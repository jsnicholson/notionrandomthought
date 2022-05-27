async function run(appContext, simpleItems, dbDestination) {
    console.log("pushing simple items to destination database");
    for(item of simpleItems) {
        let response = await appContext.notionClient.pages.create({
            parent: {
                database_id:`${dbDestination.id}`,
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
        });
    }
}

module.exports = {run};