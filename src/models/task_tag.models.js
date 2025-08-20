import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import { TagModel } from "./tag.models.js";
import TaskModel from "./task.models.js";

export const TaskTagModel = sequelize.define(
    'task_tag', {
        'id': { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        }
    }, {
        timestamps: false
    }
);



TaskModel.belongsToMany(TagModel, { through: "task_tag", foreignKey: "task_id", as: "task" });
TagModel.belongsToMany(TaskModel, { through: "task_tag", foreignKey: "tag_id", as: "tag" });
TaskTagModel.belongsTo(TaskModel, { foreignKey: "task_id", as: "task"});
TaskTagModel.belongsTo(TagModel, { foreignKey: "tag_id", as: "tag" });