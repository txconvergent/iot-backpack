
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
function drawChart() {
     var data = google.visualization.arrayToDataTable([
      ['Year', 'Force', 'Limit'],
      [0,  0, 0],
      [0,  0, 0],
      [0, 0, 0],
      [0, 0, 0]
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
  for(var i = 0 ; i < newData.length; i++) {
    timeAcc = newData[i]
    time = timeAcc["time"]
    force = timeAcc["acceleration"]
    date = new Date(time * 1000)
    console.log(time + " " + new Date(time))
    cleanData.push([date, force])
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

gpsUrl = "http://s19-iot.appspot.com/acceleration_hour"
