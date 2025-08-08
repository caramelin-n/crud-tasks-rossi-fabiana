import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controllers.js";
import task_models from "../models/task.models.js";

const router = Router();

router.get('/tasks', async (req, res) => {
    try {
        const task = await task_models.findAll();
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;