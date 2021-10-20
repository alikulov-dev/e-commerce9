const mongoose = require('mongoose');
const Article = mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    photo: {
        type: String, required: true
    },
},{
    timestamps:true
})
module.exports = mongoose.model('article', Article)

