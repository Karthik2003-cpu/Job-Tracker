import express from 'express';
import protect from '../middleware/protect.js';
import { addJob, getAllJobs, getJob, updateJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', protect, addJob);
router.get('/', protect, getAllJobs);
router.get('/:id', protect, getJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

export default router;