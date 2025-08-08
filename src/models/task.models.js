import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const task_models = sequelize.define("task", {
    title: { type: DataTypes.STRING(100), unique: true, allowNull:false },
    description: { type: DataTypes.STRING(100), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false }
});

export default task_models;
