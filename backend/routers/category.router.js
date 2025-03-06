const express = require('express');

const CategoryController = require('../controllers/category.controller');
const adminAuth = require('../middleware/adminAuth');


const categoryRouter = express.Router();

categoryRouter.get(
    "/get-trashed", CategoryController.readTrashed
)
categoryRouter.get(
    "/:id?", CategoryController.read
)

categoryRouter.get(
    "/category-exists/:name", CategoryController.categoryExists
)

categoryRouter.post(
    "/create", adminAuth,CategoryController.create
)

categoryRouter.patch(
    "/change-status/:id", CategoryController.toggleStatus
);

categoryRouter.put(
    "/update/:id", CategoryController.update
)
categoryRouter.delete(
    "/trash/:id", CategoryController.moveTrash
)
categoryRouter.patch(
    "/restore/:id", CategoryController.Restore
)
categoryRouter.delete(
    "/delete/:id", CategoryController.delete
)


module.exports = categoryRouter;