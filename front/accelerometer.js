
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Force', 'Limit'],
      [100,  120,      1000],
      [101,  1130,      1000],
      [150,  660,       1000],
      [1000,  1030,      1000]
    ]);

    var options = {
      title: 'Accelerometer Data',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

function updateChart(newData) {
  var data = new google.visualization.DataTable();

  data.addColumn('datetime', 'Time of Day');
  data.addColumn('number', 'Force');

  // clean up the raw new data to add to the table
  cleanData = []
  for(timeAcc in newData) {
    time = timeAcc["time"]
    force = timeAcc["acceleration"]
    cleanData.push([new Date(time), force])
  }
  data.addRows(cleanData)

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  var options = {
    title: 'Accelerometer Data',
    curveType: 'function',
    legend: { position: 'bottom' }
  };
    chart.draw(data, options);

}

function getHttpAcceleration() {
  $.getJSON(gpsUrl, function(data, status) {
    console.log(data)
    updateChart(data["data"])
  })
}

gpsUrl = "https://api.budgetfor.space/missions"
