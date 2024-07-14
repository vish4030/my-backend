import express from 'express';
import { registerUser, userLogin } from '../controllers/user.control.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',userLogin);


export default router;