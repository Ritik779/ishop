require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000
const app = express();
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const colorRouter = require('./routers/color.router');
const AccessoryRouter = require('./routers/accessories.router');
const UserRouter = require('./routers/user.router');
const AdminRouter = require('./routers/admin.router');
const CartRouter = require('./routers/cart.router');
const OrderRouter = require('./routers/order.router');
const TransactionRouter = require("./routers/transaction.router");

app.use(express.static("public"))
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.use("/category", categoryRouter)
app.use("/color", colorRouter)
app.use("/product", productRouter)
app.use("/accessories", AccessoryRouter)
app.use("/user", UserRouter)
app.use("/admin", AdminRouter)
app.use("/cart",CartRouter)
app.use("/order",OrderRouter)
app.use("/transaction",TransactionRouter)

mongoose.connect(process.env.MONGODB_DATABASE, { dbName: "E-commerce" })
    .then(
        () => {
            app.listen(PORT, () => {
                console.log('Server is running on port 5000');
            })
            console.log("Connected to the database");
        }
    ).catch(
        (err) => {
            console.log(err.message)
        }
    )


