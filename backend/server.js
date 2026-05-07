import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { connection } from "./db.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())



app.get("/masters", function (req, res) {
    connection.query("SELECT * FROM master", function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})



app.post("/reg", function (req, res) {
    const defaultRoleId = 1;
    const user = [defaultRoleId, req.body.full_name, req.body.phone, req.body.login , req.body.password]
    const sql = "INSERT INTO user(id_role,full_name,phone,login, password) VALUES (?,?,?,?,?)" ;
    connection.query(sql, user, function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})


app.post("/auth", function (req, res) {
    const user = [req.body.login , req.body.password]
    const sql = "SELECT * FROM user WHERE login = ? AND password= ?"
    connection.query(sql, user, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.json(results)
        }
    })
})


app.get("/requests", function (req, res) {
    connection.query("SELECT * FROM request", function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})


app.get("/requests/:userId", function (req, res) {
    const userId = req.params.userId
    connection.query("SELECT * FROM request WHERE id_user =?", [userId] , function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})

app.post('/newRequest' , (req, res)=>{
      const { id_user, id_master, id_status, booking_datetime } = req.body  
    const sql = 'INSERT INTO request (id_user,id_master,id_status,booking_datetime) VALUES (?, ? ,?, ?)'
     const values = [id_user, id_master, id_status, booking_datetime]
     connection.query(sql, values, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.json(results)
        }
})
})


app.get("/statuses", function (req, res) {
    connection.query("SELECT * FROM status", function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})



app.get("/allRequests", function (req, res) {
    connection.query('SELECT user.full_name, user.phone, request.booking_datetime,master.name AS master_name, status.name AS status FROM request  JOIN user ON request.id_user = user.id JOIN master ON request.id_master = master.id JOIN status ON request.id_status = status.id ORDER BY status.name, request.booking_datetime DESC;', function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})





app.listen(3000, function () { console.log("Сервер запущен по адресу http://localhost:3000") });