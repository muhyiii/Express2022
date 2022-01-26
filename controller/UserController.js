const UserModel = require("../models").produk;

const index = async (req, res) => {
  try {
    const dataUser = await UserModel.findAll({
      attributes: ["id", "kodeProduk", "namaProduk", "jumlah", "hargaSatuan", ],
    });
    console.log(dataUser);

    return res.json({
      status: "Berhasil",
      messege: "Berikut Daftar Produk",
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
        messege: "Data Produk Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail Produk",
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

const detailByNama = async (req, res) => {
  try {
    const namaProduk = req.params.namaProduk;
    const dataDetail = await UserModel.findOne({
      where: {
        namaProduk: namaProduk,
      },
    });
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data Produk Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Berikut Data Detail Produk",
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
        messege: "Data Produk Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Produk Berhasil Dihapus",
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
    const {jumlah,hargaSatuan} = req.body;
    const dataDetail = await UserModel.findByPk(id);
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data Produk Tidak Ditemukan",
      });
    }

    await UserModel.update(
      { jumlah, hargaSatuan,namaProduk:nama},
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

module.exports = { index, detail, detailByNama, hapus, perbarui };
