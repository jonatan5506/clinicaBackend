import { Router } from "express";
import usuariosRoutes from "./usuariosRoutes";

const router = Router();

//ROTAS DE USUÁRIOS
router.use('/usuarios', usuariosRoutes);

export default router;