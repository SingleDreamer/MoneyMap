const sql = require('mssql')

const config = {
    user: "sa",
    password: "MoneyMap123",
    server: "moneymap.cepa7azjnt22.us-east-2.rds.amazonaws.com", // You can use 'localhost\\instance' to connect to named instance
    database: "MoneyMapDB",
    options: {
      encrypt: true
    }
}

const pool = new sql.ConnectionPool(config);

pool.connect(err => {
  if(err != null) {
    console.log(err)
  }
})

module.exports = pool;
