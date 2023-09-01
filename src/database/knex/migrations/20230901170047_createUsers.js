exports.up = knex => 
  knex.schema.createTable("users", table => {
    table.increments("id").primary()
    table.text("name")
    table.text("email")
    table.text("password")
    table.text("is_admin")
  } )

  exports.down = knex => knex.schema.dropTable("users")