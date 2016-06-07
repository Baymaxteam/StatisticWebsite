var DEBUG_Log = true;
$(function() {

    getBikeTimeData('Bike_timeHr0_S0.csv', $('#containerBikeRentDataTimeHr0'));
    getBikeTimeData('Bike_timeHr1_S0.csv', $('#containerBikeRentDataTimeHr1'));
    getBikeTimeData('Bike_timeWeek0_S0.csv', $('#containerBikeRentDataTimeWeek0'));
    getBikeTimeData('Bike_timeWeek1_S0.csv', $('#containerBikeRentDataTimeWeek1'));
    getBikeTimeData('Bike_timeMonth0_S0.csv', $('#containerBikeRentDataTimeMonth0'));
    getBikeTimeData('Bike_timeMonth1_S0.csv', $('#containerBikeRentDataTimeMonth1'));
    getBikeTimeStatData('Bike_timeHrStat_S0.csv', $('#tableBikeStationHr table'));
    getBikeTimeStatData('Bike_timeWeekStat_S0.csv', $('#tableBikeStationWeek table'));
    getBikeTimeStatData('Bike_timeMonthStat_S0.csv', $('#tableBikeStationMonth table'));


    $("#btnUpdateBikeStationHr").click(function() {
        var CategoryX = $('#ListBikeStationHr').val();

        DEBUG(CategoryX);
        if (CategoryX == 0) {
            getBikeTimeData('Bike_timeHr0_S0.csv', $('#containerBikeRentDataTimeHr0'));
            getBikeTimeData('Bike_timeHr1_S0.csv', $('#containerBikeRentDataTimeHr1'));
            getBikeTimeStatData('Bike_timeHrStat_S0.csv', $('#tableBikeStationHr table'));

            DEBUG(11);
        } else if (CategoryX == 1) {
            getBikeTimeData('Bike_timeHr0_S1.csv', $('#containerBikeRentDataTimeHr0'));
            getBikeTimeData('Bike_timeHr1_S1.csv', $('#containerBikeRentDataTimeHr1'));
            getBikeTimeStatData('Bike_timeHrStat_S1.csv', $('#tableBikeStationHr table'));
            DEBUG(22);
        } else {
            DEBUG(33);
        }

    });

    $("#btnUpdateBikeStationWeek").click(function() {
        var CategoryX = $('#ListBikeStationWeek').val();

        DEBUG(CategoryX);
        if (CategoryX == 0) {
            getBikeTimeData('Bike_timeWeek0_S0.csv', $('#containerBikeRentDataTimeWeek0'));
            getBikeTimeData('Bike_timeWeek1_S0.csv', $('#containerBikeRentDataTimeWeek1'));
            getBikeTimeStatData('Bike_timeWeekStat_S0.csv', $('#tableBikeStationWeek table'));

            DEBUG(11);
        } else if (CategoryX == 1) {
            getBikeTimeData('Bike_timeWeek0_S1.csv', $('#containerBikeRentDataTimeWeek0'));
            getBikeTimeData('Bike_timeWeek1_S1.csv', $('#containerBikeRentDataTimeWeek1'));
            getBikeTimeStatData('Bike_timeWeekStat_S1.csv', $('#tableBikeStationWeek table'));
            DEBUG(22);
        } else {
            DEBUG(33);
        }

    });

    $("#btnUpdateBikeStationMonth").click(function() {
        var CategoryX = $('#ListBikeStationMonth').val();

        DEBUG(CategoryX);
        if (CategoryX == 0) {
            getBikeTimeData('Bike_timeMonth0_S0.csv', $('#containerBikeRentDataTimeMonth0'));
            getBikeTimeData('Bike_timeMonth1_S0.csv', $('#containerBikeRentDataTimeMonth1'));
            getBikeTimeStatData('Bike_timeMonthStat_S0.csv', $('#tableBikeStationMonth table'));

            DEBUG(11);
        } else if (CategoryX == 1) {
            getBikeTimeData('Bike_timeMonth0_S1.csv', $('#containerBikeRentDataTimeMonth0'));
            getBikeTimeData('Bike_timeMonth1_S1.csv', $('#containerBikeRentDataTimeMonth1'));
            getBikeTimeStatData('Bike_timeMonthStat_S1.csv', $('#tableBikeStationMonth table'));
            DEBUG(22);
        } else {
            DEBUG(33);
        }

    });

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

    });

}

function getBikeTimeStatData(csvFileName, DOMtable) {

    $.get('/ajax_selectFilePart2/', {
        'fileName': csvFileName
    }, function(respons) {
        var titleList = respons.title;
        var StatList = respons.statList;
        var i;

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        for (var i = 0; i < titleList.length; i++) {
            SelectTableHeader.push({ title: titleList[i] });
        }
        DEBUG("SelectTableHeader");
        DEBUG(SelectTableHeader);
        DEBUG("StatList");
        DEBUG(StatList);
        // 統計圖表
        // remove the old table

        // if ($.fn.DataTable.fnIsDataTable('#tableCityStat table')) {
        //     a = $('#tableCityStat table').dataTable();
        //     a.fnClearTable();
        //     a.fnDestroy();
        //     $('#tableCityStat table thead').empty();
        // };

        DOMtable.DataTable({
            data: StatList,
            columns: SelectTableHeader,
            destroy: true,
            columnDefs: [{
                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });
    });

}
