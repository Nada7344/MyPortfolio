import express from 'express'
import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
  restoreEducation,
} from './education.service.js';

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const items = await getAllEducation();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await getEducationById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const item = await createEducation(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const item = await updateEducation(req.params.id, req.body);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteEducation(req.params.id);
    res.status(200).json({ message: 'Education item deleted successfully' });
  } catch (error) {
    next(error);
  }
})





router.patch('/:id/restore', async (req, res, next) => {
  try {
    const item = await restoreEducation(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
})

export default router;