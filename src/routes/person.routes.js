import { Router } from "express";
import { getAllPeople,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
 } from "../controllers/person.controllers.js";
import { PersonModel } from "../models/person.models.js";

const router = Router();

router.get('/people', async (req, res) => {
    try {
        const person = await PersonModel.findAll();
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