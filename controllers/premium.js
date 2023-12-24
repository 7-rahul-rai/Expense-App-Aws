const User = require("../models/user");
const Expense = require("../models/expense");
const GENERATEDREPORTS = require("../models/generatedreports");
const sequelize = require("../util/db");

const AWS =require('aws-sdk');
// const UserServices = require('../services/userservices')
// const S3services = require('../services/s3services')

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

exports.downloadrep = async(req, res) => {
  const t = await sequelize.transaction();
  try {
    const exp = await req.user.getExpenses();
    const stringexp = JSON.stringify(exp);
    const userId = req.user.id;
    const filename = "Expense" + userId + "/" + new Date() + ".txt";
    const fileURl = await uploadToS3(stringexp, filename);
    await GENERATEDREPORTS.create({
      userId: userId,
      url: fileURl,
      filename: filename,
    },{transaction:t});
    await t.commit()
    res.status(200).json({ fileURl, exp, success: true });  
  } catch {
    await t.rollback()
    res.status(500).json({ message: "Something went wrong " });
  }
}
async function uploadToS3(data, filename) {
  try {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
    const IAM_USER_SECRET = process.env.AWS_SECRET_KEY;
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    const response = await s3bucket.upload(params).promise();
    return response.Location;
  } catch (err){
    return err
  }
}
exports.downgenerep = async(req, res) => {
  try {
    const search = await GENERATEDREPORTS.findAll(
      { where: { userId: req.user.id },order: [["id", "DESC"]] }
    );
    res.status(200).json({ search, message: "list is here" });
  } catch {
    res.status(500).json({ message: "Something went wrong " });
  }
}
