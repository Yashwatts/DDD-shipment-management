import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShipmentSchema1789024457557 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('shipments_schema', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('shipments_schema', true);
  }
}
