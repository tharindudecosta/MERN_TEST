const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recordsCount = new Schema({
    collectionName:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    }

})

module.exports = mongoose.model('recordsCount',recordsCount)
