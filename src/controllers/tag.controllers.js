import { tag_models } from "../models/tag.models";
import chalk from "chalk";
import task_models from "../models/task.models";

const isNameUnique = async (name) => {
    const tags = tag_models.findOne({ where: { name: name } });
    return tags === null;
};

export const createTag = async (req, res) => {
    try {
        const { name, description, task_id } = req.body;
        if(!name || !description){
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }
        const task = await task_models.findByPk(user_id);
        if(!task){
            return res.status(404).json({ error: "La tarea no existe en la base de datos." });
        }
        if(!(await isNameUnique(name))){
            return res.status(400).json({ error: "El nombre de la etiqueta debe ser único." })
        }
        const tag = await tag_models.create({ name, description, task_id });
        res.status(201).json(tag);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const getAllTags = async (req, res) => {
    try {
        const tag = await tag_models.findAll({
            attributes: { exclude: "task_id" },
            include: { model: task_models,
                exclude: [ "description" ]
             }
        });
        res.status(200).json(tag);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const getTagById = async (req, res) => {
    try {
        const tag = await tag_models.findByPk(req.params.id, {
            include: { model: task_models,
                exclude: [ "description" ]
             }
        });
        if (!tag){
            return res.status(404).json({ error: "La etiqueta no existe en la base de datos." });
        }
        res.status(200).json(tag);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const tag = await tag_models.findByPk(id);
        if(!(await isNameUnique(name))){
            return res.status(400).json({ error: "El título de la etiqueta ya existe en la base de datos." });
        }
        if (!tag){
            return res.status(404).json({ error: "La etiqueta no existe en la base de datos." })
        }
        await tag_models.update(req.body, { where: { id } });
        res.status(200).json({ message: "La etiqueta ha sido actualizada con éxito." }, tag);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("------------------------------"));
        console.error(chalk.redBright(error));
    }
}
export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = tag.models.findByPk(id);
        if(!tag){
            return res.status(404).json({ error: "La etiqueta no existe en la base de datos." });
        }
        await tag_models.destroy({ where: { id } });
        res.status(200).json({ message: "La etiqueta ha sido eliminada con éxito." })
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("------------------------------"));
        console.error(chalk.redBright(error));
    }
}