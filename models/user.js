'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User_role, {foreignKey: {
        name: 'UserRoleId'
      }})

      this.belongsTo(models.tbl_pegawai, {
        foreignKey : {
          name: 'pegawai_id'
        }
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    pegawai_id: DataTypes.INTEGER,
    UserRoleId: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};