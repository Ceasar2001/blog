import express from 'express'
import { db } from './db.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postsRoute from './routes/posts.js';

const app = express()

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postsRoute)

app.listen(8800, () => {
    console.log("connected to backend");
})