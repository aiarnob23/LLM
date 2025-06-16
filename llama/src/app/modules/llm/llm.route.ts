import express from 'express';
import { llmaControllers } from './llm.controller';
const router = express.Router();
import multer = require('multer');


const upload = multer({ storage: multer.memoryStorage() });

router.post("/generate-groq-chat", llmaControllers.generateGroqChatController);
router.post("/upload-pdf", upload.single('pdf'), llmaControllers.handlePDFUpload);


export const llmaRoutes = router;