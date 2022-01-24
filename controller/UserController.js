const UserModel = require("../models").usr;

const index = async (req, res) => {
  try {
    const dataUser = await UserModel.findAll({
      attributes: ["id", "name", "email", "status", "jenisKelamin"],
    });
    console.log(dataUser);

    return res.json({
      status: "Berhasil",
      messege: "Berikut Daftar Users",
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const detail = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const dataDetail = await UserModel.findByPk(id);
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail User",
      data: dataDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const detailByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const dataDetail = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail User",
      data: dataDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const hapus = async (req, res) => {
  try {
    const id = req.params.id;
    const dataDetail = await UserModel.destroy({
      where: {
        id: id,
      },
    });
    if (dataDetail === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};
const perbarui = async (req, res) => {
  try {
    const id = req.params.id;
    const {name} = req.body;
    const dataDetail = await UserModel.findByPk(id);
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }

    await UserModel.update(
      { name: name },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

module.exports = { index, detail, detailByEmail, hapus, perbarui };
