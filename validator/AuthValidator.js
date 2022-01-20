const { check } = require("express-validator");
const UserModel = require("../models").usr;

const registerValidator = [
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
];


module.exports={registerValidator}