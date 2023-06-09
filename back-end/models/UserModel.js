import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    specialization: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: true,
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [3, 100],
      },
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [3, 100],
      },
    },
    license: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [3, 100],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
