
2019-11-08 JavaScript new ES6 features
======================================

- https://exploringjs.com/es6/ch_overviews.html
- http://es6-features.org
- Good online book, https://exploringjs.com/es6/index.html
- https://www.w3schools.com/js/js_classes.asp
- https://www.w3schools.com/js/js_mistakes.asp
- https://www.w3schools.com/js/default.asp

2019-11-05 maybe it is possible to use only SQLite at the beginning
===================================================================

- type TEXT stores text strings. It also supports different encoding like UTF-8, UTF-16 BE, or UTF-26LE.
- https://www.sqlite.org/faq.html, What is the maximum size of a VARCHAR in SQLite?
  SQLite does not enforce the length of a VARCHAR. You can declare a VARCHAR(10) and SQLite will be happy
  to store a 500-million character string there. And it will keep all 500-million characters intact.
  Your content is never truncated. SQLite understands the column type of "VARCHAR(N)" to be the same as "TEXT",
  regardless of the value of N.

2019-11-05 generate docs with JSDoc
===================================

```terminal
$ npm run generate-docs

> oneiromancer@1.0.0 generate-docs C:\Users\ilesik\prj\oneiromancer\oneiromancer
> jsdoc -c doc/jsdoc_conf.json -u doc/tutorials
```

See https://ricostacruz.com/til/typescript-jsdoc.

```terminal
$ npm install typescript --save-dev
```

Links about JSDoc:

- https://jsdoc.app/
- https://jsdoc.app/about-tutorials.html
- https://ricostacruz.com/til/typescript-jsdoc
- https://typedoc.org/
- https://blog.cloudflare.com/generating-documentation-for-typescript-projects/
- https://www.vojtechruzicka.com/documenting-angular-apps-with-typedoc-compodoc-and-angulardoc/

TODO: think about using Typescript
[Typescript with NodeJS: An Integration Guide](https://medium.com/@rossbulat/typescript-introduction-with-nodejs-c160c4362746)

2019-11-04 current plan
=======================

1. Use only Node.js packages.
2. Web UI is a dialog between user and oneiromancer bot.
3. Use [NLP.js](https://github.com/axa-group/nlp.js) to chat with a user.
   Each part of the dream is _question_ in the dialog, an _answer_ is the interpretation.
4. NLP.js `addDocument` has structure `{key,val}` where key is a phrase (ex. broken tooth)
   and val is _intent_ string. That allows simple design of the data: phrase of what user
   has seen in the dream and its meaning (NLP.js intent).
   NLP.js `addAnswer(intent:string, interpretation:string)` naturally allows quick
   interpretation.
   Thus, NLP.js will classify phrases in the user input using the metrics of how
   a phrase is close to one in the DB; it gives as a list of meanings/interpretaions.
5. At the end of the conversation, use [RosaeNLG](https://rosaenlg.org) to provide
   the complete interpretation of the dream.

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
