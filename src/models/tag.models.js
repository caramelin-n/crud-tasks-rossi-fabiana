import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const tag_models = sequelize.define("tag", {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(100) },
},{
    timestamps:false
});