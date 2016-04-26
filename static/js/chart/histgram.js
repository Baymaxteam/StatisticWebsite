function Histgramchart() {
    $('#P12chartHistgram .chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: Chart1Title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: Chart1CategoryX,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: Chart1TitleY
            }
        },
        // tooltip: {
        //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        //         '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        //     footerFormat: '</table>',
        //     shared: true,
        //     useHTML: true
        // },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: Chart1DataSeires
    });
};
