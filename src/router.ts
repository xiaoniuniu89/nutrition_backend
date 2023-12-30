import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";


const router = Router();


export default router;
