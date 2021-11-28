
exports.up = function(knex) {
    return knex.schema.createTable('users-adm', function (table) {
        table.string('name').notNullable();
        table.string('cpf').primary();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('senha', 8).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users-adm');
};
