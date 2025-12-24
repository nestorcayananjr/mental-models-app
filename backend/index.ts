import express from "express";
import mentalModelRouter from "./routes/mentalModelRoutes.ts"
const app = express();
app.get("/", (req, res) => res.send("API running"));

app.use("/mentalModel", mentalModelRouter)

app.listen(3000, () => console.log("Server running on port 3000"));
