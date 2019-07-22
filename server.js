const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 5000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/api/students", (req, res) => {
  const students = [{
      id: 1,
      firstName: "Captain",
      lastName: "Fancy"
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Buttercup"
    },
    {
      id: 1,
      firstName: "Dusty",
      lastName: "Trail"
    }
  ];
  res.send(students);
});

// Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});