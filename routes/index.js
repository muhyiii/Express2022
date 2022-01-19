const express = require("express");
const { register } = require("../controller/AuthController");
const { check } = require("express-validator");
const UserModel = require("../models").usr;
const validationMiddleware = require("../middleware/ValidationMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "Ok",
  });
});

router.post(
  "/register",
  check("name").isLength({ min: 1 }).withMessage("Nama Wajib Diisi"),
  check("email")
    .isEmail()
    .withMessage("Gunakan Email Yang Valid")
    .custom((value) => {
      return UserModel.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("Email Telah Digunakan");
        }
      });
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Minimal 8 Karakter"),
  check("status")
    .isIn(["active", "nonActive"])
    .withMessage("Masukan Status Anda Dengan Benar"),
  check("jenisKelamin")
    .isIn(["laki-laki", "perempuan"])
    .withMessage("Masukan Jenis Kelamin Anda Dengan Benar"),

  validationMiddleware,
  register
);

module.exports = router;
