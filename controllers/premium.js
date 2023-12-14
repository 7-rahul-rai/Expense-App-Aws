const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/db");

exports.showleaderboard = async (req, res, next) => {
  try {
    const expenses = await User.findAll({
      attributes: ["name", "totalexpenses"],
      order: [["totalexpenses", "DESC"]],
    });
    res.status(200).json(expenses);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

