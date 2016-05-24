$(function () {
    $('#container11').highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'bar'
        },
        title: {
            text: '醫事人員數目'
        },
        xAxis: {
            categories: ['醫師', '中醫師', '牙醫師', '藥師', '藥劑生']
        },
        yAxis: {
            min: 0,
            title: {
                text: '(人)'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: '台北市',
            data: [9021, 860, 2932, 2380,214]
        }, {
            name: '台中市',
            data: [5590, 1257, 1792, 2002, 329]
        }, {
            name: '台南市',
            data: [3290, 478, 961, 1249, 144]
        },{
            name: '高雄市',
            data: [5764, 714, 1680, 2157, 363]
        },{
            name: '基隆市',
            data: [705, 70, 145, 181, 42]
        }]
    });
});