"use strict";

const PORT = 8080;
const http = require('http');
const fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
const express = require('express');
var path = require('path');
const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const cache = {};
cache['currentPoints.html'] = fs.readFileSync('public/currentPoints.html');
cache['incentives.html'] = fs.readFileSync('public/incentives.html');
cache['logPoints.html'] = fs.readFileSync('public/logPoints.html');
cache['main.html'] = fs.readFileSync('public/main.html');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./SQL/SeniorProject.db', (err) =>{
  if (err){
    return console.error(err.message);
  }
  console.log('Connected to the in-disk SQLite database.');
});

app.post('/auth', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  if(username && password){
    db.get('SELECT * FROM Employees WHERE username = ? AND password = ?', [username, password], function(err, doc){
      if (doc.length !== 0){
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('public/main.html');
      } else{
        res.send('Incorrect Username and/or Password!');
      }
      res.end();
    });
  } else{
    res.send('Please enter Username and Password!');
    res.end();
  }
});

app.get('/home', function(req, res){
  if(req.session.loggedin){
    res.send('Welcome back, ' + req.session.username + '!');
  } else{
    res.send('Please login to view this page!');
  }
  res.end();
});

app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.sendfile('public/index.html');
}); 

app.listen(PORT, function () {
  console.log('Listing To Port');
});