import {Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const formconsultant = db.define(
  "formconsultant",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    full_name: {
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
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [3, 100],
      },
    },
    problem: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [3, 100],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    clientid: {
      type: DataTypes.INTEGER, // Updated data type to DataTypes.UUID
      allowNull: false,
      notNull: {
        msg: "client ID can't be empty",
      },
      // onUpdate: "CASCADE",
      // onDelete: "CASCADE",
    },
    lawyerid: {
      type: DataTypes.INTEGER, // Updated data type to DataTypes.UUID
      allowNull: false,
      notNull: {
        msg: "Lawyer ID can't be empty",
      },
      // onUpdate: "CASCADE",
      // onDelete: "CASCADE",
    },
  },
  {
    freezeTableName: true,
  }
);

// Users.hasMany(formconsultant, {
//   onUpdate: "CASCADE",
//   onDelete: "CASCADE",
// });

formconsultant.belongsTo(Users, {
  foreignKey: "clientid",
  as: "client",
  onUpdate: "NO ACTION",
  onDelete: "NO ACTION",
});

formconsultant.belongsTo(Users, {
  foreignKey: "lawyerid",
  as: "lawyer",
  onUpdate: "NO ACTION",
  onDelete: "NO ACTION",
});

export default formconsultant;
