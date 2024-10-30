import prisma from "../db";

interface UsuarioTipo {
  usuario_tipo: string;
  parametro_edit_config: boolean;
}

interface Usuario {
  usuario_nome: string;
  usuario_login: string;
  usuario_cpf: string;
  usuario_senha: string;
  usuario_tipo_id: number;
}

class CreateUsuarioRepository {
  async criarUsuarioTipo(usuarioTipo: UsuarioTipo) {
    await prisma.usuario_Tipo.create({
      data: {
        usuario_tipo: usuarioTipo.usuario_tipo,
        parametro_edit_config: usuarioTipo.parametro_edit_config
      }
    });
  }

  async criarUsuario(usuario: Usuario) {
    await prisma.usuario.create({
      data: usuario
    });
  }

  //GET
  async pegarLoginUsuario(login: string) {
    try {
      const dbResponse = await prisma.usuario.findFirst({
        where: {
          usuario_login: login
        }
      });

      return dbResponse;
    } catch (error) {
      throw new Error("Erro no Servidor");
    }
  }

  //VERIFICACOES

  async verificarDuplicidadeUsuarioTipo(nomeUsuarioTipo: string) {
    const dbResponse = await prisma.usuario_Tipo.findMany({
      where: {
        usuario_tipo: nomeUsuarioTipo
      }
    });
    return dbResponse.length > 0;
  }

  async verificarCpfUsuarioExiste(cpf: string) {
    const dbResponse = await prisma.usuario.findFirst({
      where: {
        usuario_cpf: cpf
      }
    });
    //Retorna true se o usuário já estiver no Banco
    return dbResponse !== null;
  }

  async verificarLoginUsuarioExiste(login: string): Promise<boolean> {
    const dbResponse = await prisma.usuario.findFirst({
      where: {
        usuario_login: login
      }
    });
    //Retorna true se o usuário já estiver no Banco
    return dbResponse !== null;
  }
}

export { CreateUsuarioRepository, UsuarioTipo, Usuario };
