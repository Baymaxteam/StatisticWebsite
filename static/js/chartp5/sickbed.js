$(function () {
    $('#container8').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '病床數量'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                '病床合計',
                '一般病床',
                '特殊病床',
                '急性一般病床',
                '精神急性一般病床',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '病床數 (張)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} 張</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '台北市',
            data: [20257, 14705, 5552, 12864, 1222]

        }, {
            name: '台中市',
            data: [17765, 13048, 4717, 9933, 858]

        }, {
            name: '台南市',
            data: [9401, 6667, 2734, 5148, 433]

        }, {
            name: '高雄市',
            data: [16915, 12022, 4890, 9445, 1085]

        }, {
            name: '基隆市',
            data: [2387, 1776, 611, 1246, 156]

        }]
    });
});