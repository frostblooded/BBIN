var data = {
    bus: {
        euro6: {
            display: "Euro 6",
            value: 142
        },
        euro6a: {
            display: "Euro 6a",
            value: 71
        },
        euro6b: {
            display: "Euro 6b",
            value: 68
        },
        euro6c: {
            display: "Euro 6c",
            value: 73
        },
        euro5: {
            display: "Euro 5",
            value: 1
        },
        euro5b: {
            display: "Euro 5b",
            value: 6
        },
    }
};

$(document).ready(function() {
    $.each(data, function(i, el){
        var chartId = `chart_${i}`;``
        var $canvas = $(`<canvas id=${chartId}></canvas>`);
        $('body').append($canvas);
        var ctx = $canvas[0].getContext('2d');
        
        var labels = $.map(el, function(el, i) { return el.display });
        var values = $.map(el, function(el, i) { return el.value });
        
        var chartData = {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: chartOptions
        });
    });
});
