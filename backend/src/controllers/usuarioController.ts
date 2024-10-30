import { Request, Response } from "express";
import { CreateUsuarioService } from "../services/usuarioService";

class CreateUsuarioController {

    async logarUsuario(req:Request,res:Response){
        const usuarioService = new CreateUsuarioService();
        const {usuario,senha} = req.body;

        try {
            const response = await usuarioService.logarUsuario(usuario,senha);
            res.status(200).json({usuario:response});
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({message:error.message})
            }else{
                res.status(400).json({message:"Falha ao logar usuário!"})
            }
        }
    }

    async criarUsuarioTipo(req:Request,res:Response){
        const usuarioService = new CreateUsuarioService();
        const usuarioTipo = req.body;
        try {
            await usuarioService.criarUsuarioTipo(usuarioTipo)
            res.status(200).json({message:"Tipo de usuário criado com sucesso!"})
        } catch (error) {
            if(error instanceof Error){
                res.status(400).json({message:error.message})
            }else{
                res.status(400).json({message:"Falha ao criar Tipo de usuário!"})
            }
        }
    }

    async criarUsuario(req:Request, res:Response){
        const usuarioService = new CreateUsuarioService();
        const dadosUsuario = req.body;

        try {
            await usuarioService.criarUsuario(dadosUsuario);
            res.status(200).json({message:"Usuário criado com sucesso!"});
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message:error.message});
            } else {
                res.status(400).json({message:"Falha ao criar usuário!"});
            }
        }
    }
}

export { CreateUsuarioController };
