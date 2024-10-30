import {
  CreateUsuarioRepository,
  UsuarioTipo,
  Usuario
} from "../repositories/usuarioRepository";
import { cpf } from "cpf-cnpj-validator";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class CreateUsuarioService {
  async logarUsuario(usuarioLogin: string, senha: string) {
    const usuarioRepository = new CreateUsuarioRepository();
    const loginUsuarioExiste = await usuarioRepository.verificarLoginUsuarioExiste(
      usuarioLogin
    );

    if (!loginUsuarioExiste) {
      throw new Error("Login não cadastrado!");
    }

    const dbUsuario = await usuarioRepository.pegarLoginUsuario(usuarioLogin);

    if (!dbUsuario) {
      throw new Error("Usuário não encontrado!");
    }

    const senhaVerificada = await compare(senha, dbUsuario!.usuario_senha);

    if (!senhaVerificada) {
      throw new Error("Login ou Senha inválidos!");
    }

    // Gerar token
    const chaveSecreta = process.env.SECRET_KEY;
    const token = sign(
      {
        usuarioNome: dbUsuario?.usuario_nome,
        usuarioLogin: dbUsuario?.usuario_login,
        usuarioTipoId: dbUsuario?.usuario_tipo_id
      },
      chaveSecreta!,
      {
        expiresIn: "8h"
      }
    );

    return {
      usuarioNome: dbUsuario?.usuario_nome,
      usuarioLogin: dbUsuario?.usuario_login,
      usuarioTipoId: dbUsuario?.usuario_tipo_id,
      token: token
    };
  }

  async criarUsuarioTipo(usuarioTipo: UsuarioTipo) {
    const usuarioRepository = new CreateUsuarioRepository();

    const usuarioTipoExiste = await usuarioRepository.verificarDuplicidadeUsuarioTipo(
      usuarioTipo.usuario_tipo
    );

    if (usuarioTipoExiste) {
      throw new Error("Tipo de Usuário já existe");
    }

    await usuarioRepository.criarUsuarioTipo(usuarioTipo);
  }

  async criarUsuario(usuario: Usuario) {
    const usuarioRepository = new CreateUsuarioRepository();
    const loginUsuarioExiste = await usuarioRepository.verificarLoginUsuarioExiste(
      usuario.usuario_login
    );

    if (loginUsuarioExiste) {
      throw new Error("Login do usuário já está em uso!");
    }

    const usuarioCpfExiste = await usuarioRepository.verificarCpfUsuarioExiste(
      usuario.usuario_cpf
    );

    if (usuarioCpfExiste) {
      throw new Error("Cpf já cadastrado!");
    }

    if (!cpf.isValid(usuario.usuario_cpf)) {
      throw new Error("Cpf inválido!");
    }

    usuario.usuario_senha = await hash(usuario.usuario_senha, 8);
    await usuarioRepository.criarUsuario(usuario);
  }
}

export { CreateUsuarioService };
