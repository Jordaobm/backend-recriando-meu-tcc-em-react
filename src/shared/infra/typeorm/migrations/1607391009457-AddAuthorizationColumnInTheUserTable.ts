import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAuthorizationColumnInTheUserTable1607391009457 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'authorization',
      type: 'varchar',
      isNullable: true,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'authorization')
  }

}
