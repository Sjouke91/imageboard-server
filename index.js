const express = require("express");
const app = express();
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const auth = require("./routers/auth");
const authMiddleware = require("./auth/middleware");
const jsonParser = express.json();
PORT = 4000;

app.use(jsonParser);

//routers
app.use("/login", auth);
app.use("/user", userRouter);
app.use("/image", authMiddleware, imageRouter);

app.listen(PORT, () => console.log("listening on port:", PORT));
