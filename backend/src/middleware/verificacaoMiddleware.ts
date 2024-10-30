//Acionada antes da Função do Controller
import { Request,Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verificacaoToken = (req:Request, res:Response, next:NextFunction) => {
    const tokenAcesso = req.headers.authorization;

    if (!tokenAcesso) {
        res.status(401).json({message:"Usuário não autorizado!"});
    }

    //Exclui o nome Berar do Token 
    const token = tokenAcesso?.split(" ")[1]
    try {
        const chaveSecreta = process.env.SECRET_KEY;
        const dadosToken = verify(token!,chaveSecreta!);
        next();
    } catch (error) {
        res.status(500).json({message:"Usuário não autorizado! - Token!"});
    }

}