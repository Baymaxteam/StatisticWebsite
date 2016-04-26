function Linechart() {
    $('#P12chartLine .chart').highcharts({
        title: {
            text: Chart1Title,
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: Chart1CategoryX
        },
        yAxis: {
            title: {
                text: Chart1TitleY
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        // tooltip: {
        //     valueSuffix: '°C'
        // },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: Chart1DataSeires
    });

};
