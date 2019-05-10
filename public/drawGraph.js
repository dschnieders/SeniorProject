// Load google charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/ajaxcall",
    dataType: "json"
  })
    .done(function(data) {
      console.log("GET response:", JSON.stringify(data, "", 2));
      $("#getResponse").html(JSON.stringify(data, "", 2));
      var pie = google.visualization.arrayToDataTable(data);

      // Optional; add a title and set the width and height of the chart
      var options = { title: "Your Current Points", width: 550, height: 400 };

      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );

      var current = "";
      for (var i = 0; i < 1; i++) {
        current += pie.getFormattedValue(i, 1);
      }
      document.getElementById("currentPoints").innerHTML =
        "Your current points: " + current;

      var next = 0;
      if (current < 75) {
        next = 75 - current;
      } else if (current >= 75 && current < 150) {
        next = 150 - current;
      } else if (current >= 150 && current < 225) {
        next = 225 - current;
      } else if (current >= 225 && current < 300) {
        next = 300 - current;
      } else {
        next = "You're maxed out on points!";
      }
      document.getElementById("pointsToNextTier").innerHTML =
        "Points remaining to reach the next tier: " + next;
      chart.draw(pie, options);
    })
    .fail(function(jqXHR, textStatus, err) {
      document.getElementById("currentPoints").innerHTML =
        "Your current points: ";
      document.getElementById("pointsToNextTier").innerHTML =
        "Points remaining to reach the next tier: ";
      console.log("AJAX error response: ", textStatus);
    });
}
