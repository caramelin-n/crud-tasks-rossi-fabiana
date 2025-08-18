import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const TagModel = sequelize.define("tag", {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(100) },
},{
    timestamps:false
});