import "dotenv/config";
import cors from "cors";
import express from "express";
import inscritosRouter from "./routes/inscritos.js";

const app = express();
const port = Number(process.env.PORT) || 3333;

const origensPermitidas = (process.env.FRONTEND_URL || "http://localhost:5500")
  .split(",")
  .map((origem) => origem.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origensPermitidas
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    nome: "TechPulse API",
    status: "online",
    documentacao: "Consulte o README.md do backend."
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    servico: "techpulse-backend"
  });
});

app.use("/api/inscritos", inscritosRouter);

app.use((_req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: "Rota não encontrada."
  });
});

app.use((error, _req, res, _next) => {
  console.error("Erro inesperado:", error);

  res.status(500).json({
    sucesso: false,
    mensagem: "Erro interno do servidor."
  });
});

app.listen(port, () => {
  console.log(`TechPulse backend disponível em http://localhost:${port}`);
});
