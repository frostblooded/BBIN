let data = {
  "2018": {
    "sofia": {
      "1": 49,
      "2": 19,
      "3": 16,
      "4": 9,
      "5": 10,
      "6": 12,
      "7": 14,
      "8": 17,
      "9": 18,
      "10": 19,
      "11": 20,
      "12": 38
    },
    "plovdiv": {
      "1": 86,
      "2": 60,
      "3": 47,
      "4": 18,
      "5": 14,
      "6": 12,
      "7": 14,
      "8": 11,
      "9": 13,
      "10": 28,
      "11": 49,
      "12": 68
    },
    "vidin": {
      "1": 103,
      "2": 78,
      "3": 80,
      "4": 20,
      "5": 22,
      "6": 24,
      "7": 22,
      "8": 22,
      "9": 24,
      "10": 42,
      "11": 66,
      "12": 72
    }
  },
  "2019": {
    "sofia": {
      "1": 48,
      "2": 31,
      "3": 20,
      "4": 18,
      "5": 15,
      "6": 18,
      "7": 14,
      "8": 18,
      "9": 18,
      "10": 30,
      "11": 33,
      "12": 41
    },
    "plovdiv": {
      "1": 54,
      "2": 42,
      "3": 25,
      "4": 17,
      "5": 11,
      "6": 11,
      "7": 9,
      "8": 9,
      "9": 12,
      "10": 27,
      "11": 48,
      "12": 27
    },
    "vidin": {
      "1": 73,
      "2": 66,
      "3": 39,
      "4": 21,
      "5": 16,
      "6": 18,
      "7": 16,
      "8": 12,
      "9": 11,
      "10": 41,
      "11": 56,
      "12": 58
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
  $('.container').append($canvas);
  var ctx = $canvas[0].getContext('2d');
  
  var chartData = {
      labels: getSelectedLabels(),
      datasets: [{
          label: 'p10',
          data: getSelectedValues(),
          backgroundColor: chartBackgroundColors,
      }]
  };

  var chartOptions = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
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
    updateChartData();
  });

  $(".year-select").click((ev) => {
    selectedYear = ev.target.name;
    updateChartData();
  });
});
