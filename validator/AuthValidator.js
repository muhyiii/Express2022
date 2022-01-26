const { check } = require("express-validator");
const UserModel = require("../models").produk;

const registerValidator = [
  check("kodeProduk")
    .isLength({ min: 1, max: 6 })
    .withMessage("Kode Produk Wajib Diisi Dan Maksimal 6 Digit")
    .custom((value) => {
      return UserModel.findOne({ where: { kodeProduk: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject("Kode Produk Telah Digunakan");
          }
        }
      );
    }),
  check("namaProduk").isLength(0).withMessage("Nama Produk Wajib Diisi"),
  check("jumlah").isInt().withMessage("Harap Masukan Angka Bukan String"),
  check("hargaSatuan").isInt().withMessage("Harap Masukan Angka Bukan String"),
];

module.exports = { registerValidator };
