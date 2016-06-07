var DEBUG_Log = true;
$(function() {


    getBikeTimeData('Bike_timeHr0.csv', $('#containerBikeRentDataTimeHr0'));
    getBikeTimeData('Bike_timeHr1.csv', $('#containerBikeRentDataTimeHr1'));
    getBikeTimeData('Bike_timeWeek0.csv', $('#containerBikeRentDataTimeWeek0'));
    getBikeTimeData('Bike_timeWeek1.csv', $('#containerBikeRentDataTimeWeek1'));
    getBikeTimeData('Bike_timeMonth0.csv', $('#containerBikeRentDataTimeMonth0'));
    getBikeTimeData('Bike_timeMonth1.csv', $('#containerBikeRentDataTimeMonth1'));

    // $.get('/ajax_selectFilePart2/', {
    //     'fileName': 'Bike_timeMonth1.csv'
    // }, function(respons) {
    //     // DEBUG("Server response the json data hr : ");
    //     // DEBUG(respons);

    //     var i, j,
    //         temp1 = [],
    //         temp11 = [],
    //         tempXTitle = [];
    //     var tmptitle = respons['title'];
    //     var tmpdata = respons['data'];
    //     var len = tmpdata.length;
    //     var datalen = tmpdata[0].length;

    //     for (i = 1; i < datalen; i++) {
    //         for (j = 0; j < len; j++) {
    //             temp1.push(tmpdata[j][i]);
    //             tempXTitle.push(tmpdata[j][0]);
    //         }
    //         temp11.push({ name: tmptitle[i], data: temp1 });
    //         temp1 = [];
    //     }
    //     DEBUG("tempXTitle");
    //     DEBUG(tempXTitle);
    //     DEBUG("temp11");
    //     DEBUG(temp11);
    //     MUltiLineChart($('#containerBikeRentDataTimeMonth1'), temp11, tempXTitle);

    // });

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

function getBikeTimeData(csvFileName, DOM) {

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
        // DEBUG("tempXTitle");
        // DEBUG(tempXTitle);
        // DEBUG("temp11");
        // DEBUG(temp11);
        MUltiLineChart(DOM, temp11, tempXTitle);

        // if ($.fn.DataTable.fnIsDataTable('#tableCityStat table')) {
        //     a = $('#tableCityStat table').dataTable();
        //     a.fnClearTable();
        //     a.fnDestroy();
        //     $('#tableCityStat table thead').empty();
        // };
        // $('#tableCityStat table').DataTable({
        //     data: StatList,
        //     columns: SelectTableHeader,
        //     destroy : true,
        //     columnDefs: [{
        //         width: '10%',
        //         targets: 0
        //     }], //fix width
        //     "bAutoWidth": false,
        //     "bFilter": false
        // });
    });

}
