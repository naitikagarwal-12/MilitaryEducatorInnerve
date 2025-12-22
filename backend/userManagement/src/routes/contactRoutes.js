import express from "express";
import { contactAdmin } from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", contactAdmin);

export default router;
