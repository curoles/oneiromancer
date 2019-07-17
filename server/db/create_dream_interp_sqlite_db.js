const DB_FILE = './build/dreams_interp.sqlite'
console.log("Create SQLITE DB: " + DB_FILE)

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DB_FILE);

db.serialize(function() {

  db.run(
    `CREATE TABLE IF NOT EXISTS TAtom (
       id   INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT
     );`);

  db.run(
    `CREATE TABLE IF NOT EXISTS TFact (
       id    INTEGER PRIMARY KEY AUTOINCREMENT,
       atom1 INTEGER,
       atom2 INTEGER
     );`);

});

const facts = [
  ['air', ['clear'], 'end_of_troubles', ''],
  ['air', ['dusty'], 'losses', ''],
];

//air(clear, end_of_troubles).

//air(dusty, losses).
//air(dusty, sickness).
//air(dusty, grief).

db.close()
