
"use strict";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

import { connectDB } from "./config/configDb.js";
import { createUsers } from "./config/initialSetup.js";
import { passportJwtSetup } from "./auth/passport.auth.js";
import { routerApi } from "./routes/index.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());
passportJwtSetup();


app.get("/", (_req, res) => {
  res.send("¡Bienvenido a mi API REST con TypeORM!");
});

async function bootstrap() {
  try {
    await connectDB();
    await createUsers();
    routerApi(app);

    
    app.use((req, res) => {
      res.status(404).json({ message: "Ruta no encontrada", method: req.method, path: req.originalUrl });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
  } catch (err) {
    console.error("Error al iniciar la app:", err);
    process.exit(1);
  }
}

bootstrap();
export default app;

