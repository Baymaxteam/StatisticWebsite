$(function() {

    var updateFlag = false;
    var DEBUG_Log = true;
    var addPointIndex = 50;


    function DEBUG(printData) {
        if (DEBUG_Log === true) {
            console.log(printData)
        }
    }


    $.get('/ajax_selectFilewithXaxis/', {
        'fileName': 'emergency.csv'
    }, function(respons) {
        DEBUG("Server response the emergency data : ");
        DEBUG(respons);
        var len = respons.data[0].length;
        var h = respons.data.length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        var titleList = respons.title;
        var sensorData = respons.data;
        var sensorStatList = respons.statList;
        var data = [],
            data1 = [],
            data2 = [],
            data3 = [],
            data4 = [],
            data5 = [];
        var data_left_name = [];

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        for (var i = 0; i < 6; i++) {
            SelectTableHeader.push({ title: titleList[i] });
        };
        var SelectTableHeader1 = [];
        SelectTableHeader1.push({ title: '統計量' });
        for (var i = 6; i < titleList.length; i++) {
            SelectTableHeader1.push({ title: titleList[i] });
        };
        // 整理sensor data
        for (i = 1; i < len; i++) {
            data1.push([sensorData[0][i], sensorData[1][i]]);
            data2.push([sensorData[0][i], sensorData[2][i]]);
            data3.push([sensorData[0][i], sensorData[3][i]]);
            data4.push([sensorData[0][i], sensorData[4][i]]);
            data5.push([sensorData[0][i], sensorData[5][i]]);
        };
        for(i = 1; i<h ; i++)
        {
            data_left_name.push(sensorData[i][0]);
        }
        data.push(data1, data2, data3, data4, data5);

        emergency($('#container7'), data, data_left_name);


        //統計圖表
        $('#tableEm table').DataTable({
            data: sensorStatList,
            columns: SelectTableHeader,
            columnDefs: [{

                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });
        $('#tableEm1 table').DataTable({
            data: sensorStatList,
            columns: SelectTableHeader1,
            columnDefs: [{

                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });
    });


});


function emergency(DOM, data, data_left_name) {
    // Create the chart
    DOM.highcharts('StockChart', {
        exporting: {
            enabled: false
        },
        chart: {
            type: 'column'
        },
        rangeSelector: {
            selected: 5
        },

        title: {
            text: '急診數量'
        },

        scrollbar: {
            enabled: false
        },

        series: [{
            name: data_left_name[0],
            data: data[0],
            tooltip: {
                valueDecimals: 0
            }
        }, {
            name: data_left_name[1],
            data: data[1],
            tooltip: {
                valueDecimals: 0
            }
        }, {
            name: data_left_name[2],
            data: data[2],
            tooltip: {
                valueDecimals: 0
            }
        }, {
            name: data_left_name[3],
            data: data[3],
            tooltip: {
                valueDecimals: 0
            }
        }, {
            name: data_left_name[4],
            data: data[4],
            tooltip: {
                valueDecimals: 0
            }
        }]
    });
}
