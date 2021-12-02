const { default: knex } = require("knex");

exports.up = function(knex) {
    return knex.schema.createTable('schedule', function (table){
        table.increments();

        table.string('title').notNullable();
        table.string('date').notNullable();
        
        table.string('users_cpf').notNullable();

        table.foreign('users_cpf').references('cpf').inTable('users');   
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('schedule');
  };
  