const express = require('express');
const path = require("path");
const app = express();              // Creating the Express server
const port = 3000;

var sqlite3 = require('sqlite3').verbose()


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
// <--- middleware to let request.body retrieve posted values
// to retrieve data sent as “Content-Type: application/x-www-form-urlencoded
// which standard for values posted from a form
// some examples use “body-parser” module instead, but this is no longer useful since version 4.1.6 of Express





// SOME BASIC ROUTES / PLAYING WITH VIEWS
app.get("/", (req, res) => {
  // res.send("Hello world...");
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"]
  };
  res.render("data", { model: test });
});




// ---------------------------------------------------
// SQLITE3

const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});
// database will be saved in the “data” folder, under the name “apptest.db”. 
// It is created automatically if it does not exist yet. 
// However, it is still necessary to create the “data” folder from Visual Code


const sql_create = `CREATE TABLE IF NOT EXISTS Books (
                      Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                      Title VARCHAR(100) NOT NULL,
                      Author VARCHAR(100) NOT NULL,
                      Comments TEXT
                    );
                  `;

db.run(sql_create, err => {
  // .run() = executes query
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'Books' table");
});




// Database seeding
const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
                      (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
                      (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
                      (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');
                    `;

db.run(sql_insert, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of 3 books");
});
// only once: will return error if trying to seed another time due to unique identifier



app.get("/books", (req, res) => {
  const sql = "SELECT * FROM Books ORDER BY Title"
  db.all(sql, [], (err, rows) => {
    // 2nd param array with vars needed for the query. Here value “[]” because query not need a variable
    // 3rd param: callback after sql query execution: err = error-obj and ROWS = ARRAY OF ROW FROM SQL QUERY 
    if (err) {
      return console.error(err.message);
    }
    res.render("books", { model: rows });
    // res.send(rows);  // test
  });
});



// EDIT --------------------------------------------
// GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Books WHERE Book_ID = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit", { model: row });
  });
});


// POST /edit/5
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [req.body.Title, req.body.Author, req.body.Comments, id];
  const sql = "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE (Book_ID = ?)";
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});





// CREATE --------------------------------------------
// GET /create
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});


// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ?, ?)";
  const book = [req.body.Title, req.body.Author, req.body.Comments];
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});




// DELETE --------------------------------------------
// GET /delete/5
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Books WHERE Book_ID = ?";
  db.get(sql, id, (err, row) => {
    // if (err) ...
    res.render("delete", { model: row });
  });
});


// POST /delete/5
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Books WHERE Book_ID = ?";
  db.run(sql, id, err => {
    // if (err) ...
    res.redirect("/books");
  });
});


// Working snippet from other source (more simplistic but lacking important elements)
/*
var db = new sqlite3.Database(':memory:')

db.serialize(function () {
  db.run('CREATE TABLE Orders (info TEXT)')
  var stmt = db.prepare('INSERT INTO Orders VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Order ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM Orders', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()
*/

// ---------------------------------------------------



// Starting the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))