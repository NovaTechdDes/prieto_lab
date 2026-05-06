import express from "express";
import cors from "cors";
import { saldosRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/test", (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "Conexion Existosa API Libreria",
  });
});

app.use("/saldos", saldosRoutes);

export default app;
