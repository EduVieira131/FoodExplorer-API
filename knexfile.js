const path = require('path')

module.exports = { 
  development: {
    client: "sqlite3",
    conection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    useNullAsDefault: true
  }
}