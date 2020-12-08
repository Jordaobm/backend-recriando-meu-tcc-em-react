import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class TransformColumnCategoryInForeignKey1607400437973 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products', new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,

      })
    );

    await queryRunner.createForeignKey(
      'products', new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        name: 'ProductsCategory',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'ProductsCategory');
    await queryRunner.dropColumn('products', 'category_id');
  }

}
