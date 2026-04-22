
import mysql from "mysql2"

 export  const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "v4",
  password: "dasha1604"
});

  
// export const connection = mysql.createConnection({
//     host: "172.17.1.8",
//     user: "root",
//     database: "ef_pizza",
//     password: "1234"
// })
