import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createNewUser, getUser } from "./handlers/user";
import { getDiaryEtries } from "./handlers/notes";


const router = Router();

router.get('/user/:id', getUser);
router.post('/user', createNewUser);
router.get('/notes', getDiaryEtries);


export default router;
