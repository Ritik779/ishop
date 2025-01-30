const mongoose = require("mongoose");
const CategoryModel = require("./category.model");
const ColorModal = require("./color.model");
const Schema = mongoose.Schema


const ProductSchema = new Schema(
    {
        name: {
            type: String,
            maxLength: 30,
            required: true,
            unique: true,
            trim:true
        },
        slug: {
            type: String,
            maxLength: 30,
            required: true,
            unique: true
        },
        category: {
            type: Schema.ObjectId,
            ref: CategoryModel
        },
        color: [
            {
                type: Schema.ObjectId,
                ref: ColorModal
            }
        ],
        main_image:{
            type:String
        },
        other_images:[{
            type:String
        }],
        orignal_price: {
            type: Number,
            required: true,
            min: 1
        },
        discount_price: {
            type: Number,
            default:0
        },
        discount_percentage: {
            type: String,
            default:0
        },
        stock: {
            type: Boolean,
            default: true
        },
        description:{
            type:String
        },
        status:{
            type:Boolean,
            default:true
        },
        topselling:{
            type:Boolean,
            default:false
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


const ProductModel = mongoose.model("Product", ProductSchema)


module.exports = ProductModel;