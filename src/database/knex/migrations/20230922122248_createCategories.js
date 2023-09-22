exports.up = knex => 
  knex.schema.createTable("categories", table => {
    table.increments("id").primary()
    table.text("name")
    table.integer("product_id").references("id").inTable("products").onDelete('CASCADE')
  })

  exports.down = knex => knex.schema.dropTable("categories")