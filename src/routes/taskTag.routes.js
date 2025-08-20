import { Router } from "express";
import { getAllTaskTag,
    createTaskTag
 } from "../controllers/tasktag.controllers.js";

const TagTaskrouter = Router();

TagTaskrouter.get('/', getAllTaskTag);

TagTaskrouter.post('/', createTaskTag);

export default TagTaskrouter;