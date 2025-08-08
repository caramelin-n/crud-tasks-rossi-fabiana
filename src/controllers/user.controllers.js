import user_models from "../models/user.models.js";
import chalk from "chalk";

const isEmailUnique = async (email) => {
    const uniquemail = await user_models.findOne({ where: { name: email }});
    return uniquemail === null;
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password ){
            return res.status(400).json({ Error: "Faltan datos obligatorios." });
        }

        if(!(await isEmailUnique(email))){
            return res.status(400).json({ error: "El correo ya existe en la base de datos." });
        }
        const user = await user_models.create({ name, email, password });
        res.status(201).json(user);
        
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const getAllUsers = async (req, res) => {
    try {
        const user = await user_models.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const getUserById = async (req, res) => {
    try {
        const user = await user_models.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ Error: "El usuario no existe en la base de datos." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await user_models.findByPk(id);
        if (!name || !email || !password){
            return res.status(400).json({ error: "Faltan datos obligatorios." });
        }
        if (!(await isEmailUnique(email))){
            return res.status(400).json({ error: "El título de la tarea ya existe en la base de datos." });
        }
        if (!task){
            return res.status(404).json({ error: "La tarea no existe en la base de datos." });
        }
 
        await user_models.update(req.body, { where: { id } });
        res.status(200).json({ message: "El usuario ha sido actualizado con éxito" }, user);        
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = user_models.findByPk(id);
        if (!user){
            return res.status(404).json({ Error: "El usuario no existe en la base de datos" });
        }
        await user_models.destroy({ where: { id } });
        res.status(200).json({ message: "El usuario se eliminó con éxito." });
    } catch (error) {
        console.error(chalk.redBright("Error interno en el servidor."));
        console.log(chalk.blueBright("---------------------------------------"))
        console.error(chalk.redBright(error));
    };
};
