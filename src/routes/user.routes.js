import { Router } from "express";
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

export default router;