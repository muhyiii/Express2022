const UserModel = require("../models").usr;
const Identitas = require("../models").identitas;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Nilai = require("../models").nilai;

const getPagination = (page, pageSize) => {
  const limit = pageSize ? pageSize : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const index = async (req, res) => {
  try {
    let { keyword, page, pageSize, orderBy, sortBy, pageActive } = req.query;
    // const { limit, offset } = getPagination(page, pageSize);
    const dataUser = await UserModel.findAndCountAll({
      attributes: ["id", ["name", "nama"], "email", "status", "jenisKelamin"],
      where: {
        // [Op.or]: {
        //   name: name,
        //   id: 2,
        // },
        // /////////////////////
        // name: {
        //   [Op.eq]: name, //  = ARJUNA / QUERY
        // },
        // /////////////////////
        // name: {
        //   [Op.ne]: name, //  != ARJUNA / QUERY
        // },
        /////////////////////
        /// SEARCHING
        ...(keyword !== undefined && {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              jenisKelamin: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        }),
      },
      include: [
        {
          model: Identitas,
          require: true,
          as: "identitas",
          attributes: ["id", "nama", "alamat", "tempatLahir", "tanggalLahir"],
        },
        {
          model: Nilai,
          require: true,
          as: "nilai",
          attributes: ["id", "nilai"],
        },
      ],

      order: [[sortBy, orderBy]],

      // offset, //mulai dari +1
      // limit, // banyak daata
      offset: page,
      limit: pageSize,
    });
    console.log("page", page);
    console.log("pageSize", pageSize);

    return res.json({
      status: "Berhasil",
      messege: "Berikut Daftar Users",
      data: dataUser,
      pagination: {
        page: pageActive,
        nextPage: page + 1,
        previousPage: pageActive + 1,
        pageSize: pageSize,
        jumlah: dataUser.rows.length,
        total: dataUser.count,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
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
    const { name } = req.body;
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
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const authme = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const he = authorization.split(" ")[1];
    jwt.verify(he, process.env.JWT_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "Gagal",
          messege: "Token Tidak Valid",
          data: err,
        });
      } else {
        const { email } = req.body;

        const token = jwt.sign(
          {
            email: email,
          },
          process.env.JWT_ACCESS_TOKEN,
          {
            expiresIn: "60s",
          }
        );
        return res.send({
          status: "Berhasil",
          messege: "Berhasil Membuat Autentikasi Baru",
          token: token,
        });
      }
    });
  } catch (error) {}
};
async function multiPost(req, res) {
  let { payload } = req.body;
  for (i = 0; i < payload.length; i++) {
    payload[i].password = await bcrypt.hashSync(payload[i].password, 10);
  }

  try {
    // await UserModel.bulkCreate(payload);
    let countBerhasil = 0;
    let countGagal = 0;
    await Promise.all(
      payload.map(async (data) => {
        try {
          await UserModel.create(data);
          countBerhasil = countBerhasil + 1;
        } catch (error) {
          countGagal = countGagal + 1;
        }
      })
    );
    return res.status(201).json({
      status: "Berhasil",
      messege: `${countBerhasil} User Berhasil Ditambahkan Dan Jumlah User Yang Gagal Ditambahkan ${countGagal}`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
}

module.exports = { index, detail, detailByEmail, hapus, perbarui, multiPost };
