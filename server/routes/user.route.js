import express from "express";
import {
  login,
  updateProfile,
  register,
  logout,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api running");
});
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
// router.route("/updateProfile").post(isAuthenticated, singleUpload, updateProfile);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);
router.route("/get").get(isAuthenticated, getAllUsers);
router.route("/get/:id").get(isAuthenticated, getUserById);

export default router;
