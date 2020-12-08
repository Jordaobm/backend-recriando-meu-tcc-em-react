import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToProducts1607397299824 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.addColumn('products', new TableColumn({
      name: 'measure',
      type: 'varchar',
      isNullable: true,
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'category')

    await queryRunner.dropColumn('products', 'measure')
  }

}
