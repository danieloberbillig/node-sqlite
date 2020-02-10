# node-sqlite

<<<<<<< HEAD
Completed "CRUD application with Express and SQlite in 10 steps"
https://blog.pagesd.info/2019/10/08/crud-with-express-sqlite-10-steps/

=======
>>>>>>> c0020c1d75f47160fcce44ff1aa36116a7148326
## Start
```
npm start
```
- `http://localhost:3000/`
- `http://localhost:3000/books`


<<<<<<< HEAD
## Dev
=======

Following "CRUD application with Express and SQlite in 10 steps"
https://blog.pagesd.info/2019/10/08/crud-with-express-sqlite-10-steps/


>>>>>>> c0020c1d75f47160fcce44ff1aa36116a7148326
```
npm install express --save
npm install sqlite3
npm install ejs
```

<<<<<<< HEAD
## General
=======
## Notes
>>>>>>> c0020c1d75f47160fcce44ff1aa36116a7148326
- database will be saved in the “data” folder, under the name “apptest.db”. It is created automatically if it does not exist yet. 
- However, it is still necessary to **create the “data” folder from Visual Code**!!
- no need for syntax `npm install --save` any more
- some examples use “body-parser” instead of `app.use(express.urlencoded({ extended: false }));`
  but this is no longer useful since version 4.1.6 of Express
<<<<<<< HEAD
=======
 

>>>>>>> c0020c1d75f47160fcce44ff1aa36116a7148326

## Express
- app.set(…) and app.use(…) to configure the server and middleware
- app.listen(port, callback) to start the server
- app.get(url, callback) to respond to GET requests
- app.post(url, callback) for POST from the input forms
- req.params.* to retrieve the named parameters from the URL (the route)
- req.body.* to access the data posted by the input form

### Views
- res.send(“text”) to return a text
- res.render(view_name, model) to return a view
- res.redirect(url) to redirect the user

### SQLite3
- new sqlite3.Database() to connect to the database (or even create it)
- db.run(sql, [params], callback) to execute update queries
- db.all(sql, [params], callback) for a SELECT query that returns multiple rows
- db.get(sql, [params], callback) for SELECT by identifier