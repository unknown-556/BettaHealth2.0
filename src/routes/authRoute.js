import express from "express";
const router = express.Router()
import { signUp, signIn, getAllUsernames } from "../controllers/authController.js";
import { apply } from "../controllers/controller.js";
import upload from "../config/apply.js";

router.post("/register", signUp)
router.post("/login", signIn)
router.get("/usernames", getAllUsernames)

router.post("/apply", upload.single('image'), apply)


export default router