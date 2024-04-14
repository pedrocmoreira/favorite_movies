import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersMoviesTable1713112098391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_movies',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'id_user', type: 'uuid' },
                { name: 'id_movie', type: 'uuid' },
                { name: 'marked_as', type: 'varchar' }
            ]
        }));

        await queryRunner.createForeignKey('users_movies', new TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('users_movies', new TableForeignKey({
            columnNames: ['id_movie'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_movies');

    }

}
