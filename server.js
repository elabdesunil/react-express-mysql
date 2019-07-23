const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 5000;
const mysql = require('mysql')

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/employees", (req, res) => {
  mysqlConnection.query('SELECT * FROM Employee', (err, rows, field) => {
    if (!err) res.send(rows);
    else console.log(err);
  })

});

app.get('/employees/:id', (req, res) => {
  mysqlConnection.query(
    'SELECT * FROM Employee WHERE EmpID = ?',
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  )
})

app.post('/employees', (req, res) => {
  let emp = req.body;
  let sql = 'SET @EmpID = ?; SET @Name =?; SET @EmpCode =?; SET @Salary = ?;\
  CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary'

})

app.delete('/employees/:id', (req, res) => {
  mysqlConnection.query(
    'DELETE FROM Employee WHERE EmpID =?',
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send('Delete Successfully');
      else console.log(err);
    }
  )
})


// starting our Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//connect to mySQL

const mysqlConnection = mysql.createConnection({
  host: '10.9.3.218',
  user: 'TWStudent',
  password: 'TechWorks!',
  database: 'employeedb',
  multipleStatements: true
})

mysqlConnection.connect(err => {
  if (!err) console.log("DB connection succeeded");
  else {
    console.log("DB connection failed. Error:" + JSON.stringify(err, undefined, 2))
  }
})