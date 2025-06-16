import { Request, Response } from "express";
import { llmaServices } from "./llm.service";
import fs from "fs";
import pdfParse from "pdf-parse";

//chat mcj/reply
export async function generateGroqChatController(req: Request, res: Response) {
    try {
        const mcj = req.body.mcj;
    const chatCompletion = await llmaServices.getGroqChatCompletionService(mcj as string);
    res.json({ message: chatCompletion });
  } catch (error) {
    console.error("Error during Groq chat controller:", error);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
}

//file read 
export async function handlePDFUpload(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    // Instead of reading from filesystem, use the buffer directly
    const pdfBuffer = uploadedFile.buffer;

    // You need to configure multer to use memory storage
    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    console.log("Extracted text from PDF:", extractedText);

    // Process the text
    const llmaResponse = await llmaServices.getGroqFileReadService(
      extractedText
    );

    // No need for cleanup with this approach
    return res.json({ message: llmaResponse });
  } catch (error) {
    console.error("Error processing PDF upload:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to process PDF file" });
    }
  }
}

export const llmaControllers = {
    generateGroqChatController,
    handlePDFUpload,
}