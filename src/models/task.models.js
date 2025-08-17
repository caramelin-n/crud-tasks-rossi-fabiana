import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import user_models from "./user.models.js";

const task_models = sequelize.define("task", {
    title: { type: DataTypes.STRING(100), unique: true, allowNull:false },
    description: { type: DataTypes.STRING(100), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false }
},{ timestamps:false });

export default task_models;

task_models.belongsTo(user_models, { foreignKey: "user_id" });
user_models.hasMany(task_models, { foreignKey: "user_id", as: "author" });