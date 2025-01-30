const express = require('express');
const fileUpload = require("express-fileupload");
const AccessioryController = require('../controllers/accessories.controller');


const AccessoryRouter = express.Router();


AccessoryRouter.get(
    "/get-trashed", AccessioryController.readTrashed
)
AccessoryRouter.get(
    "/:id?", AccessioryController.read
)

AccessoryRouter.get(
    "/accessory-exists/:name", AccessioryController.accessioryExists
)

AccessoryRouter.post(
    "/create",
    fileUpload(
        {
            createParentPath: true
        }
    ), AccessioryController.create
)

AccessoryRouter.patch(
    "/change-status/:id", AccessioryController.toggleStatus
);

AccessoryRouter.put(
    "/update/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    AccessioryController.update
)

AccessoryRouter.delete(
    "/trash/:id", AccessioryController.moveTrash
)
AccessoryRouter.patch(
    "/restore/:id", AccessioryController.Restore
)
AccessoryRouter.delete(
    "/delete/:id", AccessioryController.delete
)



module.exports = AccessoryRouter;