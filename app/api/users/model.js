const { DataTypes } = require('sequelize');
const { hash, compare } = require('bcryptjs');

const sequelize = require('../../database');

const User = sequelize.define(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

User.beforeCreate(async function (user) {
  user.password = await hash(user.password, 10);
});

User.prototype.verifyPassword = function (value) {
  return compare(value, this.password);
};

module.exports = User;
