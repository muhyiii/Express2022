const express = require("express");
const { register } = require("../controller/AuthController");
const { index, detail } = require("../controller/UserController");

const validationMiddleware = require("../middleware/ValidationMiddleware");
const { registerValidator } = require("../validator/AuthValidator");
const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    status: "Ok",
  });
});

// GET USER ALL //
router.get('/users',index)

// GET USER DETAIL // 
router.get('/users/:id',detail)

// REGISTER //
router.post("/register", registerValidator, validationMiddleware, register);








module.exports = router;
