import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class StopsTable1789024659356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stops',
        schema: 'shipments_schema',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'shipment_id',
            type: 'uuid',
          },
          {
            name: 'sequence',
            type: 'int',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['Pickup', 'Delivery'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['In Transit', 'Arrived', 'Departed'],
            default: "'In Transit'",
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'shipments_schema.stops',
      new TableForeignKey({
        columnNames: ['shipment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shipments_schema.shipments',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'shipments_schema.stops',
      'FK_stops_shipment_id',
    );
    await queryRunner.dropTable('shipments_schema.stops');
  }
}
