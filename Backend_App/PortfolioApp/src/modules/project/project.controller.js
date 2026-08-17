import express from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  restoreProject,
} from './project.service.js';

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const project = await updateProject(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteProject(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
})


router.patch('/:id/restore', async (req, res, next) => {
  try {
    const project = await restoreProject(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
})

export default router;