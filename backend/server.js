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



app.listen(3000, function () { console.log("Сервер запущен по адресу http://localhost:3000") });