let data = {
  "2018": {
    "sofia": {
      "1": 41.0,
      "2": 26.0,
      "3": 19.0,
      "4": 14.0,
      "5": 10.0,
      "6": 11.0,
      "7": 12.0,
      "8": 11.0,
      "9": 10.0,
      "10": 15.0,
      "11": 26.0,
      "12": 28.0
    },
    "plovdiv": {
      "1": 60.0,
      "2": 41.0,
      "3": 31.0,
      "4": 14.0,
      "5": 12.0,
      "6": 10.0,
      "7": 10.0,
      "8": 11.0,
      "9": 12.0,
      "10": 22.0,
      "11": 37.0,
      "12": 35.0
    },
    "vidin": {
      "1": 71.0,
      "2": 58.0,
      "3": 57.0,
      "4": 15.0,
      "5": 12.0,
      "6": 14.0,
      "7": 13.0,
      "8": 15.0,
      "9": 17.0,
      "10": 32.0,
      "11": 55.0,
      "12": 52.0
    }
  },
  "2019": {
    "sofia": {
      "1": 27.0,
      "2": 22.0,
      "3": 16.0,
      "4": 15.0,
      "5": 8.0,
      "6": 11.0,
      "7": 8.0,
      "8": 8.0,
      "9": 9.0,
      "10": 16.0,
      "11": 16.0,
      "12": 22.0
    },
    "plovdiv": {
      "1": 34.0,
      "2": 24.0,
      "3": 15.0,
      "4": 14.0,
      "5": 8.0,
      "6": 10.0,
      "7": 9.0,
      "8": 9.0,
      "9": 10.0,
      "10": 19.0,
      "11": 36.0,
      "12": 18.0
    },
    "vidin": {
      "1": 54.0,
      "2": 49.0,
      "3": 25.0,
      "4": 14.0,
      "5": 9.0,
      "6": 12.0,
      "7": 9.0,
      "8": 9.0,
      "9": 9.0,
      "10": 31.0,
      "11": 48.0,
      "12": 49.0
    }
  }
};

$(document).ready(function() {
  var chartBackgroundColors = [
    'maroon',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'purple',
    'fuchsia',
    'lime',
    'teal',
    'aqua',
    'blue'
  ]

  let selectedYear = "2018";
  let selectedCity = "sofia";

  function getSelectedData() {
    return data[selectedYear][selectedCity];
  }

  function getSelectedLabels() {
    return $.map(getSelectedData(), (value, month) => month);
  }

  function getSelectedValues() {
    return $.map(getSelectedData(), (value, month) => value);
  }

  var $canvas = $(`<canvas id="chart"></canvas>`);
  $('.canvas-container').append($canvas);
  var ctx = $canvas[0].getContext('2d');

  Chart.defaults.global.legend.display = false;
  
  var chartData = {
      labels: getSelectedLabels(),
      datasets: [{
          data: getSelectedValues(),
          backgroundColor: chartBackgroundColors,
      }]
  };

  var chartOptions = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              },
              scaleLabel: {
                  display: true,
                  labelString: 'p10 particles'
              }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'month'
            }
          }]
      }
  };

  var chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
  });

  function updateChartData() {
    chart.data.datasets.forEach((dataset) => {
      dataset.data = getSelectedValues();
    });

    chart.update();
  }

  $(".city-select").click((ev) => {
    selectedCity = ev.target.name;
    $("#city-display").text(ev.target.value);
    updateChartData();
  });

  $(".year-select").click((ev) => {
    selectedYear = ev.target.name;
    $("#year-display").text(ev.target.value);
    updateChartData();
  });
});
