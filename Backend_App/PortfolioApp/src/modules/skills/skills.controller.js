import express from 'express'
import {  getSkills, updateSkills } from './skills.service.js';
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const skills = await getSkills();
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
}) 

router.put('/', async (req, res, next) => {
  try {
    const skills = await updateSkills(req.body);
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
})

export default router;