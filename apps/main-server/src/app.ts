import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes:
import authorRouter from "./routes/author";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Newsletter API server");
});

app.use("/api/v1/author", authorRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
