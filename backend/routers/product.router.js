const express = require('express');
const fileUpload = require("express-fileupload")


const ProductController = require('../controllers/product.controller');


const ProductRouter = express.Router();


ProductRouter.post(
    "/upload-other-images/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ), ProductController.uploadOtherImages
)
// ProductRouter.get(
//     "/category/:slug?",ProductController.productCategory
// )

ProductRouter.get(
    "/get-trashed", ProductController.readTrashed
)
ProductRouter.get(
    "/:id?", ProductController.read
)

ProductRouter.get(
    "/product-exists/:name", ProductController.productExists
)

ProductRouter.post(
    "/create",
    fileUpload(
        {
            createParentPath: true
        }
    ), ProductController.create
)

ProductRouter.patch(
    "/change-status/:id", ProductController.toggleStatus
);

ProductRouter.put(
    "/update/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    ProductController.update
)

ProductRouter.delete(
    "/trash/:id", ProductController.moveTrash
)
ProductRouter.patch(
    "/restore/:id", ProductController.Restore
)
ProductRouter.delete(
    "/delete/:id", ProductController.delete
)

ProductRouter.delete(
    "/delete-other-image/:id/:index", ProductController.deleteOtherImage
)



module.exports = ProductRouter;