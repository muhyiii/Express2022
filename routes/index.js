const express = require("express");
const router = express.Router();
const UserModel = require("../models").usr;
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
  res.json({
    status: "Ok",
  });
});

router.post("/register", async (req, res) => {
  try {
    let body = req.body
    body.password =  await bcrypt.hashSync(body.password,10)
    const users = await UserModel.create(body);
    console.log(users)

    res.json({
      status: "Succes",
      messege: "Register Berhasil",
    });
  } catch (error) {}
});

module.exports = router;
