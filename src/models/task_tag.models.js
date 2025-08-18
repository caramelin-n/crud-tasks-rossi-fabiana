// import { sequelize } from "../config/database.js";
import sequelize from "../config/database.js";

import { DataTypes } from "sequelize";
import { tag_models } from "./tag.models.js";
import task_models from "./task.models.js";
// import { task_models } from "./task.models.js";
// import { tag_models } from "./tag.models.js";

export const task_tag = sequelize.define(
    'task_tag', {
        'id': { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        }
    }, {
        timestamps: false
    }
);

task_models.belongsToMany(tag_models, { through: "task_tags", foreignKey: "task_id", as: "task" });
tag_models.belongsToMany(task_models, { through: "task_tags", foreignKey: "tag_id", as: "tag" });