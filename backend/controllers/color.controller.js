const ColorModal = require("../models/color.model")


const ColorController = {
    async readTrashed(req, res) {
        try {
            const colors = await ColorModal.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 })
            res.send(
                {
                    flag: 1,
                    colors
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
                const color = await ColorModal.findById(id)
                res.send(
                    {
                        flag: 1,
                        color
                    }
                )
            } else {
                const colors = await ColorModal.find({ deletedAt: null }).sort({ createdAt: -1 })
                res.send(
                    {
                        flag: 1,
                        colors
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
    async colorExist(req, res) {
        try {
            const { name } = req.params;
            if (name) {
                const color = await ColorModal.findOne({ name: name })
                if (color) {
                    res.send(
                        {
                            flag: 1,
                            message: "Color Already Exist"
                        }
                    )
                } else {
                    res.send(
                        {
                            flag: 0,
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
            const { name,slug, color_code } = req.body;
            const ColorExists = await ColorModal.findOne({ name: name })
            if (ColorExists) {
                res.send(
                    {
                        flag: 0,
                        message: "Color already Exists"
                    }
                )
            } else {
                const CreateColor = new ColorModal({ name, color_code,slug })
                CreateColor.save()
                    .then(
                        (success) => {
                            res.send(
                                {
                                    flag: 1,
                                    message: "Color Created"
                                }
                            )
                        }
                    ).catch(
                        () => {
                            res.send(
                                {
                                    flag: 0,
                                    message: "Unable To Create Color"
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
            const color = await ColorModal.findByIdAndUpdate(
                { _id: id }, { name: data.name, color_code: data.color_code }
            )
            if (color) {
                res.send(
                    {
                        flag: 1,
                        message: "Color Updated"
                    }
                )
            } else {
                res.send(
                    {
                        flag: 0,
                        message: "Unable to Update Color"
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
            const data = req.body;

            ColorModal.updateOne(
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

            await ColorModal.updateOne(
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
    async Restore(req, res) {
        try {
            const { id } = req.params;

            await ColorModal.updateOne(
                { _id: id },
                {
                    deletedAt: null
                }
            ).then(
                () => {
                    res.send(
                        {
                            flag: 1,
                            message: "Restore Color"
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
    delete(req, res) {
        try {
            const { id } = req.params;
            if (id) {
                ColorModal.deleteOne({ _id: id })
                    .then(
                        (success) => {
                            res.send(
                                {
                                    flag: 1,
                                    message: "Color Deleted Successfully"
                                }
                            )
                        }
                    ).catch(
                        (err) => {
                            console.log(err.message)
                            res.send(
                                {
                                    flag: 0,
                                    message: "Unable To Delete Color"
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


module.exports = ColorController;