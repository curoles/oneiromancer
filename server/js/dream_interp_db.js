const DB_FILE = './build/dreams_interp.sqlite'
console.log(`Open SQLITE DB: ${DB_FILE}`)

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
        console.log(`Connected to the SQLite database '${DB_FILE}'`)
        db.run(
            `PRAGMA query_only = true;
             PRAGMA synchronous = OFF;
             PRAGMA journal_mode = MEMORY;`,
        (err) => {
            if (err) {
                console.error(err.message)
                throw err
            }
        });  
    }
});

module.exports = db
