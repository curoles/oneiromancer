2019-11-04 npm update
=====================

On Windows machine:

```terminal
$ npm update
+ socket.io-client@2.3.0
+ socket.io@2.3.0
added 47 packages from 28 contributors and audited 411 packages in 2.763s
```

2019-11-03 looking at simple chat app with socket.io <https://socket.io/get-started/chat>
=========================================================================================

```terminal
npm install socket.io
```

Socket.IO is composed of two parts:

 1. A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
 2. A client library that loads on the browser side: socket.io-client

2019-11-03 how to start the server
==================================

To start the server:

```terminal
$ npm start
```

The `start` command is defined in package.json file:

```terminal
$ grep start package.json
    "start": "node server/js/index.js",
```

2019-11-03 articles
===================

- [In your wildest dreams: the language and psychological features of
dreams](https://www.aclweb.org/anthology/W17-3102.pdf])
- [The interpretation of dream meaning: Resolving ambiguity using Latent Semantic Analysis in a small corpus of text](https://www.researchgate.net/publication/319986418_The_interpretation_of_dream_meaning_Resolving_ambiguity_using_Latent_Semantic_Analysis_in_a_small_corpus_of_tex)
- Book. Building Progressive Web Apps: Bringing the Power of Native to the Browser


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
