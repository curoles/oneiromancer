const express = require("express");
const app     = express()
const port    = 3000
const http    = require('http').createServer(app);
const io      = require('socket.io')(http);

// Define routes
app.use(express.static("public"));

// Default response for any other request
//app.use(function(req, res){
//    res.status(404);
//});

// Start the server
/*XXX not app*/http.listen(port, /*hostname,*/ function() {
  console.log(`Listening on port ${port}`);
});

io.on('connection', function(socket) {
  console.log('a user connected');
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
    var sql = "SELECT * FROM TAtom WHERE name = ?"
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

app.get("/api/find_atoms/:name", (req, res, next) => {
    const sql = "SELECT * FROM TAtom WHERE name LIKE ?";
    var params = [req.params.name + '%']
    dream_db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows, "key":req.params.name
        })
      });
});
