import { Router } from "express";
import { getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
 } from "../controllers/tag.controllers";
import { tag_models } from "../models/tag.models";

const router = Router();

router.get('/tags', async (req, res) => {
    try {
        const tag = await tag_models.findAll();
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