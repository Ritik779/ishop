const mongoose = require("mongoose")
const ProductModel = require("./product.model")
const Schema = mongoose.Schema

const AccessoriesSchema = new Schema(
    {
        name: {
            type: String,
            maxLength: 50,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            maxLength: 20,
            required: true
        },
        product: [
            {
                type: Schema.ObjectId,
                ref: ProductModel
            }
        ],
        image: {
            type: String
        },
        orignal_price: {
            type: Number,
            required: true,
            min: 1
        },
        discount_price: {
            type: Number,
            default: 0
        },
        discount_percentage: {
            type: String,
            default: 0
        }, stock: {
            type: Boolean,
            default: true
        },
        description: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
)


const AccessoriesModel = mongoose.model("accessories", AccessoriesSchema)

module.exports = AccessoriesModel;