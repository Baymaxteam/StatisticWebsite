$(function () {

    var updateFlag = false;
    var DEBUG_Log = false;
    var addPointIndex = 50;
    

    function DEBUG(printData) 
    {
        if (DEBUG_Log === true) 
        {
            console.log(printData)
        }
    }


    $.get('/ajax_selectFilePart2/', {
        'fileName': 'emergency.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data[0].length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        var titleList = respons.title;
        var sensorData = respons.data;
        var sensorStatList = respons.statList;
        var data = [];
        data1  = [],
        data2  = [],
        data3  = [],
        data4  = [],
        data5  = [],
        timeData = 
        [
            1104510000000,
            1136040000000,
            1167580000000,
            1199120000000,
            1230650000000,
            1262190000000,
            1293720000000,
            1325260000000,
            1356800000000,
            1388330000000,
            1419870000000 

        ];

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
        for (i = 0; i < len; i++) {
            data1.push([timeData[i],sensorData[0][i]]);
            data2.push([timeData[i],sensorData[1][i]]);
            data3.push([timeData[i],sensorData[2][i]]);
            data4.push([timeData[i],sensorData[3][i]]);
            data5.push([timeData[i],sensorData[4][i]]);
        };
        data.push(data1,data2,data3,data4,data5);

        emergency($('#container7'), data);

        
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


function emergency(DOM, data)
{
        // Create the chart
        DOM.highcharts('StockChart', {
            exporting: { 
                enabled: false 
            },

            rangeSelector : {
                selected : 5
            },

            title : {
                text : '急診數量'
            },

            scrollbar : {
                enabled : false
            },

            series : 
            [{
                name : '台北市',
                data : data[0],
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name: '台中市',
                data: data[1],
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name: '高雄市',
                data: data[2],
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name: '新北市',
                data: data[3],
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name: '花蓮市',
                data: data[4],
                tooltip: {
                    valueDecimals: 0
                }
            }]
        });
}
