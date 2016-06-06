var DEBUG_Log = true;

$(function() {
    getCSVTempNumber('Bike_temp_numberS0.csv', $('#containerBikeTempandNumber'));
    getTempNumberStatData('Bike_temp_numberStatS0.csv');

    $("#btnUpdateBikeStation").click(function() {
        var CategoryX = $('#ListBikeStation').val();
   
        DEBUG(CategoryX);
        if (CategoryX == 0) {
            getCSVTempNumber('Bike_temp_numberS0.csv', $('#containerBikeTempandNumber'));
            getTempNumberStatData('Bike_temp_numberStatS0.csv');
            
            DEBUG(11);
        } else if (CategoryX == 1) {
            getCSVTempNumber('Bike_temp_numberS1.csv', $('#containerBikeTempandNumber'));
            getTempNumberStatData('Bike_temp_numberStatS1.csv');
            DEBUG(22);
        } else {
            DEBUG(33);
        }
        
    });
});

function getCSVTempNumber(csvName, DOM) {
    $.get('/ajax_selectFilePart2/', {
        'fileName': csvName
    }, function(respons) {
        // DEBUG("Server response the json data hr : ");
        // DEBUG(respons);

        var i, j,
            temp1 = [],
            temp11 = [];
        var tempXtimestamp = [];
        var tmpdata = respons['data'];
        var len = tmpdata.length;

        // 第一筆不需要在這讀取，第二筆要個別獨取
        for (i = 0; i < 4; i++) {
            for (j = 0; j < len; j++) {
                temp1.push([tmpdata[j][1], tmpdata[j][i + 2]]);
            }
            temp11.push(temp1);

            temp1 = [];
        }
        DEBUG("temp11 temp");
        DEBUG(temp11);

        var groupingUnits = [
            [
                'day', [1]
            ],
            [
                'week', [1]
            ],
            [
                'month', [1, 2, 3, 6]
            ],
            [
                'year',
                null
            ]
        ];

        MultiLineTempNumberChart(DOM, temp11, groupingUnits)
    });
}


function MultiLineTempNumberChart(DOM, plotData, plotXgroupingUnits) {
    DOM.highcharts('StockChart', {
        exporting: {
            enabled: false
        },
        chart: {
            marginLeft: 10, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'PM2.5氣體'
        },

        // yAxis: [
        //     {title: {
        //         text: null
        //     }}
        // ],
        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                textAlign: 'left',
                text: '剩餘數量',
                rotation: 0
                
            },

            height: '50%',
            offset: 0,
            lineWidth: 2
        }, {
            labels: {
                align: 'right',
                 x: -3
            },
            title: {
                textAlign: 'left',
                text: '氣溫',
                rotation: 0
               
            },
            top: '50%',
            height: '50%',
            offset: 0,
            lineWidth: 2
        }],

        series: [{
            type: 'column',
            name: '剩餘數量',
            data: plotData[0],
            yAxis: 0,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'line',
            name: '平均氣溫',
            data: plotData[1],
            yAxis: 1,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'line',
            name: '最大氣溫',
            data: plotData[2],
            yAxis: 1,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'line',
            name: '最小氣溫',
            data: plotData[3],
            yAxis: 1,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }]
    });
}

function getTempNumberStatData(csvFileName) {

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
        DEBUG("SelectTableHeader123");
        DEBUG(SelectTableHeader);
        DEBUG("StatList123");
        DEBUG(StatList);
        // 統計圖表
        // remove the old table
       
        if ($.fn.DataTable.fnIsDataTable('#tableTempNumberStat table')) {
            a = $('#tableTempNumberStat table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#tableTempNumberStat table thead').empty();
        };
        $('#tableTempNumberStat table').DataTable({
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

}


function DEBUG(printData) {
    if (DEBUG_Log === true) {
        console.log(printData)
    }
}
