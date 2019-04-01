"use strict";

// PORT definition
const PORT = 3000;

// Import the HTTP library
const http = require('http');

// Import the fs library
const fs = require('fs');

const express = require('express');
const app = express();

const cache = {};
cache['currentPoints.html'] = fs.readFileSync('public/currentPoints.html');
cache['incentives.html'] = fs.readFileSync('public/incentives.html');
cache['logPoints.html'] = fs.readFileSync('public/logPoints.html');

app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

app.listen(PORT, function () {
  console.log('Listing To Port');
});