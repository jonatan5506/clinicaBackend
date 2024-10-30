import { Router } from "express";
const router = Router();
import { CreateUsuarioController } from "../controllers/usuarioController";
const usuarioController = new CreateUsuarioController();
import { verificacaoToken } from "../middleware/verificacaoMiddleware";

router.post('/criarUsuarioTipo',usuarioController.criarUsuarioTipo);
router.post('/criarUsuario',verificacaoToken, usuarioController.criarUsuario);
router.post('/login',usuarioController.logarUsuario);

export default router;