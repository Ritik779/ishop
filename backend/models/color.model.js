const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ColorSchema = new Schema(
    {
        name:{
            type: String,
            maxLength:30,
            required: true,
            unique: true,
            trim:true
        },
        slug:{
            type: String,
            maxLength:30,
            required: true
        },
        color_code:{
            type: String,
            maxLength:10,
            required: true,
            unique: true
        },
        status:{
            type:Boolean,
            default:true
        },
        deletedAt:{
            type:Date,
            default:null
        }
    },
    {
        timestamps: true
    }
)

const ColorModal = mongoose.model('Color', ColorSchema)


module.exports = ColorModal;