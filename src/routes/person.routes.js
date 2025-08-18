import { Router } from "express";
import { getAllPeople,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
 } from "../controllers/person.controllers.js";
import { person_models } from "../models/person.models.js";

const router = Router();

router.get('/people', async (req, res) => {
    try {
        const person = await person_models.findAll();
        res.json(person);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', getPersonById);
router.post('/', createPerson);
router.put('/', updatePerson);
router.delete('/', deletePerson);

export default router;