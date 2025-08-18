import express from 'express';
import db from "./src/config/db.js";
import TaskModel from "./src/models/task.models.js";
import UserModel from "./src/models/user.models.js";
import TaskRoutes from "./src/routes/task.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import { TagModel } from './src/models/tag.models.js';
import { PersonModel } from './src/models/person.models.js';
import TagRoutes from "./src/routes/tag.routes.js";
import PersonRoutes from "./src/routes/person.routes.js";

const port = 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(TaskModel, UserModel, TagModel, PersonModel);
});

app.use('/api/tasks', TaskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', TagRoutes);
app.use('/api/person', PersonRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

db();