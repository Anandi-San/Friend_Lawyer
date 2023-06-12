import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import FormConsultant from "./FormColsultant.js";

const {DataTypes} = Sequelize;

const Notifcation = db.define('notifcation',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    formconsultantId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }   
    },  
},{
    freezeTableName:true
});

Users.hasMany(Notifcation);
Notifcation.belongsTo(Users, { foreignKey: "userId" });
Notifcation.belongsTo(FormConsultant, { foreignKey: "formconsultantId" });

export default Notifcation;
