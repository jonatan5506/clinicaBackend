//TODAS AS SEEDS DO SISTEMA
import prismaClient from "../../src/db";
import bcrypt from "bcrypt";

async function seedCriarUsuarioTipo() {
  await prismaClient.usuario_Tipo.createMany({
    data: [
      {
        usuario_tipo: "administrador",
        parametro_edit_config: true
      },
      {
        usuario_tipo: "recepcionista",
        parametro_edit_config: true
      },
      {
        usuario_tipo: "medico",
        parametro_edit_config: false
      }
    ]
  });
}

async function SeedCriarUsuario() {
  const hashedPassword = await bcrypt.hash("admin", 10);

  await prismaClient.usuario.createMany({
    data: [
      {
        usuario_nome: "administrador",
        usuario_login: "admin",
        usuario_cpf: "41755544081",
        usuario_senha: hashedPassword,
        usuario_tipo_id: 1 // administrador
      }
    ]
  });
}

async function main() {
  console.log("Iniciando Seed...");
  await seedCriarUsuarioTipo();
  console.log("Tipos de usuários criados.");
  await SeedCriarUsuario();
  console.log("Usuário padrão criado.");
}

main()
  .catch(e => {
    console.error("Erro ao rodar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Desconectando Prisma...");
    await prismaClient.$disconnect();
  });

//npm run seed
