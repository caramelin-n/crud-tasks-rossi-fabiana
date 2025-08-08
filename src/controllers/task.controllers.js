import task_models from "../models/task.models.js";
import chalk from "chalk";

const isNameUnique = async (title) => {
    const tasks = await task_models.findOne({ where: { title: title }});
    return tasks === null;
}

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete } = req.body;
        if(!title || !description || !isComplete ){
            return res.status(400).json({ Error: "Faltan datos obligatorios." });
        }

        if(!(await isNameUnique(title))){
            return res.status(400).json({ error: "El nombre de la tarea ya existe en la base de datos." });
        }
        if (isComplete !== true && isComplete !== false){
            return res.status(400).json({ error: "El estado de la tarea sólo puede ser un valor booleano (true o false)" });
        }
        const task = await task_models.create({ title, description, isComplete });
        res.status(201).json(task);
        
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const getAllTasks = async (req, res) => {
    try {
        const task = await task_models.findAll();
        res.status(200).json(task);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const getTaskById = async (req, res) => {
    try {
        const task = await task_models.findByPk(req.params.id);
        if(!task){
            return res.status(404).json({ Error: "La tarea no existe en la base de datos." });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;

        const task = await task_models.findByPk(id);
        if (!title || !description || !isComplete){
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }
        if (!(await isNameUnique(title))){
            return res.status(400).json({ error: "El título de la tarea ya existe en la base de datos." });
        }
        if (!task){
            return res.status(404).json({ error: "La tarea no existe en la base de datos." });
        }
        if (isComplete !== true && isComplete !== false){
            return res.status(400).json({ error: "El estado de la tarea sólo puede ser un valor booleano (true o false)" });
        }
 
        await task_models.update(req.body, { where: { id } });
        res.status(200).json({ message: "La tarea ha sido actualizada con éxito" }, task);        
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = task_models.findByPk(id);
        if (!task){
            return res.status(404).json({ Error: "La tarea no existe en la base de datos" });
        }
        await task_models.destroy({ where: { id } });
        res.status(200).json({ message: "La tarea se eliminó con éxito." });
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
