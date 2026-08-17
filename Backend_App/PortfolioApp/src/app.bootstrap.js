import { port } from '../config/config.service.js'
import { globalErrorHandling } from './common/utils/index.js';
import { connectDB } from './DB/index.js'
import { resolve } from 'node:path'
import express from 'express'
import {
  homeRouter,
  aboutRouter,
  projectRouter,
  skillsRouter,
  educationRouter,
  contactRouter
} from './modules/index.js';
import cors from 'cors';



async function bootstrap() {
  const app = express()



  //convert buffer data
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:4200'
    })
  );

  app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use("/uploads", express.static(resolve("../uploads")))
  //DB
  await connectDB()

  //application routing
  app.get('/', (req, res) => res.send('Hello World!'))
  app.use('/api/home', homeRouter);
  app.use('/api/about', aboutRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/skills', skillsRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/education', educationRouter);

  //invalid routing
  app.use('{/*dummy}', (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" })
  })

  //error-handling
  app.use(globalErrorHandling)

  app.listen(port, () => console.log(` app listening on port ${port}✌️`))
}
export default bootstrap