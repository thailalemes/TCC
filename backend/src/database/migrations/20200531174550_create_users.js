
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table){

        table.string('name').notNullable();
        table.string('cpf').primary();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('endereco').notNullable();
        table.string('bairro').notNullable();
    });
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('users');
  };
