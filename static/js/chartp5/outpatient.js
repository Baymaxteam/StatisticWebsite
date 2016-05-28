$(function () {
    // Create the chart
    $('#container9').highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'pie'
        },
        title: {
            text: '門診申報件數'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: '縣市',
            colorByPoint: true,
            data: [{
                name: '新北市',
                y: 26.80,
                drilldown: '新北市'
            }, {
                name: '台北市',
                y: 17.96,
                drilldown: '台北市'
            }, {
                name: '台中市',
                y: 20.60,
                drilldown: '台中市'
            }, {
                name: '台南市',
                y: 13.86,
                drilldown: '台南市'
            }, {
                name: '高雄市',
                y: 20.77,
                drilldown: '高雄市'
            }]
        }],
        drilldown: {
            series: [{
                name: '新北市',
                id: '新北市',
                data: [
                    ['傳染病與寄生蟲病及其之後期影響', 19.92],
                    ['惡性腫瘤', 13.63],
                    ['其他腫瘤', 5.76],
                    ['內分泌、營養及新陳代謝疾病與免疫性疾患', 36.6],
                    ['精神疾患', 24.08]
                ]
            }, {
                name: '台北市',
                id: '台北市',
                data: [
                    ['傳染病與寄生蟲病及其之後期影響', 19.12],
                    ['惡性腫瘤', 15.50],
                    ['其他腫瘤', 6.46],
                    ['內分泌、營養及新陳代謝疾病與免疫性疾患', 36.08],
                    ['精神疾患', 22.84]
                ]
            }, {
                name: '台中市',
                id: '台中市',
                data: [
                    ['傳染病與寄生蟲病及其之後期影響', 23.56],
                    ['惡性腫瘤', 13.27],
                    ['其他腫瘤', 5.40],
                    ['內分泌、營養及新陳代謝疾病與免疫性疾患', 33.43],
                    ['精神疾患', 24.34]
                ]
            }, {
                name: '台南市',
                id: '台南市',
                data: [
                    ['傳染病與寄生蟲病及其之後期影響', 22.17],
                    ['惡性腫瘤', 14.57],
                    ['其他腫瘤', 5.76],
                    ['內分泌、營養及新陳代謝疾病與免疫性疾患', 34.49],
                    ['精神疾患', 23.02]

                ]
            }, {
                name: '高雄市',
                id: '高雄市',
                data: [
                    ['傳染病與寄生蟲病及其之後期影響', 20.87],
                    ['惡性腫瘤', 13.64],
                    ['其他腫瘤', 5.39],
                    ['內分泌、營養及新陳代謝疾病與免疫性疾患', 32.82],
                    ['精神疾患', 27.28]
                ]
            }]
        }
    });
});