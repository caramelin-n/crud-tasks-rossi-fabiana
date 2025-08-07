import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const user_models = sequelize.define("user", {
    name: { type: DataTypes.STRING, allowNull:false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

export default user_models;