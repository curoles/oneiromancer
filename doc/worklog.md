2019-08-05 JavaScript to generate dream interpretation SQLite DB
================================================================

_Idea_: Use JavaScript as the scripting language to make the project
less platform dependent; *node* can be installed on both Linux and Windows,
node's modules platform independent, JS scripts will be platform independent.

```terminal
$ node server/db/create_dream_interp_sqlite_db.js
Create SQLITE DB: ./build/dreams_interp.sqlite
```

```terminal
$ npm start

> oneiromancer@1.0.0 start <path>\oneiromancer
> node server/js/index.js

Open SQLITE DB: ./build/dreams_interp.sqlite
Listening on port 3000
Connected to the SQLite database './build/dreams_interp.sqlite'
```

2019-07-16 Install PostgreSQL on Ubuntu
=======================================

<https://help.ubuntu.com/lts/serverguide/postgresql.html>

```terminal
$ sudo apt install postgresql
$ sudo apt install postgresql-client
$ sudo -u postgres whoami
postgres
$ sudo -u postgres psql template1
psql (10.9 (Ubuntu 10.9-0ubuntu0.18.04.1))

template1=# ALTER USER postgres with encrypted password 'curoles';
ALTER ROLE
template1=# \q
$ sudo systemctl restart postgresql.service
$ sudo apt install postgresql-doc
$ firefox /usr/share/doc/postgresql-doc-10/html/index.html &
```
