import express from "express";
import patternRoutes from "./routes/patternRoutes.js"
import { prisma } from './lib/prisma.js'

const app = express();
app.use(express.json())
app.get("/", (req, res) => res.send("API running"));

app.use("/pattern", patternRoutes)

app.listen(3000, () => console.log("Server running on port 3000"));
