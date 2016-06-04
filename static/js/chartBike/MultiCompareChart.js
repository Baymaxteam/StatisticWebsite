var test = [
    [Date.UTC(2015, 1, 1), 15],
    [Date.UTC(2015, 1, 2), 15],
    [Date.UTC(2015, 1, 3), 15],
    [Date.UTC(2015, 1, 4), 14],
    [Date.UTC(2015, 1, 5), 14],
    [Date.UTC(2015, 1, 6), 14],
    [Date.UTC(2015, 1, 7), 13]

];

var DataSetCity1 = [];
var DEBUG_Log = true;

$(function() {

    // set the allowed units for data grouping
    var groupingUnits = [
        [
            'week', // unit name
            [1] // allowed multiples
        ],
        [
            'month', [1, 2]
        ]
    ];

    $.get('/ajax_selectFilePart2/', {
        'fileName': 'Bike_available.csv'
    }, function(respons) {
        // DEBUG("Server response the json data hr : ");
        // DEBUG(respons);

        var i, j,
            temp1 = [];

        var tempXtimestamp = [];
        var tmpdata = respons['data'];
        var len = tmpdata.length;

        // 第一筆不需要在這讀取，第二筆要個別獨取
        for (i = 0; i < 2; i++) {
            for (j = 0; j < len; j++) {
                temp1.push([tmpdata[j][1], tmpdata[j][i + 2]]);
            }
            DataSetCity1.push(temp1);
            temp1 = [];
        }
        DEBUG("tempXtimestamp");
        DEBUG(tempXtimestamp);
        DEBUG("DataSetCity1");
        DEBUG(DataSetCity1);

        MultiLineCompareChart($('#container_BikeAvailable'), DataSetCity1, groupingUnits)

        // statistic table
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

    });


    $.get('/ajax_selectFilePart2/', {
        'fileName': 'Bike_available_Stat.csv'
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
       
        if ($.fn.DataTable.fnIsDataTable('#tableBileAvaiableStat table')) {
            a = $('#tableBileAvaiableStat table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#tableBileAvaiableStat table thead').empty();
        };
        $('#tableBileAvaiableStat table').DataTable({
            data: StatList,
            columns: SelectTableHeader,
            destroy : true,
            columnDefs: [{
                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });
    });




});

function MultiLineCompareChart(DOM, plotData, plotXgroupingUnits) {
    DOM.highcharts('StockChart', {
        exporting: {
            enabled: false
        },
        chart: {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: '腳踏車剩餘數量'
        },
        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                textAlign: 'left',
                text: '剩餘量',
                rotation: 0,
            },

            height: '100%',
            offset: 0,
            lineWidth: 2
        }],

        series: [{
            type: 'line',
            name: 'San Francisco',
            data: plotData[0],
            yAxis: 0,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'line',
            name: 'San Jose',
            data: plotData[1],
            yAxis: 0,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }]
    });
}


function DEBUG(printData) {
    if (DEBUG_Log === true) {
        console.log(printData)
    }
}


