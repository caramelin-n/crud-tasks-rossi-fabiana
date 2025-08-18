import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user.models.js";

export const PersonModel = sequelize.define("person",{
    name: { type: DataTypes.STRING(100), allowNull:false },
    lastname: { type: DataTypes.STRING(100), allowNull: false },
    gender: { type: DataTypes.STRING(100), allowNull: false },
}, {
    timestamps: false
});

UserModel.hasOne(PersonModel, { foreignKey: "user_id" });
PersonModel.belongsTo(UserModel, { foreignKey: "user_id" });