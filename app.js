import express from 'express';
import db from "./src/config/db.js";
import "./src/models/task.models.js";
import "./src/models/user.models.js";
import TaskRoutes from "./src/routes/task.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import './src/models/tag.models.js';
import './src/models/person.models.js';
import TagRoutes from "./src/routes/tag.routes.js";
import PersonRoutes from "./src/routes/person.routes.js";
import './src/models/task_tag.models.js';
import TaskTagRoutes from './src/routes/taskTag.routes.js';

const port = 3000;
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send(TaskModel, UserModel, TagModel, PersonModel, TaskTag);
// });

app.use('/api/tasks', TaskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', TagRoutes);
app.use('/api/person', PersonRoutes);
app.use('/api/tasktag', TaskTagRoutes);

app.listen(port,async () => {
  await db();
  console.log(`Servidor corriendo en el puerto ${port}`);
});
