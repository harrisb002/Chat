import express from "express";

import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import repliesRouter from "./routes/replies.js";

import logging from "./middleware/logging.js";
import errors from "./middleware/errors.js";
import xss from "./middleware/xss.js";
import notFound from "./middleware/notFound.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(xss);
app.use(logging.logRequest);

app.get("/", (req, res) => {
  res.json({ message: "hello!" });
});

//default to no auth to check db connection easily
//visit /v1/posts for example
//uncomment to enable auth
//app.use(authenticated);

// Definining versioning to prefix the route
app.use("/v1/users", usersRouter);
app.use("/v1/posts", postsRouter);
app.use("/v1/replies", repliesRouter);
app.use(errors.errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}.`);
});
