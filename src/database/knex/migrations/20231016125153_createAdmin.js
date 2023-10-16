exports.up = knex => 
  knex.schema.createTable("admin", table => {
    table.increments("id").primary()
    table.text("name")
    table.text("email")
    table.text("password")
  } )

  exports.down = knex => knex.schema.dropTable("admin")