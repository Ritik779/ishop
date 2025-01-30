const CategoryModel = require('../models/category.model');
const ProductModel = require("../models/product.model");


const CategoryController = {
    async readTrashed(req, res) {
        try {
            const categories = await CategoryModel.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 })
            res.send(
                {
                    flag: 1,
                    categories
                }
            )
        } catch (err) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async read(req, res) {
        try {
            const id = req.params.id;
            if (id) {
                const category = await CategoryModel.findById(id)
                res.send(
                    {
                        flag: 1,
                        category
                    }
                )
            } else {
                const categories = await CategoryModel.find({ deletedAt: null }).sort({ createdAt: -1 })
                const data =[];
                const allPromises = categories.map(
                    async (cat)=>{
                        const ProductCount = await ProductModel.find({category:cat._id}).countDocuments()
                        data.push({
                            ...cat.toJSON(),
                            ProductCount
                        })
                    }
                )
                await Promise.all(allPromises)
                res.send(
                    {
                        flag: 1,
                        categories:data
                    }
                )
            }
        } catch (err) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async categoryExists(req, res) {
        try {
            const { name } = req.params;
            if (name) {
                const category = await CategoryModel.findOne({ name: name })
                if (category) {
                    res.send(
                        {
                            flag: 0,
                            message: "Category Already Exist"
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
            const { name, slug } = req.body;
            const CategoryExists = await CategoryModel.findOne({ name: name })
            if (CategoryExists) {
                res.send(
                    {
                        flag: 0,
                        message: "Category already Exists"
                    }
                )
            } else {
                const CreateCategory = new CategoryModel({ name, slug })
                CreateCategory.save()
                    .then(
                        (success) => {
                            res.send(
                                {
                                    flag: 1,
                                    message: "Category Created"
                                }
                            )
                        }
                    ).catch(
                        () => {
                            res.send(
                                {
                                    flag: 0,
                                    message: "Unable To Create Category"
                                }
                            )
                        }
                    )
            }
        } catch (err) {
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
            const { id } = req.params;
            const data = req.body;
            const category = await CategoryModel.findByIdAndUpdate(
                { _id: id }, { name: data.name, slug: data.slug }
            )
            if(category){
                res.send(
                    {
                        flag:1,
                        message:"Category Updated"
                    }
                )
            }else{
                res.send(
                    {
                        flag:0,
                        message:"Unable to Update Category"
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
    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const data = req.body; // Get all updates from request body
    
            CategoryModel.updateOne(
                { _id: id },
                data
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
    async moveTrash(req, res) {
        try {
            const { id } = req.params;

            await CategoryModel.updateOne(
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
            // console.log(error.message)
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async Restore(req, res) {
        try {
            const { id } = req.params;

            await CategoryModel.updateOne(
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
            // console.log(error.message)
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    delete(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                CategoryModel.deleteOne({ _id: id })
                    .then(
                        (success) => {
                            res.send(
                                {
                                    flag: 1,
                                    message: "Category Deleted Successfully"
                                }
                            )
                        }
                    ).catch(
                        (err) => {
                            console.log(err.message)
                            res.send(
                                {
                                    flag: 0,
                                    message: "Unable To Delete Category"
                                }
                            )
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

    }
}


module.exports = CategoryController;