import sequelize from "./database.js";
import chalk from "chalk";

const db = async () => {
    try {
        await sequelize.authenticate();
        console.log(chalk.greenBright("La conexión a la base de datos ha sido exitosa."))
        await sequelize.sync();
    } catch (error) {
        console.error(chalk.redBright("No se pudo conectar a la base de datos."));
        console.error(chalk.blue(error));
    };
};

export default db;
