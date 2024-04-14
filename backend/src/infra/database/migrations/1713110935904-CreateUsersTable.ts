import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1713110935904 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar' },
                { name: 'email', type: 'varchar', isUnique: true },
                { name: 'password', type: 'varchar' },
                { name: 'created_at', type: 'timestamp', default: 'NOW()', },
                { name: 'updated_at', type: 'timestamp', default: 'NOW()', }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
