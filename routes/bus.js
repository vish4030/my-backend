import express from 'express';
import { retrieveBus, addBus } from '../controllers/bus.control.js';

const router = express.Router();

router.get('/findBus',retrieveBus)
router.post('/addBus', addBus)

export default router;