import express, { Request, Response } from "express";
import cors from "cors"; // Mova a importação do cors para o início
import router from "./routes";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// Middleware CORS
app.use(
  cors({
    origin: "*" // Permite acesso a qualquer domínio
  })
);

app.use(express.json()); // Middleware para JSON

// ROTAS
app.use("/api", router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


