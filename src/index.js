import express from "express";
import dotenv from "dotenv"
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";
import { newsRouter } from "./routes/news.route.js";
import { connectDatabase } from "./database/db.js";
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(newsRouter);
app.get("/", (req, res) => res.send("Inital Page"));


app.listen(port, () => console.log(`Server is running on port ${port}`));
connectDatabase();
