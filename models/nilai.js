"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      nilai.belongsTo(models.usr, {
        as: "usr",
        foreignKey: "userId",
      });
    }
  }
  nilai.init(
    {
      userId: DataTypes.INTEGER,
      nilai: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "nilai",
    }
  );
  return nilai;
};
