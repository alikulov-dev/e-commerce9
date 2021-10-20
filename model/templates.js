const mongoose = require('mongoose');
const TemplateSchema = mongoose.Schema({
    title: {
        type: String, required: true
    },
    subtitle: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    license: {
        type: String,enum: ['Pro', 'MIT']
    },
    built_with: {
        type: String
    },
    preview_url: {
        type: String
    },
    download_url: {
        type: String
    },
    photo: {
        type: String
    },
    content: {
        type: String
    }
},{
    timestamps:true
})
module.exports = mongoose.model('template', TemplateSchema)