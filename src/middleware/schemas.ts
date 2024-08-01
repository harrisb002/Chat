import z from "zod";
import { NotificationSettings, Roles } from "@prisma/client";
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
  name: z.string().max(50, "at most 50 chars"),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  verified: z.boolean().optional(),
  password: z.string(),
  roles: z.nativeEnum(Roles).array().optional(),
  notificationSettings: z.nativeEnum(NotificationSettings).array().optional(),
  posts: z.array(postLazy).optional(),
  postsLiked: z.array(postLazy).optional(),
  postReplies: z.array(z.lazy(() => Reply)).optional(),
});

function containsNumber(value: string): boolean {
  return /\d/.test(value);
}

function containsSpecial(value: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
}

export const Account = User.pick({
  username: true,
  email: true,
})
  .extend({
    password: z
      .string()
      .min(8, "at least 8")
      .refine(containsNumber, "Must contain atleast 1 number")
      .refine(containsSpecial, "must contain atleast one special character"),
  })
  .strict();

export const Login = User.pick({
  username: true,
  password: true,
}).strict();

export const UserUpdate = User.partial().omit({ roles: true }).strict();

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
