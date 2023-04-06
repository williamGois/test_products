import app from "./app";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DATABASE;

mongoose
    .connect(DB);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

export { server };