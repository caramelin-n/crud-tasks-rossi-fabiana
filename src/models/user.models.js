import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const user_models = sequelize.define("user", {
    name: { type: DataTypes.STRING(100), allowNull:false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false }
}, { timestamps: false });

export default user_models;