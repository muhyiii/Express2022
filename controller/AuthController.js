const UserModel = require("../models").usr;
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hashSync(body.password, 10);
    const users = await UserModel.create(body);
    console.log(users);

    res.status(200).json({
      status: "Succes",
      messege: "Register Berhasil",
    });
  } catch (error) {}
};

module.exports = { register };
