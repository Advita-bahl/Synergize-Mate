import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import axios from "axios";
import path from "path";

const app = express();

dotenv.config();

// middleware, express.json()-This middleware function extracts the JSON payload from the incoming request and makes it available on req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

// api's
app.use("/api/v1/user", userRoute);

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

app.listen(PORT, (err) => {
  if (err) console.log(err);

  connectDB();
  console.log(`running successfully at ${process.env.PORT}`);
});

// http://localhost:2600/
