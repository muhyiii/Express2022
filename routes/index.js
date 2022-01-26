const express = require("express");
const { register } = require("../controller/AuthController");
const { index, detail, detailByEmail, hapus, perbarui, detailByNama } = require("../controller/UserController");

const validationMiddleware = require("../middleware/ValidationMiddleware");
const { registerValidator } = require("../validator/AuthValidator");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "Ok Guys",
  });
});

// GET USER ALL //
router.get("/products", index);

// GET USER DETAIL //
router.get("/products/:id", detail);
router.get("/products/nama/:nama",detailByNama)

// DELETE USER //
router.delete("/products/:id",hapus)
router.put("/products/update/:id",perbarui)

// REGISTER //
router.post("/post-product",registerValidator,validationMiddleware, register);

module.exports = router;
