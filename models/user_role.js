'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.User, {foreignKey: {
        name: 'UserRoleId'
      }})
    }
  };
  User_role.init({
    role_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User_role',
  });
  return User_role;
};