import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedAdminAccessScope1665292748450 implements MigrationInterface {
  name = 'AddedAdminAccessScope1665292748450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope" DROP CONSTRAINT "FK_e507f0edbfbe11f2552fe977fc3"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_e507f0edbfbe11f2552fe977fc"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_25a021e06c12cff03ca9414964"
    `);
    await queryRunner.query(`
      ALTER TYPE "public"."access_scope_type_enum"
      RENAME TO "access_scope_type_enum_old"
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."access_scope_type_enum" AS ENUM('superAdmin', 'admin')
    `);
    await queryRunner.query(`
      ALTER TABLE "access_scope"
      ALTER COLUMN "type" TYPE "public"."access_scope_type_enum" USING "type"::"text"::"public"."access_scope_type_enum"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."access_scope_type_enum_old"
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_e507f0edbfbe11f2552fe977fc" ON "user_to_access_scope" ("user_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_25a021e06c12cff03ca9414964" ON "user_to_access_scope" ("access_scope_id")
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope"
      ADD CONSTRAINT "FK_e507f0edbfbe11f2552fe977fc3" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope" DROP CONSTRAINT "FK_e507f0edbfbe11f2552fe977fc3"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_25a021e06c12cff03ca9414964"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_e507f0edbfbe11f2552fe977fc"
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."access_scope_type_enum_old" AS ENUM('superAdmin')
    `);
    await queryRunner.query(`
      ALTER TABLE "access_scope"
      ALTER COLUMN "type" TYPE "public"."access_scope_type_enum_old" USING "type"::"text"::"public"."access_scope_type_enum_old"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."access_scope_type_enum"
    `);
    await queryRunner.query(`
      ALTER TYPE "public"."access_scope_type_enum_old"
      RENAME TO "access_scope_type_enum"
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_25a021e06c12cff03ca9414964" ON "user_to_access_scope" ("access_scope_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_e507f0edbfbe11f2552fe977fc" ON "user_to_access_scope" ("user_id")
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_access_scope"
      ADD CONSTRAINT "FK_e507f0edbfbe11f2552fe977fc3" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }
}
