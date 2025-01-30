const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const colorRouter = require('./routers/color.router');
const AccessoryRouter = require('./routers/accessories.router');

const app = express();

app.use(express.static("public"))
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.use("/category", categoryRouter)
app.use("/color" , colorRouter)
app.use("/product", productRouter)
app.use("/accessories",AccessoryRouter)


mongoose.connect('mongodb://localhost:27017/', {dbName:"E-commerce"})
.then(
    ()=>{
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        })
        console.log("Connected to the database");
    }
).catch(
    (err)=>{
        console.log(err.message)
    }
)


