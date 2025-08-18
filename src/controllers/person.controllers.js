import { PersonModel } from "../models/person.models.js";
import chalk from "chalk";
import UserModel from "../models/user.models.js";

const isNameUnique = async (name) => {
    const person = await PersonModel.findOne({ where: { name: name }});
    return person === null;
};

export const createPerson = async (req, res) => {
    try {
        const { name, lastname, gender, user_id } = req.body;
        if (!name || !lastname || !gender) {
            return res.status(400).json({ error: "Faltan datos obligatorios." })
        }
        const user = await UserModel.findByPk(user_id);
        if (!user){
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        if(!(await isNameUnique(name))){
            return res.status(400).json({ error: "El nombre de la persona debe ser único." });
        }
        if (gender !== "Male" && gender !== "female"){
            return res.status(400).json({ error: "El género debe ser male o female." });
        }
        const person = await PersonModel.create({ name, lastname, gender, user_id });
        res.status(201).json(person);
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
        console.log(chalk.blueBright("--------------------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const updatePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastname, gender } = req.body;
        const person = await PersonModel.findByPk(id);
        if(!(await isNameUnique(name))){
            return res.status(400).json({ error: "El nombre de la persona debe ser único." });
        }
        if (!person){
            return res.status(404).json({ error: "La persona no existe en la base de datos." });
        }
        if (gender !== "male" && gender !== "female"){
            return res.status(400).json({ error: "El género debe ser male o female." });
        }
        await PersonModel.update(req.body, { where: { id } });
        res.status(200).json({ message: "La persona ha sido actualizada correctamente" }, person);
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
        console.log(chalk.blueBright("--------------------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const getAllPeople = async (req, res) => {
    try {
        const people = await PersonModel.findAll({
            attributes: { exclude: "user_id" },
            include: { model: UserModel,
                attributes: { exclude: ["password", "email"] }
             }
        });
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
        console.log(chalk.blueBright("--------------------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const getPersonById = async (req, res) => {
    try {
        const person = await PersonModel.findByPk(req.params.id, {
            include: { model: UserModel,
                attributes: { exclude: ["password", "email"] }
             }
        });
        if (!person){
           return res.status(404).json({ error: "La persona no ha sido encontrada en la base de datos." })
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
        console.log(chalk.blueBright("--------------------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const deletePerson = async (req, res) => {
    try {
        const { id } = req.params;
        const person = PersonModel.findByPk(id);
        if(!person){
            return res.status(404).json({ error: "La persona no existe en la base de datos." });
        }
        await PersonModel.destroy({ where: { id } });
        res.status(200).json({ message: "La tarea se eliminó con éxito." });
    } catch (error) {
        res.status(500).json({ error: "Error interno en el servidor" });
        console.log(chalk.blueBright("--------------------------------------------"));
        console.error(chalk.redBright(error));
    };
};

