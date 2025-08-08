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
router.get('/', async (req, res) => {
    try {
        const task = await task_models.findAll();
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;