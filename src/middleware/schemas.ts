import z from "zod";
import { NotificationSettings } from "@prisma/client";
import { validateBody } from "./validation";
import * as schemas from "./schemas.js";

const userLazy: z.ZodLazy<any> = z.lazy(() => User);
const postLazy: z.ZodLazy<any> = z.lazy(() => Post);
const replyLazy: z.ZodLazy<any> = z.lazy(() => Reply);

// Lazy evaluates when it is needed (used for circular references)
// const PostLazy: z.ZodLazy<any> = z.lazy(() => Post);
// Used below as z.lazy(() => Post) because User has nested Post object

export const User = z.object({
  id: z.number().int().nonnegative().optional(),
  email: z.string().email(),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  verified: z.boolean().optional(),
  password: z.string(),
  notificationSettings: z.nativeEnum(NotificationSettings).array().optional(),
  posts: z.array(postLazy).optional(),
  postsLiked: z.array(postLazy).optional(),
  postReplies: z.array(z.lazy(() => Reply)).optional(),
});

// The user will act as a base type for the user endpoints
// Takes all the properties of User, and makes them optional
// This is needed for the Patch, as not all properties defined are required to be changed
export const UserUpdate = User.partial();

export const Post = z.object({
  id: z.number().int().nonnegative().optional(),
  title: z.string().min(10),
  body: z.string().min(10),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.number().int().nonnegative().optional(),
  published: z.boolean().default(true),
  tags: z.string().array().optional(),
  likes: z.array(userLazy).optional(),
  author: userLazy.optional(),
  replies: z.array(replyLazy).optional(),
});

export const PostUpdate = Post.pick({
  body: true,
  title: true,
  tags: true,
  published: true,
}).strict(); // Strict makes it so you cant add any new properties to it

export const Reply = z.object({
  id: z.number().int().nonnegative().optional(),
  userId: z.number().int().nonnegative().optional(),
  postId: z.number().int().nonnegative(),
  body: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  author: userLazy.optional(),
  post: postLazy.optional(),
});
