import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createNewUser, getUser } from "./handlers/user";


const router = Router();

router.get('/user/:id', getUser);
router.post('/user', createNewUser);


export default router;
