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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const data = userModel.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if(data){
    res.json(data);
    }
    else{
        res.status(401).json({message:"invalid credentials"})
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
