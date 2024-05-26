
const URLModel=require('../../database/schemas/url.schema')
class URLShortenerService{
    
    moongose;
    urlModel;

    constructor(){
    }

    async store(url,ip){
        let newUrl=new URLModel({
            url,
            ip
        })

        await newUrl.save()

        return newUrl
    }

    async findByShortId(shortId){
        return await URLModel.findOne({
            short_url:shortId
        })
    }

}

module.exports=URLShortenerService