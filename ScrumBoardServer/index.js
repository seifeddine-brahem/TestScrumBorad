const mysql = require('mysql');
const express = require('express');
var app = express();
var cors = require('cors')
const bodyparser = require('body-parser');


app.use(bodyparser.json());
app.use(cors());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ScrumBoard',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3080, () => console.log('Express server is runnig at port no : 3080'));


//Get all Cards
app.get('/Cards', (req, res) => {
    mysqlConnection.query('SELECT * FROM card', (err, rows, fields) => {
        if (!err){
            res.send(rows);
            console.log("hh\n");
        }
            
        else
            console.log(err);
    })
});

//Get an employees
app.get('/cards/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM card WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
//Update card State
app.post('/updatecards', (req, res) => {

    let {id,state} = req.body;
    if (!id || !state) {
        return res.json({
          success: false,
          error: 'INVALID INPUTS'+ req.body,
        });
      }
    var sql = "update card set state = ? where id= ?";
    mysqlConnection.query(sql, [state, id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});