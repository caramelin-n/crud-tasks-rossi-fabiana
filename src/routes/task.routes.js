import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controllers.js";
import TaskModel from "../models/task.models.js";

const router = Router();

router.get('/tasks', async (req, res) => {
    try {
        const task = await TaskModel.findAll();
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/", getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;