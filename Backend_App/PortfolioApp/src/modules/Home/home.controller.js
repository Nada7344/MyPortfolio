import express from 'express'
import { getHome, getResumeForDownload, updateHome, uploadProfileImage, uploadResume } from './home.service.js';
import { localFileUpload, fileValidation } from '../../common/utils/index.js';
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const home = await getHome();
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
})

router.put('/', async (req, res, next) => {
  try {
    const home = await updateHome(req.body);
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
})

router.put(
  '/upload/profile-image',
  localFileUpload({ customPath: 'home/profile', validation: fileValidation.image, maxSize: 5 }).single('profileImage'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const home = await uploadProfileImage(req.file.finalPath);
      res.status(200).json(home);
    } catch (error) {
      next(error);
    }
  }
)

router.put(
  '/upload/resume',
  localFileUpload({ customPath: 'home/resume', validation: fileValidation.pdf, maxSize: 5 }).single('resume'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const home = await uploadResume(req.file.finalPath);
      res.status(200).json(home);
    } catch (error) {
      next(error);
    }
  }
)


router.get('/download/resume', async (req, res, next) => {

  try {

    const filePath = await getResumeForDownload();

    res.download(
      filePath,
      'Nada-Mahmoud-Resume.pdf',
      (error) => {

        if (error) {
          next(error);
        }

      }
    );

  } catch (error) {
    next(error);
  }

});

export default router;