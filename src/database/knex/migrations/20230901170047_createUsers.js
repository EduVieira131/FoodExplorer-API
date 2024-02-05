exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("name");
    table.text("email");
    table.text("password");
    table
      .enum("role", ["admin", "customer"], {
        useNative: true,
        enumName: "roles",
      })
      .notNullable()
      .default("customer");
  });

exports.down = (knex) => knex.schema.dropTable("users");
