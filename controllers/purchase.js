const razorpay = require("razorpay");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");

exports.purchasepremium = async (req, res, next) => {
    try {
      const rzp = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const amount = 120000;
  
      const order = await new Promise((resolve, reject) => {
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
          if (err) {
            reject(err);
          } else {
            resolve(order);
          }
        });
      });
  
      await req.user.createOrder({ orderid: order.id, status: "PENDING" });
      res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
      console.error(err);
      res.status(403).json({ message: "Something went wrong", error: err.message });
    }
  };

  exports.updateTransaction = async (req, res, next) => {
    try {
      const { payment_id, order_id } = req.body;
      const id = req.user.id;
      const order = await Order.findOne({ where: { orderid: order_id } });
  
      await Promise.all([
        order.update({ paymentid: payment_id, status: "SUCCESSFUL" }),
        req.user.update({ ispremiumuser: true }),
      ]);
  
      const token = await jwt.sign({ id: id, ispremiumuser: true }, process.env.TOKEN_SECRET);
  
      res.status(202).json({
        success: true,
        message: "Transaction Successful",
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(403).json({
        message: "Updating transaction failed",
        error: err.message,
      });
    }
  };

  exports.updateTransactionFail = async (req, res, next) => {
    try {
      const { order_id } = req.body;
      const order = await Order.findOne({ where: { orderid: order_id } });
  
      await order.update({ status: "FAILED" });
  
      res.status(400).json({ success: false, message: "Transaction Failed" });
    } catch (err) {
      console.error(err);
      res.status(403).json({
        message: "Updating transaction failed",
        error: err.message,
      });
    }
  };
  