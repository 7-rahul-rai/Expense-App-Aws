const expenseModel = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/db");

const path = require("path");

exports.expense = async (req, res) => {
  const t = await sequelize.transaction();
  const { amount, description, category } = req.body;
  try {
    const data = await expenseModel.create(
      { amount, description, category, userId: req.user.id },
      { transaction: t }
    );
    const totalExpense = Number(req.user.totalexpenses) + Number(amount);
    await User.update(
      { totalexpenses: totalExpense },
      { where: { id: req.user.id }, transaction: t }
    );
    t.commit();
    console.log("commit");
    res.status(201).json({ data: data });
  } catch (err) {
    console.log(err);
    t.rollback();
    console.log("rollback");
    res.status(500).json({ msg: "something went wrong" });
  }
};

exports.getexpense = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = parseInt(req.query.page) || 1;
    const offset = (currentPage - 1) * limit;

    const data = await expenseModel.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    const totalItems = data.count;
    const totalPages = Math.ceil(totalItems / limit);
    const jsonData = data.map((expense) => expense.toJSON());
    // console.log(jsonData);
    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
};

exports.delex = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    console.log("expense id params", id);
    const expense = await expenseModel.findAll({
      where: {
        id: id,
        userId: req.user.id,
      },
      transaction: t,
    });
    const totalExpense =
      Number(req.user.totalexpenses) - Number(expense[0].amount);
    await User.update(
      { totalexpenses: totalExpense },
      {
        where: { id: req.user.id },
        transaction: t,
      }
    );
    const data = await expense[0].destroy();
    await t.commit();
    console.log("commit");
    console.log("Data deleted");
    res.status(200).json({ msg: "Data has been deleted" });
  } catch (err) {
    await t.rollback();
    console.log("rollback");
    res.status(403).json({ msg: "not deleted" });
  }
};

// exports.editex = async (req, res) => {
//   const id = req.params.id
//   try {
//     const data = await expenseModel.findOne({ where: {
//       id: id,
//       userId: req.user.id,
//     }
//   });
//   res.status(200).json(data)
//   } catch (err) {
//     console.log(err);
//   }
// };
