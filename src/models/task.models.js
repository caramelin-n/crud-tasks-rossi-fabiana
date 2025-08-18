import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.models.js";

const TaskModel = sequelize.define("task", {
    title: { type: DataTypes.STRING(100), unique: true, allowNull:false },
    description: { type: DataTypes.STRING(100), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false }
},{ timestamps:false });

export default TaskModel;

TaskModel.belongsTo(UserModel, { foreignKey: "user_id" });
UserModel.hasMany(TaskModel, { foreignKey: "user_id", as: "author" });