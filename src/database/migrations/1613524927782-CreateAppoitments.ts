import { MigrationInterface, QueryRunner, Table } from "typeorm";

/**
 *  so é possivel alterar migrations que ainda estao na minha maquina,
 *  caso ela ja esteja em um sustem tema de vercionameno (git) é obrigatorio
 *  criar uma nova migration com alteracoe especificas na tabela em questao
 *  ex: mudar o tipo de um campo de varchar pra int
 * */

export class CreateAppoitments1613524927782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
