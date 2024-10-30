-- CreateTable
CREATE TABLE `usuario` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_nome` VARCHAR(191) NOT NULL,
    `usuario_login` VARCHAR(191) NOT NULL,
    `usuario_cpf` VARCHAR(191) NOT NULL,
    `usuario_senha` VARCHAR(191) NOT NULL,
    `usuario_tipo_id` INTEGER NOT NULL,

    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_tipo` (
    `usuario_tipo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_tipo` VARCHAR(191) NOT NULL,
    `parametro_edit_config` BOOLEAN NOT NULL,

    PRIMARY KEY (`usuario_tipo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_usuario_tipo_id_fkey` FOREIGN KEY (`usuario_tipo_id`) REFERENCES `usuario_tipo`(`usuario_tipo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
