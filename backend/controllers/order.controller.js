const OrderModel = require("../models/order.model")
const UserModel = require("../models/user.model")
const CartModel = require("../models/cart.model")
const Razorpay = require("razorpay");
const { verifyPaymentSignature } = require("../helper");
const TransactionModel = require("../models/transaction.model");
const ProductModel = require("../models/product.model")

const RazorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

const OrderController = {
    async readAllOrders(req, res) {
        try {
            const orders = await OrderModel.find().populate({ path: "user_id", select: "name email" })
            if (!orders || orders.length === 0) {
                return res.send({ flag: 0, message: "Orders Not Found" })
            }
            return res.send({ flag: 1, orders })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async readOrder(req, res) {
        try {
            const { user_id, order_id } = req.params;
            const orders = await OrderModel.find({ user_id });
    
            if (!orders || orders.length === 0) {
                return res.send({ flag: 0, message: "Orders Not Found" });
            }
    
            if (order_id) {
                const order = await OrderModel.findOne({ _id: order_id, user_id });
                if (!order) {
                    return res.send({ flag: 0, message: "Order Not Found" });
                }
                return res.send({ flag: 1, order });
            }
            return res.send({ flag: 1, orders });
        } catch (error) {
            return res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async createOrder(req, res) {
        try {
            const { user_id, paymentMethod, address } = req.body;
            const user = await UserModel.findOne({ _id: user_id })
            if (!user) {
                res.send({ flag: 0, message: "User Not Founded" })
            }
            const cart = await CartModel.find({ user_id }).populate({
                path: "product_id",
                select: "_id orignal_price discount_price"
            })
            let final_total = 0
            let original_total = 0
            if (cart.length != 0) {
                const products = cart.map(
                    (c) => {
                        final_total += c.quantity * c.product_id.discount_price
                        original_total += c.quantity * c.product_id.orignal_price
                        return {
                            id: c.product_id._id,
                            name:c.product_name,
                            original_price: c.product_id.orignal_price,
                            discount_price: c.product_id.discount_price,
                            quantity: c.quantity,
                            total_price: c.quantity * c.product_id.discount_price
                        }
                    }
                )
                const order = new OrderModel(
                    {
                        user_id,
                        products,
                        original_total,
                        final_total,
                        address,
                        payment_method: paymentMethod,
                        order_status: paymentMethod == 0 ? 1 : 0
                    }
                )
                await order.save()
                // 0: COD , 1: Razorpay
                if (paymentMethod == 0) {
                    await CartModel.deleteMany({ user_id })
                    res.send({ flag: 1, message: "Order Placed Successfully", order_id: order._id })
                } else {
                    const options = {
                        amount: final_total * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        receipt: order._id.toString()
                    };
                    RazorpayInstance.orders.create(options, (err, Razorpayorder) => {
                        if (err) {
                            return res.send({ flag: 0, message: "Unable to Place Order" });
                        }
                        res.send({
                            flag: 1, message: "Proceed for Payment", razorpay_order_id: Razorpayorder.id, order_id: order._id
                        });
                    });
                }
            }
        } catch (error) {
            console.log(error.message)
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async paymentSuccess(req, res) {
        try {
            const { razorpay_response, order_id } = req.body
            if (verifyPaymentSignature(razorpay_response.razorpay_order_id, razorpay_response.razorpay_payment_id, razorpay_response.razorpay_signature)) {
                const order = await OrderModel.findOne({ _id: order_id });
                if (!order) {
                    return res.send({ flag: 0, message: "Order Not Found" });
                } else {
                    order.payment_status = 1;
                    order.order_status = 1;
                    await order.save();
                    const transaction = new TransactionModel({
                        user_id: order.user_id,
                        order_id,
                        amount: order.final_total,
                        status: 1,
                        paymentMethod: 1,
                        razorpay_order_id: razorpay_response.razorpay_order_id,
                        razorpay_payment_id: razorpay_response.razorpay_payment_id,
                        razorpay_signature: razorpay_response.razorpay_signature
                    })
                    await transaction.save()
                    await CartModel.deleteMany({ user_id: order.user_id })
                    res.send({ flag: 1, message: "Order Placed Successfully", order_id })
                }
            } else {
                res.send({ flag: 0, message: "Invalid Payment Signature" })
            }
        } catch (error) {
            console.log(error.message)
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async updateOrder(req, res) {
        try {

        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async TrashOrder(req, res) {
        try {

        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    }
}

module.exports = OrderController