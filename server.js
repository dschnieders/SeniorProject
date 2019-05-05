"use strict";

const PORT = 8080;
const http = require('http');
const fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
const app = express();
var jsonParser = bodyParser.json({ type: 'application/*+json' } );

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
cache['home.html'] = fs.readFileSync('public/home.html');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./SQL/SeniorProject.db', (err) =>{
  if (err){
    return console.error(err.message);
  }
  console.log('Connected to the in-disk SQLite database.');
});

/* db.serialize(function(){
  db.get('SELECT * FROM Employees WHERE username LIKE \'%dschnieders%\' AND password LIKE \'%password%\';', function (err, rows){
    console.log(err);
    console.log(rows);
  });
}); */

/* 
  Log-in function for index.html
*/
app.post('/auth', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  if(username && password){
    db.get('SELECT * FROM Employees WHERE username LIKE \'%dschnieders%\' AND password LIKE \'%password%\';', function(err, doc){
      if (doc.length !== 0){
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home.html');
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

/*
  Delete later.
*/
app.get('/home', function(req, res){
  if(req.session.loggedin){
    res.send('Welcome back, ' + req.session.username + '!');
  } else{
    res.send('Please login to view this page!');
  }
  res.end();
});

/**
 * List of update functions for the SQLite3 DB from logPoints.html.
 */
app.post('/log', function (req, res){
  if(req.body.prev_act != undefined){
  console.log(req.body.prev_act);
  }else{
    console.log('prev_act undefined');
  }
  if(req.body.well_chall != undefined){
    console.log(req.body.well_chall);
    }else{
      console.log('well_chall undefined');
    }
  if(req.body.well_wed != undefined){
  console.log(req.body.well_wed);
  }else{
    console.log('well_wed undefined');
  }
  if(req.body.well_pres != undefined){
    console.log(req.body.well_pres);
    }else{
      console.log('well_pres undefined');
    }
  if(req.body.well_class != ""){
    console.log(req.body.well_class);
  }else{
    console.log('well_class undefined');
  }
  if(req.body.org_act != ""){
    console.log(req.body.org_act);
  }else{
    console.log('org_act undefined');
  }
  if(req.body.soc_grp !=""){
    console.log(req.body.soc_grp);
  }else{
    console.log('soc_grp undefined');
  }
  if(req.body.well_goal != ""){
    console.log(req.body.well_goal);
  }else{
    console.log('well_goal undefined');
  }
  if(req.body.bon_act != undefined){
    console.log(req.body.bon_act);
  }else{
    console.log('bon_act undefined');
  }
  res.redirect('/currentPoints.html')
});

/*
  Serves index.html as the landing page.
*/
app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.sendfile('public/index.html');
}); 

app.listen(PORT, function () {
  console.log('Listing To Port');
});