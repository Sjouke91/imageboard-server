const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const jsonParser = express.json();
PORT = 4000;

app.use(jsonParser);

app.use("/user", userRouter);
app.use("/image", imageRouter);

app.listen(PORT, () => console.log("listening on port:", PORT));
