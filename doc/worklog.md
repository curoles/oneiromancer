
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
