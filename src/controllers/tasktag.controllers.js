import chalk from "chalk";
import TaskModel from "../models/task.models.js";
import { TagModel } from "../models/tag.models.js";
import { TaskTagModel } from "../models/task_tag.models.js";

export const createTaskTag = async (req, res) => {
    try {
        const { task_id, tag_id } = req.body;
        if (!task_id || !tag_id){
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }
        const tag = TagModel.findByPk(tag_id);
        if (!tag){
            return res.status(404).json({ error: "No se ha encontrado la etiqueta." });
        }
        const task = TaskModel.findByPk(task_id);
        if (!task){
            return res.status(404).json({ error: "No se ha encontrado la tarea." });
        }
        const taskTag = await TaskTagModel.create({ task_id, tag_id });
        res.status(201).json(taskTag);
    } catch (error) {
        console.error(chalk.redBright("Ha ocurrido un error interno."));
        console.log(chalk.blueBright("-----------------------------------------"));
        console.error(chalk.redBright(error));
    }
};

export const getAllTaskTag = async (req, res) => {
    try {
        const taskTag = await TaskTagModel.findAll({
            include: { model: TaskModel, TagModel,
                attributes: { exclude: ["description"] }
             }
        });
    } catch (error) {
        console.error(chalk.redBright("Ha ocurrido un error interno."));
        console.log(chalk.blueBright("-----------------------------------------"));
        console.error(chalk.redBright(error));
    }
};