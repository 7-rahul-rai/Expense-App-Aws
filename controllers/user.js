const userModel = require("../models/user");

exports.usersnp = async (req, res) => {
  console.log("in exports poste");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const { name, email, password } = req.body;
    if (
      name.length === 0 ||
      name == null ||
      password == null ||
      email == null ||
      email.length === 0 ||
      password.length === 0
    ) {
      res.status(400).json({ err: "bad  parameters" });
    }
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      res.status(403).json({ error: "user exists" });
    } else {
      const data = await userModel.create({
        name,
        email,
        password,
      });
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.userlgn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findAll({ where: { email } });
    if (user.length > 0) {
      if (user[0].password === password) {
        console.log("logged in");
        res.status(200).json({ message: "Logged in successfully" });
      } else {
        console.log("wrong password");
        res.status(401).json({ message: "Wrong password" });
      }
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: err });
  }
};
