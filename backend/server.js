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
    const defaultRoleId = 2;
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


app.get("/request", function (req, res) {
    connection.query("SELECT * FROM request", function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})


app.get("/request/:id", function (req, res) {
    const userID = [res.body.id_user]
    connection.query("SELECT * FROM user WHERE id_user =?", [userID] , function (err, results) {
        if (err) {
            console.log(err);

        } else {
            console.log(results);
            res.json(results)
        }
    })
})





app.listen(3000, function () { console.log("Сервер запущен по адресу http://localhost:3000") });