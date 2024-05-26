
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    short_url: {
        type: Number,
        unique: true,
    },
    ip: String
})

URLSchema.plugin(AutoIncrement, { inc_field: 'short_url' });

const URLModel = mongoose.model('URL', URLSchema)

module.exports = URLModel