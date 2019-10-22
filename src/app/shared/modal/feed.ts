export interface Feed {
    rss: {
        channel: {
            item: [{
                title: string,
                description: any,
                mediathumbnail:any
                'media:thumbnail': any
            }]
        }
    }
}
