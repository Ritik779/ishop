const { getNewFileName } = require("../helper");
const CategoryModel = require("../models/category.model");
const ColorModal = require("../models/color.model");
const ProductModel = require("../models/product.model");
const fs = require("fs");


const ProductController = {
    async uploadOtherImages(req, res) {
        try {
            const product_id = req.params.id
            const other_images = req.files.other_images;
            const otherNameImages = [];
            if (Array.isArray(other_images)) {
                for (let otherimages of other_images) {
                    const file_Name = getNewFileName(otherimages.name)
                    const destination = './public/images/product/other-images/' + file_Name
                    await otherimages.mv(destination)
                    otherNameImages.push(file_Name)
                }
            } else {
                const file_Name = getNewFileName(other_images.name)
                const destination = './public/images/product/other-images/' + file_Name
                await other_images.mv(destination)
                otherNameImages.push(file_Name)
            }
            const Product = await ProductModel.findById(product_id)
            const product_other_images = Product.other_images
            const NewProductData = [...product_other_images, ...otherNameImages]
            Product.other_images = NewProductData
            Product.save()
            res.send(
                {
                    flag: 1,
                    message: "Images Uploaded Successfully",
                    other_images: NewProductData
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
    async readTrashed(req, res) {
        try {
            const products = await ProductModel.find({ deletedAt: { $ne: null } })
                .sort({ deletedAt: -1 })
                .populate(["category", "color"]);
            res.send(
                {
                    flag: 1,
                    products
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
    // async productCategory(req, res) {
    //     try {
    //         const category_slug = req.params.slug;
    //         if (!category_slug) return res.send({ message: "Wrong Category Name" })
    //         else {
    //             const category = await CategoryModel.findOne({ slug: category_slug })
    //             if (category) {
    //                 const products = await ProductModel.find({ category: category._id })
    //                 res.send(
    //                     {
    //                         flag: 1,
    //                         products
    //                     }
    //                 )
    //             } else {
    //                 res.send(
    //                     {
    //                         flag: 0,
    //                         message: "Unable to get Product",
    //                         products: []
    //                     }
    //                 )
    //             }

    //         }
    //     } catch (error) {
    //         res.send(
    //             {
    //                 message: "Internal Server Error",
    //                 flag: 0
    //             }
    //         )
    //     }
    // },
    async read(req, res) {
        const query = req.query;
        const filterQuery = {}
        if (query.category) {
            const category = await CategoryModel.find({ slug: query.category })
            const categoryID = category.map(cat => cat._id)
            filterQuery["category"] = { $in: categoryID }
        }
        if (query.min != null && query.max != null) {
            filterQuery['discount_price'] = {
                $gte: Number(query.min),
                $lte: Number(query.max)
            }
        }
        if (query.color) {
            const colors = await ColorModal.find({slug:query.color?.split(",")})
            const colorID = colors.map(col => col._id)
            filterQuery['color'] = { $in: colorID }
        }
        try {
            const { id } = req.params;
            if (id) {
                const product = await ProductModel.findById(id).populate(['category', 'color'])
                res.send(
                    {
                        flag: 1,
                        product
                    }
                )
            } else {
                const products = await ProductModel.find({ $and: [filterQuery, { deletedAt: null }] }).populate(["category", "color"])
                res.send(
                    {
                        flag: 1,
                        products
                    }
                )
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
    async productExists(req, res) {
        try {
            const { name } = req.params;
            if (name) {
                const product = await ProductModel.findOne({ name: name })
                if (product) {
                    res.send(
                        {
                            flag: 0,
                            message: "Product Already Exist"
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
            let colors;
            try {
                colors = JSON.parse(req.body.color)
            } catch (error) {
                throw new Error("Color is Not Defiend")
            }
            const image = req.files.main_image;
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                color: colors,
                orignal_price: req.body.orignal_price,
                discount_price: req.body.discount_price,
                discount_percentage: req.body.discount_percentage,
            }

            const newName = getNewFileName(image.name)

            const destination = './public/images/product/' + newName

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
                        data.main_image = newName;
                        const product = new ProductModel({ ...data })
                        product.save()
                            .then(
                                (success) => {
                                    res.send(
                                        {
                                            flag: 1,
                                            message: "Product Created"
                                        }
                                    )
                                }
                            ).catch(
                                (err) => {
                                    res.send(
                                        {
                                            flag: 0,
                                            message: "Unable To Create Product"
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
            const product = await ProductModel.findById(id)
            if (!product) return res.send({ flag: 0, message: "Invalid Product ID" })
            const image = req.files?.main_image ?? null
            let colors;
            try {
                colors = JSON.parse(req.body.color)
            } catch (error) {
                throw new Error("Color is Not Defiend")
            }
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                color: colors,
                orignal_price: req.body.orignal_price,
                discount_price: req.body.discount_price,
                discount_percentage: req.body.discount_percentage
            }
            if (image != null) {
                const newName = getNewFileName(image.name)
                const destination = './public/images/product/' + newName
                await image.mv(destination)
                data.main_image = newName
            }
            await ProductModel.updateOne({ _id: id }, data)
            if (image != null && product.main_image) {
                await fs.unlinkSync(`./public/images/product/${product.main_image}`)
            }
            res.send(
                {
                    flag: 1,
                    message: "Product Updated Successfully"
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
    async moveTrash(req, res) {
        try {
            const { id } = req.params;

            await ProductModel.updateOne(
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

            ProductModel.updateOne(
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

            await ProductModel.updateOne(
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
            const product = await ProductModel.findOne({ _id: id });

            if (product) {
                // Delete main image if exists
                if (product.main_image) {
                    try {
                        await fs.unlinkSync(`./public/images/product/${product.main_image}`);
                    } catch (error) {
                        console.log(`Error deleting main image: ${error.message}`);
                    }
                }

                // Delete other images if exist
                const other_image = product.other_images;
                if (other_image) {
                    if (Array.isArray(other_image)) {
                        for (let prod_other of other_image) {
                            try {
                                await fs.unlinkSync(`./public/images/product/other-images/${prod_other}`);
                            } catch (error) {
                                console.log(`Error deleting other image (${prod_other}): ${error.message}`);
                            }
                        }
                    } else {
                        try {
                            await fs.unlinkSync(`./public/images/product/other-images/${other_image}`);
                        } catch (error) {
                            console.log(`Error deleting other image: ${error.message}`);
                        }
                    }
                }

                // Delete product from the database
                await ProductModel.findByIdAndDelete(id);

                res.send({
                    flag: 1,
                    message: "Product Deleted Successfully",
                });
            } else {
                res.send({
                    flag: 0,
                    message: "Product not found",
                });
            }
        } catch (error) {
            console.log(error.message);
            res.send({
                flag: 0,
                message: "Internal Server Error",
            });
        }
    },
    async deleteOtherImage(req, res) {
        try {
            const product_id = req.params.id
            const index = req.params.index
            const product = await ProductModel.findById(product_id);
            const other_images = product.other_images;
            const image_name = other_images[index]
            await fs.unlinkSync("./public/images/product/other-images/" + image_name);
            other_images.splice(index, 1)
            product.other_images = other_images
            await product.save()
            res.send(
                {
                    flag: 1,
                    message: "Image Deleted",
                    other_images
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
    }

}


module.exports = ProductController;