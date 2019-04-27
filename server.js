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
  console.log('Connected to the in-disk SQLite database.')
});

app.post('/auth', function(req, res){
  var username = request.body.username;
  var password = request.body.password;

  if(username && password){
    db.get('SELECT * FROM Employees WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
      if (results.length > 0){
        request.session.loggedin = true;
        request.session.username = username;
        Response.redirect('home');
      } else{
        Response.send('Incorrect Username and/or Password!');
      }
      Response.end();
    });
  } else{
    Response.send('Please enter Username and Password!');
    Response.end();
  }
});

app.get('/home', function(request, respone){
  if(request.session.loggedin){
    Response.send('Welcome back, ' + request.session.username + '!');
  } else{
    Response.send('Please login to view this page!');
  }
  Response.end();
});

app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.sendfile('public/index.html');
}); 

app.listen(PORT, function () {
  console.log('Listing To Port');
});