const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
PORT = 4000;

app.use("/user", userRouter);
app.use("/image", imageRouter);

app.listen(PORT, () => console.log("listening on port:", PORT));
