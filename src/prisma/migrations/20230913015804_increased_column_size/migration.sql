-- AlterTable
ALTER TABLE `Recipe` MODIFY `description` VARCHAR(6000) NOT NULL,
    MODIFY `procedure` VARCHAR(6000) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `description` VARCHAR(3000) NULL;
