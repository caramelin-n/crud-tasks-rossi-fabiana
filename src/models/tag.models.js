import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import task_models from "./task.models.js";

export const tag_models = sequelize.define("tag", {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(100) },
});

task_models.belongsToMany(tag_models, { through: "task_tags", foreignKey: "task_id" });
tag_models.belongsToMany(task_models, { through: "task_tags", foreignKey: "task_id" });