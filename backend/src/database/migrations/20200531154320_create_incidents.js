
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('protocol').notNullable();
        table.decimal('value').notNullable();
        
        table.string('users_cpf').notNullable();

        table.foreign('users_cpf').references('cpf').inTable('users');    
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('incidents');
  };
  