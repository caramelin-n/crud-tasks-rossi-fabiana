import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controllers.js";
import task_models from "../models/task.models.js";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controllers.js";
import user_models from "../models/user.models.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const user = await user_models.findAll();
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

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