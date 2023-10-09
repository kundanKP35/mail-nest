import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDatabase from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

connectDatabase();

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();




app.use(cors(
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use("/api/mail", templateRoutes);

app.use("/api/", mailRoutes);


  app.get("/", (req, res) => {
    res.send("Server is ready");
  });

app.use(notFound);
app.use(errorHandler);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
