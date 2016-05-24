$(function () {
    // Create the chart
    $('#container10').highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'column'
        },
        title: {
            text: '服務量'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: '台北市',
                y: 37.01,
                drilldown: '台北市'
            }, {
                name: '台中市',
                y: 23.75,
                drilldown: '台中市'
            }, {
                name: '台南市',
                y: 13.94,
                drilldown: '台南市'
            }, {
                name: '高雄市',
                y: 22.83,
                drilldown: '高雄市'
            }, {
                name: '基隆市',
                y: 2.47,
                drilldown: '基隆市'
            }]
        }],
        drilldown: {
            series: [{
                name: '台北市',
                id: '台北市',
                data: [
                    ['出院人次', 39.93],
                    ['住院健檢人次', 1.32],
                    ['手術人次', 29.37],
                    ['門診手術人次', 13.14],
                    ['住院手術人次', 16.23]   
                ]
            }, {
                name: '台中市',
                id: '台中市',
                data: [
                    ['出院人次', 44.62],
                    ['住院健檢人次', 0.88],
                    ['手術人次', 27.25],
                    ['門診手術人次', 10.82],
                    ['住院手術人次', 16.43]   
                ]
            }, {
                name: '台南市',
                id: '台南市',
                data: [
                    ['出院人次', 44.52],
                    ['住院健檢人次', 0.59],
                    ['手術人次', 27.45],
                    ['門診手術人次', 12.48],
                    ['住院手術人次', 14.97]   
                ]
            }, {
                name: '高雄市',
                id: '高雄市',
                data: [
                    ['出院人次', 46.92],
                    ['住院健檢人次', 0.84],
                    ['手術人次', 26.13],
                    ['門診手術人次', 10.36],
                    ['住院手術人次', 15.76]   
                ]
            }, {
                name: '基隆市',
                id: '基隆市',
                data: [
                    ['出院人次', 43.51],
                    ['住院健檢人次', 0.00],
                    ['手術人次', 28.25],
                    ['門診手術人次', 15.01],
                    ['住院手術人次', 13.24]   
                ]
            }]
        }
    });
});