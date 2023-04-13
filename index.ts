import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { taskRouter } from "./src/routers/taskRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/task", taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
