import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createNewUser, getUser } from "./handlers/user";
import { getDiaryEntries } from "./handlers/notes";


const router = Router();

router.get('/user/:id', getUser);
router.post('/user', createNewUser);
router.get('/notes', getDiaryEntries);


export default router;
