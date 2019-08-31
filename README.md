# react-express-mysql boilerplate
This is a boilerplate using React, Express and MySQl. Database connection has been set up to use the local database server, so it is not possible to produce deploy the application on Github.
The main and/or important code snippets from this project has been displayed below.

## First Part: how is server set up
### Imports
```javascript
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 5000;
const mysql = require('mysql')
```
This is how libraries or other modules are imported in Node.JS.

### Use of Middleware

```javascript
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
```

### Getting all Employees

```javascript
app.get("/employees", (req, res) => {
  mysqlConnection.query('SELECT * FROM Employee', (err, rows, field) => {
    if (!err) res.send(rows);
    else console.log(err);
  })

});
```

### Getting an Employee by id

```javascript
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
```

### Creating a new Employee Record

```javascript
app.post('/employees', (req, res) => {
  let emp = req.body;
  let sql = 'SET @EmpID = ?; SET @Name =?; SET @EmpCode =?; SET @Salary = ?;\
  CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary)';
  mysqlConnection.query(
    sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, field) => {
      if (!err) res.send('success');
      else console.log(err)
    }
  )

})
```

### Deleting an Employee

```javascript
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
```

### Starting the Server

```javascript
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```

### Establishing Connection to MySQL

```javascript
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
```
