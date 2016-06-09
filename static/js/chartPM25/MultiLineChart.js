var DEBUG_Log = false;
$(function() {
    // getPM25TimeData('PM2.5_data_timeWeek.csv', $('#containerTimeWeek'));
    getPM25TimeData('PM2.5_data_timeHr.csv', $('#containerTimeHr'));
    getPM25TimeData('PM2.5_data_timeMonth.csv', $('#containerTimeMonth'));
    getPM25TimeData('PM2.5_data_timeHr1.csv', $('#containerTimeHr1'));
    getPM25TimeData('PM2.5_data_timeMonth1.csv', $('#containerTimeMonth1'));
    // MUltiLineChart($('#containerTimeHr'), 1);
});

function MUltiLineChart(DOM, plotData, plotXaxis) {
    Highcharts.setOptions({
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
        ]
    });

    DOM.highcharts({
        exporting: {
            enabled: false
        },
        title: {
            text: '',
            x: -20 //center
        },
        xAxis: {
            categories: plotXaxis
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: plotData
    });
}

function getPM25TimeData(csvFile, DOM) {
    $.get('/ajax_selectFilePart2/', {
        'fileName': csvFile
    }, function(respons) {
        // DEBUG("Server response the json data hr : ");
        // DEBUG(respons);

        var i, j,
            temp1 = [],
            temp11 = [],
            tempXTitle = [];
        var tmptitle = respons['title'];
        var tmpdata = respons['data'];
        var len = tmpdata.length;
        var datalen = tmpdata[0].length;
 
        for (i = 1; i < datalen; i++) {
            for (j = 0; j < len; j++) {
                temp1.push(tmpdata[j][i]);
                tempXTitle.push(tmpdata[j][0]);
            }
            temp11.push({ name: tmptitle[i], data: temp1 });
            temp1 = [];
        }
        // DEBUG("tempXTitle");
        // DEBUG(tempXTitle);
        // DEBUG("temp11");
        // DEBUG(temp11);
        MUltiLineChart(DOM, temp11, tempXTitle);

    });
}
