import express from 'express';
import db from "./src/config/db.js";
import task_models from "./src/models/task.models.js";
import user_models from "./src/models/user.models.js";
import routes from "./src/routes/task.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const port = 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(task_models, user_models);
});

app.use('/api/tasks', routes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

db();