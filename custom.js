var myChart;

$(document).ready(function() {
    var ctx = document.getElementById('chart').getContext('2d');
    var fileData = {
            bus: {
                euro6: 142,
                euro6a: 71,
                euro6b: 68,
                euro6c: 73,
                euro5: 1,
                euro5b: 6,
//                obshto: 361
            }
    };
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(fileData.bus),
            datasets: [{
                label: '# of Votes',
                data: Object.values(fileData.bus),
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
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});
