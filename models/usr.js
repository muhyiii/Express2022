"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usr.hasOne(models.identitas, { as: "identitas", foreignKey: "userId" });
      usr.hasMany(models.nilai, { as: "nilai", foreignKey: "userId" });
    }
  }
  usr.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.ENUM("active", "nonActive"),
      jenisKelamin: DataTypes.ENUM("laki-laki", "perempuan"),
    },
    {
      sequelize,
      modelName: "usr",
    }
  );
  return usr;
};
