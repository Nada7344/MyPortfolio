import express from 'express'
import {  getContact, updateContact ,sendContactEmail} from './contact.service.js';
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contact = await getContact();
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})


router.put('/', async (req, res, next) => {
  try {
    const contact = await updateContact(req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})

router.post('/sendEmail', async (req, res, next) => {
  try {
    const contact = await sendContactEmail(req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})

export default router;