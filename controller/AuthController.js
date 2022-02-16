const UserModel = require("../models").usr;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { user } = require("pg/lib/defaults");
dotenv.config();

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
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // CEK EMAIL DULU ADAA ATAU NGGAK
    const dataUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    // CEK EMAIL DAN PASSWORD HARUS SAMA DARI DATABASE
    // CEK EMAILNYA
    if (dataUser === null) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Email Belum Terdaftar Di Data Kami",
      });
    }
    // CEK PASSWORDNYA
    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Password Tidak Sama",
      });
    }

    const token = jwt.sign(
      {
        id: dataUser.id,
        email: dataUser.email,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    return res.json({
      status: "Berhasil",
      messsege: "Anda Berhasil Login",
      token: token,
    });
  } catch (error) {}
};

const authme = async (req, res) => {
  try {
    const email = req.email;
    const dataUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    const token = jwt.sign(
      {
        id: dataUser.id,
        email: dataUser.email,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "7d",
      }
    );
    return res.send({
      status: "Berhasil",
      messege: "Berhasil Membuat Autentikasi Baru",
      token: token,
    });
  } catch (error) {}
};



module.exports = { register, login, authme };
