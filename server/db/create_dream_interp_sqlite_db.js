const facts = require('./dream_interp_data.js')

const DB_FILE = './build/dreams_interp.sqlite'
console.log(`Create SQLITE DB: ${DB_FILE}`)

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DB_FILE);

db.serialize(function() {

  db.run(
    `CREATE TABLE IF NOT EXISTS TAtom (
       id   INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT    NOT NULL UNIQUE
     );`);

  db.run(
    `CREATE TABLE IF NOT EXISTS TFact (
       id    INTEGER PRIMARY KEY AUTOINCREMENT,
       atom1 INTEGER,
       atom2 INTEGER,
       FOREIGN KEY (atom1) REFERENCES TAtom(id)
     );`);

  for (fact of facts) {
      let atom1 = fact[0];
      let atom2 = fact[1];
      let intr  = fact[2];
      let desc  = fact[3];
  
      db.run(`INSERT OR IGNORE INTO TAtom (name) VALUES ('${atom1}');`);
  }

  db.run(
    `PRAGMA query_only = true;
     PRAGMA synchronous = OFF;
     PRAGMA journal_mode = MEMORY;`
  );

  // http://www.sqlitetutorial.net/sqlite-nodejs/query/
  console.log('List of atoms:');
  db.all(`SELECT * FROM TAtom`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });

});

db.close()
