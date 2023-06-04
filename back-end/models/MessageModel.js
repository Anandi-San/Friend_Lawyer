import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Discussion from "./DiscussionModel.js";

const {DataTypes} = Sequelize;

const Message = db.define('message',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    pesan:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        },
    //   references: { model: "users", key: "uuid" },

    },
    discussionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        },
    //   references: { model: "discussion", key: "uuid" },
    }
},{
    freezeTableName:true
});

Users.hasMany(Message);
Discussion.hasMany(Message);
Message.belongsTo(Users, { foreignKey: "userId" });
Message.belongsTo(Discussion, { foreignKey: "discussionId" });

// await Message.sync({ force: true });
// console.log("The table for the User model was just (re)created!");
export default Message;
