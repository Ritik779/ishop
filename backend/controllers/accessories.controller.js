const { getNewFileName } = require("../helper");
const AccessoryModel = require("../models/accessories.model")
const fs = require("fs");
const ProductModel = require("../models/product.model");


const AccessioryController = {
    async readTrashed(req, res) {
        try {
            const accessories = await AccessoryModel.find({ deletedAt: { $ne: null } })
                .sort({ deletedAt: -1 })
                .populate(["product"]);
            res.send(
                {
                    flag: 1,
                    accessories
                }
            )
        } catch (error) {
            res.send(
                {
                    flag: 0,
                    message: "Internal server Error"
                }
            )
        }
    },
    async read(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                const accessory = await AccessoryModel.findById(id).populate(['product'])
                res.send(
                    {
                        flag: 1,
                        accessory
                    }
                )
            } else {
                const accessories = await AccessoryModel.find({ deletedAt: null }).populate(['product'])
                const data = []
                const allPromises = accessories.map(
                    async (accessory) => {
                        const product_id = accessory.product.map(prod => (prod._id))
                        const ProductCount = await ProductModel.find({ _id: { $in: product_id } }).countDocuments()
                        data.push({
                            ...accessory.toJSON(),
                            ProductCount
                        })
                    }
                )
                await Promise.all(allPromises)
                res.send(
                    {
                        flag: 1,
                        accessories: data
                    }
                )
            }
        } catch (error) {
            console.log(error.message)
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async accessioryExists(req, res) {
        try {
            const { name } = req.params;
            if (name) {
                const product = await AccessoryModel.findOne({ name: name })
                if (product) {
                    res.send(
                        {
                            flag: 0,
                            message: "Accessory Already Exist"
                        }
                    )
                } else {
                    res.send(
                        {
                            flag: 1,
                            message: ""
                        }
                    )
                }

            }
        } catch (error) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async create(req, res) {
        try {
            const image = req.files?.image;
            // console.log(JSON.parse(req.body.product))
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                product: JSON.parse(req.body.product),
                orignal_price: req.body.orignal_price,
                discount_price: req.body.discount_price,
                discount_percentage: req.body.discount_percentage,
            }


            const newName = getNewFileName(image.name)

            // console.log(newName)
            const destination = './public/images/accessory/' + newName

            image.mv(
                destination, (err) => {
                    if (err) {
                        res.send(
                            {
                                flag: 0,
                                message: "Something Went Wrong"
                            }
                        )
                    } else {
                        data.image = newName;
                        const accessory = new AccessoryModel({ ...data })
                        accessory.save()
                            .then(
                                (success) => {
                                    res.send(
                                        {
                                            flag: 1,
                                            message: "Accessory Created"
                                        }
                                    )
                                }
                            ).catch(
                                (err) => {
                                    console.log(err.message)
                                    res.send(
                                        {
                                            flag: 0,
                                            message: "Unable To Create Accessory"
                                        }
                                    )
                                }
                            )
                    }
                }
            )
        } catch (error) {
            console.log(error.message)
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params
            const accessory = await AccessoryModel.findById(id)
            if (!accessory) return res.send({ flag: 0, message: "Invalid Accessory ID" })
            const image = req.files?.image ?? null
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                product: JSON.parse(req.body.product),
                orignal_price: req.body.orignal_price,
                discount_price: req.body.discount_price,
                discount_percentage: req.body.discount_percentage
            }
            if (image != null) {
                const newName = getNewFileName(image.name)
                const destination = './public/images/accessory/' + newName
                await image.mv(destination)
                data.image = newName
            }
            console.log(data)
            await AccessoryModel.updateOne({ _id: id }, data)
            if (image != null && accessory.image) {
                await fs.unlinkSync(`./public/images/accessory/${accessory.image}`)
            }
            res.send(
                {
                    flag: 1,
                    message: "Accessory Updated Successfully"
                }
            )
        } catch (error) {
            console.log(error.message)
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async moveTrash(req, res) {
        try {
            const { id } = req.params;

            await AccessoryModel.updateOne(
                { _id: id },
                {
                    deletedAt: new Date().toISOString()
                }
            ).then(
                () => {
                    res.send(
                        {
                            flag: 1,
                            message: "Move To Trash"
                        }
                    )
                }
            ).catch(
                () => {
                    res.send(
                        {
                            flag: 0,
                            message: "Unable To Trash"
                        }
                    )
                }
            )
        } catch (error) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body; // Get all updates from request body

            await AccessoryModel.updateOne(
                { _id: id },
                updates
            ).then(() => {
                res.send({
                    flag: 1,
                    message: "Updated Successfully"
                });
            }).catch(() => {
                res.send({
                    flag: 0,
                    message: "Unable To Update"
                });
            });
        } catch (error) {
            res.send({
                flag: 0,
                message: "Internal Server Error"
            });
        }
    },
    async Restore(req, res) {
        try {
            const { id } = req.params;

            await AccessoryModel.updateOne(
                { _id: id },
                {
                    deletedAt: null
                }
            ).then(
                () => {
                    res.send(
                        {
                            flag: 1,
                            message: "Restore Category"
                        }
                    )
                }
            ).catch(
                () => {
                    res.send(
                        {
                            flag: 0,
                            message: "Unable To Restore"
                        }
                    )
                }
            )
        } catch (error) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const Accessory = await AccessoryModel.findOne({ _id: id });

            if (Accessory) {
                // Delete main image if exists
                if (Accessory.image) {
                    try {
                        await fs.unlinkSync(`./public/images/accessory/${Accessory.image}`);
                    } catch (error) {
                        console.log(`Error deleting main image: ${error.message}`);
                    }
                }

                // Delete product from the database
                await AccessoryModel.findByIdAndDelete(id);

                res.send({
                    flag: 1,
                    message: "Accessory Deleted Successfully",
                });
            } else {
                res.send({
                    flag: 0,
                    message: "Accessory not found",
                });
            }
        } catch (error) {
            res.send({
                flag: 0,
                message: "Internal Server Error",
            });
        }
    }

}


module.exports = AccessioryController;