const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 5000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/api/students", (req, res) => {
  const students = [
    {
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

const pets = [
  {
    id: 1,
    name: "gary"
  },
  {
    id: 2,
    name: "jerry"
  },
  {
    id: 3,
    name: "tom"
  }
];
app.get("/api/pets", (req, res) => {
  // res.send(console.log(req.params));
  // res.send(pets);
});

app.get("/api/pets/:id", (req, res) => {
  pets.forEach(pet =>
    res.send(
      pet.id === parseInt(req.params.id)
        ? pet.id + ", " + pet.name
        : req.params.id + " not found"
    )
  );
});

// Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
