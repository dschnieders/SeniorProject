"use strict";

const PORT = 8080;
const http = require('http');
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