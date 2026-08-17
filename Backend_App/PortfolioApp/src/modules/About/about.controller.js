import express from 'express'
import {  getAbout, updateAbout } from './about.service.js';
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const about = await getAbout();
    res.status(200).json(about);
  } catch (error) {
    next(error);
  }
})


router.put('/', async (req, res, next) => {
  try {
    const about = await updateAbout(req.body);
    res.status(200).json(about);
  } catch (error) {
    next(error);
  }
})

export default router;