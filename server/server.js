const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoute");
const PORT = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cookieParser());
app.use(express.json());
app.use("/api", authRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://hocalhost:${PORT}`);
});
