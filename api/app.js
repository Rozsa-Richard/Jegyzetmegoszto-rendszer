import express from "express";
import cors from "cors";
import noteRouter from "./routers/noteRouter.js";
import userRouter from "./routers/userRouter.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/notes",noteRouter);

app.use("/api/users",userRouter);

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});