const express = require("express");
const { register, login, authme } = require("../controller/AuthController");
const {
  index,
  detail,
  detailByEmail,
  hapus,
  perbarui,
  multiPost,
} = require("../controller/UserController");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const paginationMiddleware = require("../middleware/paginationMiddleware");

const validationMiddleware = require("../middleware/ValidationMiddleware");
const { registerValidator } = require("../validator/AuthValidator");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "Ok",
    messege: "Anda Berhasil Mengakses Kami",
  });
});

// REGISTER //
router.post("/register", registerValidator, validationMiddleware, register);
// LOGIN //
router.post("/login", login);
// MULTI POST //
router.post("/users/create", multiPost);

// MENGGUNAKAN MIDDLEWARE JWT //
// router.use(jwtMiddleware);
// MENGGUNAKAN MIDDLEWARE PAGINATION
router.use(paginationMiddleware);
// AUTHME //
router.get("/authme", authme);
// GET USER ALL //
router.get("/users", index);

// GET USER DETAIL //
router.get("/users/:id", detail);
router.get("/users/email/:email", detailByEmail);

// DELETE USER //
router.delete("/users/:id", hapus);
router.put("/users/update/:id", perbarui);

module.exports = router;
