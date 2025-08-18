import { Router } from "express";
import { getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
 } from "../controllers/tag.controllers.js";
import { TagModel } from "../models/tag.models.js";

const router = Router();

router.get('/tags', async (req, res) => {
    try {
        const tag = await TagModel.findAll();
        res.json(tag);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/:id', getTagById);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;