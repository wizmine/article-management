import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import handleValidationErrors from "./utils/handleValidationErrors";
import { articleCreateValidation, loginValidation, registerValidation } from "./validations";
import { checkAuth } from "./utils";
import { ArticleController, UserController } from "./controllers";
import { fetchRSS } from "./controllers/ArticleController";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.vdxdjs7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("db connected"))
  .catch((error) => console.log("db error", error));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/user/:id", UserController.getUserById);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/article", ArticleController.getAll);
app.post(
  "/article",
  checkAuth,
  articleCreateValidation,
  handleValidationErrors,
  ArticleController.create
);
app.delete("/article/:id", checkAuth, ArticleController.remove);
app.patch("/article", checkAuth, articleCreateValidation, ArticleController.update);

app.listen(4444, async () => {
  await fetchRSS();
  console.log("Server work");
});
