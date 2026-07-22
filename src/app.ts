import "dotenv/config";
import express from "express";
import mainRouter from "./routes/index.routes";
import prisma from "./config/db";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", mainRouter);

async function start() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
  }
}

start();
