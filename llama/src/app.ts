import express, { Application, Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { llmaRoutes } from "./app/modules/llm/llm.route";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.use("/api/llma", llmaRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    statusCode: 200,
    response: "Llama practise server is running.....",
  });
});

export default app;
