import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import user_models from "./user.models.js";

export const person_models = sequelize.define("person",{
    name: { type: DataTypes.STRING(100), allowNull:false },
    lastname: { type: DataTypes.STRING(100), allowNull: false },
    gender: { type: DataTypes.STRING(100), allowNull: false },
}, {
    timestamps: false
});

user_models.hasOne(person_models, { foreignKey: "user_id" });
person_models.belongsTo(user_models, { foreignKey: "user_id" });