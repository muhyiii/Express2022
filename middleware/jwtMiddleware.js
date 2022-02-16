const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const UserModel = require("../models").usr;

async function jwtMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: "Gagal",
      messege: "Anda Tidak Terdaftar",
    });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "Gagal",
        messege: "Token Tidak Valid",
        data: err,
      });
    } else {
      const user = await UserModel.findOne({
        where: {
          email: decoded?.email,
        },
      });
      if (!user)
        return res.status(422).json({
          status: "Gagal",
          messege: "User Telah Dihapus",
        });
      req.id = decoded?.id;
      req.email = decoded?.email;
      next();
    }
  });
}

module.exports = jwtMiddleware;
