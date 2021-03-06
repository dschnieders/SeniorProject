"use strict";

const PORT = 8080;
const http = require("http");
const fs = require("fs");
var session = require("express-session");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
const app = express();
var jsonParser = bodyParser.json({ type: "application/*+json" });

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cache = {};
cache["currentPoints.html"] = fs.readFileSync("public/currentPoints.html");
cache["incentives.html"] = fs.readFileSync("public/incentives.html");
cache["logPoints.html"] = fs.readFileSync("public/logPoints.html");
cache["home.html"] = fs.readFileSync("public/home.html");

const sqlite3 = require("sqlite3").verbose();

/* 
  Log-in function for index.html
*/
app.post("/auth", function(req, res) {
  let db = new sqlite3.Database("./SQL/SeniorProject.db", err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-disk SQLite database. (Auth)");
  });
  var username = req.body.username;
  var password = req.body.password;
  let login_sql =
    "SELECT * FROM Employees WHERE username LIKE ? AND password LIKE ?;";
  if (username && password) {
    db.get(login_sql, [username, password], function(err, doc) {
      if (doc.length !== 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect("/home.html");
      } else {
        res.send("Incorrect Username and/or Password!");
      }
      res.end();
    });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
  db.close();
  console.log("DB access has been closed.");
});

/*
  Delete later.
*/
app.get("/home", function(req, res) {
  if (req.session.loggedin) {
    res.send("Welcome back, " + req.session.username + "!");
  } else {
    res.send("Please login to view this page!");
  }
  res.end();
});

/**
 * List of update functions for the SQLite3 DB from logPoints.html.
 */
app.post("/log", function(req, res) {
  let db = new sqlite3.Database("./SQL/SeniorProject.db", err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-disk SQLite database. (Log)");
  });
  /**
   * Updates Preventative_Activites table.
   */
  if (req.body.prev_act != undefined) {
    console.log(req.body.prev_act);
    console.log(req.session.username);
    let data = [req.body.prev_act.length, req.session.username];
    let update =
      "UPDATE Preventative_Activities SET activity = ? WHERE prevAct_ID = (SELECT prevAct_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Preventative_Activities updated.");
    });
  } else {
    console.log("prev_act undefined");
  }
  /**
   * Updates Wellness_Challenge table.
   */
  if (req.body.well_chall != undefined) {
    console.log(req.body.well_chall);
    console.log(req.session.username);
    let data = [req.body.well_chall.length, req.session.username];
    let update =
      "UPDATE Wellness_Challenges SET eventDate = ? WHERE wellChall_ID = (SELECT wellChall_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Wellness_Challenges updated.");
    });
  } else {
    console.log("well_chall undefined");
  }
  /**
   * Updates Wellness_Wednesday table.
   */
  if (req.body.well_wed != undefined) {
    console.log(req.body.well_wed);
    console.log(req.session.username);
    let data = [req.body.well_wed.length, req.session.username];
    let update =
      "UPDATE Wellness_Wednesday SET eventDate = ? WHERE wellWed_ID = (SELECT wellWed_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Wellness_Wednesday updated.");
    });
  } else {
    console.log("well_wed undefined");
  }
  /**
   * Update Wellness_Presentation table.
   */
  if (req.body.well_pres != undefined) {
    console.log(req.body.well_pres);
    console.log(req.session.username);
    let data = [req.body.well_pres.length, req.session.username];
    let update =
      "UPDATE Wellness_Presentation SET eventDate = ? WHERE wellPres_ID = (SELECT wellPres_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Wellness_Presentation updated.");
    });
  } else {
    console.log("well_pres undefined");
  }
  /**
   * Update Wellness_Class table.
   */
  if (req.body.well_class != "") {
    console.log(req.body.well_class);
    console.log(req.session.username);
    let data = [req.body.well_class, req.session.username];
    let update =
      "UPDATE Wellness_Class SET class_name = ? WHERE class_ID = (SELECT class_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Organized_Activity updated.");
    });
  } else {
    console.log("well_class undefined");
  }
  /**
   * Update Organized_Activity table.
   */
  if (req.body.org_act != "") {
    console.log(req.body.org_act);
    console.log(req.session.username);
    let data = [req.body.org_act, req.session.username];
    let update =
      "UPDATE Organized_Activity SET org_name = ? WHERE orgAct_ID = (SELECT orgAct_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Organized_Activity updated.");
    });
  } else {
    console.log("org_act undefined");
  }
  /**
   * Update Social_Group table.
   */
  if (req.body.soc_grp != "") {
    console.log(req.body.soc_grp);
    console.log(req.session.username);
    let data = [req.body.soc_grp, req.session.username];
    let update =
      "UPDATE Social_Group SET group_name = ? WHERE social_ID = (SELECT social_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Social_Group updated.");
    });
  } else {
    console.log("soc_grp undefined");
  }
  /**
   * Update Wellness_Goal table.
   */
  if (req.body.well_goal != "") {
    console.log(req.body.well_goal);
    console.log(req.session.username);
    let data = [req.body.well_goal, req.session.username];
    let update =
      "UPDATE Wellness_Goal SET goal = ? WHERE goal_ID = (SELECT goal_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Wellness_Goal updated.");
    });
  } else {
    console.log("well_goal undefined");
  }
  /**
   * Update Bonus_Activity table.
   */
  if (req.body.bon_act != undefined) {
    console.log(req.body.bon_act);
    console.log(req.session.username);
    let data = [req.body.bon_act.length, req.session.username];
    let update =
      "UPDATE Bonus_Activities SET bonus = ? WHERE bonus_ID = (SELECT bonus_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Bonus_Activities updated.");
    });
  } else {
    console.log("bon_act undefined");
  }
  /**
   * Update Workouts table.
   */
  if (req.body.workouts > 0) {
    console.log(req.body.workouts);
    console.log(req.session.username);
    let data = [req.body.workouts, req.session.username];
    let update =
      "UPDATE Workouts SET eventDate = ? WHERE workout_ID = (SELECT workout_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Workouts updated.");
    });
  } else {
    console.log("workouts undefined.");
  }
  /**
   * Update Yammer table.
   */
  if (req.body.yammer > 0) {
    console.log(req.body.yammer);
    console.log(req.session.username);
    let data = [req.body.yammer, req.session.username];
    let update =
      "UPDATE Yammer SET eventDate = ? WHERE yammer_ID = (SELECT yammer_ID FROM Employee_Tracking WHERE tracking_ID = (SELECT tracking_ID FROM Employees WHERE Employees.username = ?));";
    db.run(update, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log("Yammer updated.");
    });
  } else {
    console.log("yammer undefined");
  }
  res.redirect("/currentPoints.html");
  db.close();
  console.log("Db access was closed.");
});

/**
 * Send JSON file to currentPoints.html via AJAX
 */
app.get("/ajaxcall", function(req, res) {
  let db = new sqlite3.Database("./SQL/SeniorProject.db", err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-disk SQLite database. (AJAX call)");
  });

  /**
   * Gets value of Preventative_Activities for the logged in user.
   */
  var pa_Select =
    "SELECT activity FROM Preventative_Activities INNER JOIN Employee_Tracking ON Preventative_Activities.prevAct_ID = Employee_Tracking.prevAct_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var wc_select =
    "SELECT eventDate FROM Wellness_Challenges INNER JOIN Employee_Tracking ON Wellness_Challenges.wellChall_ID = Employee_Tracking.wellChall_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var ww_select =
    "SELECT eventDate FROM Wellness_Wednesday INNER JOIN Employee_Tracking ON Wellness_Wednesday.wellWed_ID = Employee_Tracking.wellWed_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var wp_select =
    "SELECT eventDate FROM Wellness_Presentation INNER JOIN Employee_Tracking ON Wellness_Presentation.wellPres_ID = Employee_Tracking.wellPres_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var w_select =
    "SELECT eventDate FROM Workouts INNER JOIN Employee_Tracking ON Workouts.workout_ID = Employee_Tracking.workout_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var y_select =
    "SELECT eventDate FROM Yammer INNER JOIN Employee_Tracking ON Yammer.yammer_ID = Employee_Tracking.yammer_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var wlc_select =
    "SELECT class_name FROM Wellness_Class INNER JOIN Employee_Tracking ON Wellness_Class.class_ID = Employee_Tracking.class_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var oa_select =
    "SELECT org_name FROM Organized_Activity INNER JOIN Employee_Tracking ON Organized_Activity.orgAct_ID = Employee_Tracking.orgAct_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var sg_select =
    "SELECT group_name FROM Social_Group INNER JOIN Employee_Tracking ON Social_Group.social_ID = Employee_Tracking.social_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var wg_select =
    "SELECT goal FROM Wellness_Goal INNER JOIN Employee_Tracking ON Wellness_Goal.goal_ID = Employee_Tracking.goal_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";
  var ba_select =
    "SELECT bonus FROM Bonus_Activities INNER JOIN Employee_Tracking ON Bonus_Activities.bonus_ID = Employee_Tracking.bonus_ID INNER JOIN Employees ON Employee_Tracking.tracking_ID = Employees.tracking_ID WHERE Employees.username = ?";

  var posts = [];
  posts.push(["Category", "Points"]);
  db.serialize(function() {
    db.each(pa_Select, req.session.username, function(err, row) {
      posts.push(["Preventive Activities", row.activity * 5]);
    });
    db.each(wc_select, req.session.username, function(err, row) {
      posts.push(["Wellness Challenges", parseInt(row.eventDate) * 5]);
    });
    db.each(ww_select, req.session.username, function(err, row) {
      posts.push(["Wellness Wednesday", parseInt(row.eventDate) * 5]);
    });
    db.each(wp_select, req.session.username, function(err, row) {
      posts.push(["Wellness Presentations", parseInt(row.eventDate) * 5]);
    });
    db.each(w_select, req.session.username, function(err, row) {
      posts.push(["Workouts", parseInt(row.eventDate) * 3]);
    });
    db.each(y_select, req.session.username, function(err, row) {
      posts.push(["Yammer", parseInt(row.eventDate) * 3]);
    });
    db.each(wlc_select, req.session.username, function(err, row) {
      var x;
      if (row.class_name != "") {
        x = 0;
      } else {
        x = 5;
      }
      posts.push(["Wellness Class", parseInt(x)]);
    });
    db.each(oa_select, req.session.username, function(err, row) {
      var x;
      if (row.org_name != "") {
        x = 0;
      } else {
        x = 5;
      }
      posts.push(["Organized Activity", parseInt(x)]);
    });
    db.each(sg_select, req.session.username, function(err, row) {
      var x;
      if (row.group_name != "") {
        x = 0;
      } else {
        x = 5;
      }
      posts.push(["Social Group", parseInt(x)]);
    });
    db.each(wg_select, req.session.username, function(err, row) {
      var x;
      if (row.goal != "") {
        x = 0;
      } else {
        x = 5;
      }
      posts.push(["Wellness Goal", parseInt(x)]);
    });
    db.each(
      ba_select,
      req.session.username,
      function(err, row) {
        posts.push(["Bonus Activities", parseInt(row.bonus) * 5]);
      },
      function() {
        db.close();
        console.log("sending");
        console.log(posts);
        res.send(posts);
      }
    );
  });
});

/*
  Serves index.html as the landing page.
*/
app.use(express.static("./public"));
app.get("/", function(req, res) {
  res.sendfile("public/index.html");
});

app.listen(PORT, function() {
  console.log("Listing To Port");
});
