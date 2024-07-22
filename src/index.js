//require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection error:", error);
  });

/*import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error", error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error:", error);
  }
})();*/
