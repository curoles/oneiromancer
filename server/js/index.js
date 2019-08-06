const express = require("express");
const app = express()
const port = 3000

// Define routes
app.use(express.static("public"));

// Default response for any other request
//app.use(function(req, res){
//    res.status(404);
//});

// Start the server
app.listen(port, /*hostname,*/ function() {
  console.log(`Listening on port ${port}`);
});

var dream_db = require('./dream_interp_db.js')

app.get("/api/atoms", (req, res, next) => {
    const sql = 'SELECT * FROM TAtom'
    var params = []
    dream_db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

//https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

app.get("/api/atoms/:name", (req, res, next) => {
    var sql = "select * from TAtom where name = ?"
    var params = [req.params.name]
    dream_db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});
