import express from "express";
import {login} from "../controllers/index.js"

const authRoutes = express.Router();

authRoutes.post("/login",login)

export default authRoutes;