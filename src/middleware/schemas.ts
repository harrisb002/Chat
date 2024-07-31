import z from "zod";
import { NotificationSettings } from "@prisma/client";

// Lazy evaluates when it is needed (used for circular references)
// const PostLazy: z.ZodLazy<any> = z.lazy(() => Post);
// Used below as z.lazy(() => Post) because User has nested Post object

export const User = z.object({
  id: z.number().int().nonnegative().optional(),
  email: z.string().email(),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  verified: z.boolean(),
  notificationSettings: z.nativeEnum(NotificationSettings).array().optional(),
  posts: z.array(z.lazy(() => Post)).optional(),
  postsLiked: z.array(z.lazy(() => Post)).optional(),
  postReplies: z.array(z.lazy(() => Reply)),
});

// The user will act as a base type for the user endpoints
// Takes all the properties of User, and makes them optional
// This is needed for the Patch, as not all properties defined are required to be changed
export const UserUpdate = User.partial();

export const Post = z.object({
  id: z.number().int().nonnegative().optional(),
});

export const Reply = z.object({
  id: z.number().int().nonnegative().optional(),
});
