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
var DataSetCity2 = [];
var DataSetCity3 = [];

$(function() {

    // set the allowed units for data grouping
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

    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_combine.csv'
    }, function(respons) {
        // DEBUG("Server response the json data hr : ");
        // DEBUG(respons);

        var i, j,
            temp1 = [],
            temp2 = [],
            temp3 = [];

        var tempXtimestamp = [];
        var tmpdata = respons['data'];
        var len = tmpdata.length;

        // 第一筆不需要在這讀取，第二筆要個別獨取
        for (i = 0; i < 6; i++) {
            for (j = 0; j < len; j++) {
                temp1.push([tmpdata[j][1], tmpdata[j][i + 2]]);
                temp2.push([tmpdata[j][1], tmpdata[j][i + 8]]);
                temp3.push([tmpdata[j][1], tmpdata[j][i + 2]]);

            }
            DataSetCity1.push(temp1);
            DataSetCity2.push(temp2);
            DataSetCity3.push(temp3);
            temp1 = [];
            temp2 = [];
            temp3 = [];
        }
        DEBUG("DataSetCity1");
        DEBUG(DataSetCity1);

        MultiLineCompareChart($('#containerCityCondition'), DataSetCity1, groupingUnits)
    });

    getCityStatData('PM2.5_data_combine_Stat1.csv');

    $("#btnUpdateCity").click(function() {
        var CategoryX = $('#P11listCity').val();
   
        DEBUG(CategoryX);
        if (CategoryX == 0) {
            MultiLineCompareChart($('#containerCityCondition'), DataSetCity1, groupingUnits);
            getCityStatData('PM2.5_data_combine_Stat1.csv');
            
            DEBUG(11);
        } else if (CategoryX == 1) {
            MultiLineCompareChart($('#containerCityCondition'), DataSetCity2, groupingUnits);
            getCityStatData('PM2.5_data_combine_Stat2.csv');
            DEBUG(22);
        } else {
            MultiLineCompareChart($('#containerCityCondition'), DataSetCity3, groupingUnits);
            getCityStatData('PM2.5_data_combine_Stat3.csv');
            DEBUG(33);
        }
        
    });
    
});

function MultiLineCompareChart(DOM, plotData, plotXgroupingUnits) {
    DOM.highcharts('StockChart', {
        exporting: {
            enabled: false
        },
        chart: {
            marginLeft: 5, // Keep all charts left aligned
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
                text: 'PM10/PM2.5/RH',
                rotation: 0,
            },

            height: '30%',
            offset: 0,
            lineWidth: 2
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                textAlign: 'left',
                text: 'Wind/Rain',
                rotation: 0
            },
            top: '35%',
            height: '30%',
            offset: 0,
            lineWidth: 2
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                textAlign: 'left',
                text: 'Temp',
                rotation: 0
            },
            top: '70%',
            height: '30%',
            offset: 0,
            lineWidth: 2
        }],

        series: [{
            type: 'line',
            name: 'PM10',
            data: plotData[0],
            yAxis: 0,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'line',
            name: 'PM2.5',
            data: plotData[1],
            yAxis: 0,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'line',
            name: 'RH',
            data: plotData[2],
            yAxis: 0,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'area',
            name: 'Wind',
            data: plotData[3],
            yAxis: 1,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'area',
            name: 'Rain',
            data: plotData[4],
            yAxis: 1,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }, {
            type: 'area',
            name: 'Temp',
            data: plotData[5],
            yAxis: 2,
            dataGrouping: {
                units: plotXgroupingUnits
            }
        }]
    });
}


function getCityStatData(csvFileName) {

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
       
        if ($.fn.DataTable.fnIsDataTable('#tableCityStat table')) {
            a = $('#tableCityStat table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#tableCityStat table thead').empty();
        };
        $('#tableCityStat table').DataTable({
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
