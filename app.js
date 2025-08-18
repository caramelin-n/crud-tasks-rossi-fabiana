import express from 'express';
import db from "./src/config/db.js";
import task_models from "./src/models/task.models.js";
import user_models from "./src/models/user.models.js";
import task_routes from "./src/routes/task.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import { tag_models } from './src/models/tag.models.js';
import { person_models } from './src/models/person.models.js';
import tag_routes from "./src/routes/tag.routes.js";
import person_routes from "./src/routes/person.routes.js";

const port = 3000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(task_models, user_models, tag_models, person_models);
});

app.use('/api/tasks', task_routes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tag_routes);
app.use('/api/person', person_routes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

db();