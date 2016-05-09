function HistogramFitchart() {
    $('#P22chartHistogramFit .chart').highcharts({
        title: {
            text: Chart1Title
        },
        xAxis: {
            categories: Chart1CategoryX
        },
        labels: {
            items: [{
                html: Chart1Title,
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        yAxis: {
            title: {
                text: Chart1TitleY
            },
        },
        series: Chart1Col
    });
};
