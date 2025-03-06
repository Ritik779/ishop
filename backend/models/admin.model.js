const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        contact:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            default:true
        },
        deletedAt:{
            type:Date,
            default:null
        },
        type:{
            type:Number,
            enum:[1,2,3], // 1.Super Admin 2.Sub Admin/Manager 3.Staff
            required:true
        }
    },
    {
        timestamps:true
    }
)

const AdminModel = mongoose.model("Admin",AdminSchema)
module.exports = AdminModel