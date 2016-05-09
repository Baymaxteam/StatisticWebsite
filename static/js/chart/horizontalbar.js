function HorizontalBarChart() {
    $('#P12chartHorizontalBar .chart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: Chart1Title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: Chart1CategoryX,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: Chart1TitleY,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: Chart1DataSeires
    });
};