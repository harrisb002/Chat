import express from "express";
import * as usersController from "../controllers/users.js";
// import validation from "../middleware/validation.js";

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);

router.get("/:id", usersController.getUser);
router.patch("/", usersController.updateUser);
router.delete("/", usersController.deleteUser);

router.get("/:id/posts", usersController.getUserPosts);
router.get("/:id/posts-liked", usersController.getUserLikedPosts);
router.get("/:id/posts-followed", usersController.getUserFollowedPosts);

export default router;
