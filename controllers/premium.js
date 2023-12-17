const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/db");

exports.showleaderboard = async (req, res, next) => {
  try {
    const leaderboardofusers = await User.findAll({
      attributes: [
        "id",
        "name",
        'totalexpenses'
        // [
        //   sequelize.fn("sum", sequelize.col("expenses.amount")),
        //   "total_cost",
        // ],
      ],
      // include: [
      //   {
      //     model: Expense,
      //     attributes: [],
      //   },
      // ],
      group: ["user.id"],
      order: [["totalexpenses", "DESC"]],
    });

    res.status(200).json(leaderboardofusers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
