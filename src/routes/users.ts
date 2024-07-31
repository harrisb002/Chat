import express from "express";
import * as usersController from "../controllers/users.js";
import * as validation from "../middleware/validation.js";

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", validation.createUser, usersController.createUser);
router.patch("/", validation.updateUser, usersController.updateUser);

router.get("/:id", usersController.getUser);
router.delete("/", usersController.deleteUser);

router.get("/:id/posts", usersController.getUserPosts);
router.get("/:id/posts-liked", usersController.getUserLikedPosts);
router.get("/:id/posts-followed", usersController.getUserFollowedPosts);

export default router;
