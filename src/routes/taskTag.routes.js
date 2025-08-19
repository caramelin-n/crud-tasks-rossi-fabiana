import { Router } from "express";
import { getAllTaskTag,
    createTaskTag
 } from "../controllers/tasktag.controllers.js";
import { TaskTagModel } from "../models/task_tag.models.js";

const TagTaskrouter = Router();

TagTaskrouter.get('/tasktag', async (req, res) => {
    try {
        const taskTag = await TaskTagModel.findAll();
        res.json(taskTag);
    } catch (error) {
        res.status(500).json(error);
    }
});

TagTaskrouter.post('/', createTaskTag);

export default TagTaskrouter;