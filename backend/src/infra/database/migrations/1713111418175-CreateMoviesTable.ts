import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMoviesTable1713111418175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movies',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'title', type: 'varchar' },
                { name: 'overview', type: 'text' },
                { name: 'release_date', type: 'varchar' },
                { name: 'poster_path', type: 'varchar' }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies');
    }
}
