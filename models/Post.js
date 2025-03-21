const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        max:100
    },
    description:{
        type:String,
        require:true,
        max:500
    },
    likes:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('posts', postSchema)