import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/index.js";
import { verifyToken } from "../middleware/auth.js";

const userRoutes = express.Router();

// READ
userRoutes.get("/:id", verifyToken, getUser);
userRoutes.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
userRoutes.put("/:id/friendId", verifyToken, addRemoveFriend);


export default userRoutes;
