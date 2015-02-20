Express Rest API
================

Single Resource Express REST api with Mongodb


Installation
------------
Navigate to the root of your project directory:
<br>
<br>
Get dependencies:
```
$ npm install
```
<br>
Initalize Mongodb:
```
$ mongod dbpath=./db --smallfiles
```

Start Mongodb:
```
$ mongo <Optinaly include database name here to manually explore data>
```
<br>
Start server: (in new terminal window)
```
$ node server.js
```


Usage
-----
To make a GET request to the server:
```
$ superagent localhost:3000/api/v1/units get
```
To make a POST request to the server:
```
$ superagent localhost:3000/api/v1/units post <JSON object ~ Unit.js schema>
```
To make a PUT request to the server:
```
$ superagent localhost:3000/api/v1/units/<Valid unit _id> put <JSON ~ Unit.js>
```
To make a DELETE request to the server:
```
$ superagent localhost:3000/api/v1/units/<Valid unit _id> delete
```
