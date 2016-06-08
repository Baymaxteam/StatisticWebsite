var DEBUG_Log = false;
$(function() {
    getBikeDistData('Bike_distance_S0S1.csv', $('#containerBikeAvgRange'));

    $("#btnUpdateBikeStationDistance").click(function() {
        var CategoryX = $('#ListBikeStationA').val();
        var CategoryY = $('#ListBikeStationB').val();

        var csvString = 'Bike_distance_S' + (CategoryX.toString()) + 'S' + (CategoryY.toString()) + '.csv';
        // DEBUG("csvString");
        // DEBUG(csvString);
        getBikeDistData( csvString, $('#containerBikeAvgRange'));
      

    });

});


function BikeDisChart(DOM, plotData, plotXaxis) {
    Highcharts.setOptions({
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
        ]
    });

    DOM.highcharts({
        chart: {
            type: 'column'
        },
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
};

function getBikeDistData(csvFileName, DOM) {

    $.get('/ajax_selectFilePart2/', {
        'fileName': csvFileName
    }, function(respons) {
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
        // DEBUG("getBikeTimeData title");
        // DEBUG(tempXTitle);
        // DEBUG("getBikeTimeData");
        // DEBUG(temp11);
        BikeDisChart(DOM, temp11, tempXTitle);


    });

};
