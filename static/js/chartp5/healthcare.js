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
        'fileName': 'healthcare.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len_width = respons.data[0].length;
        var len_height = respons.data.length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        
        var sensorData = respons.data;
        var sensorStatList = respons.statList;
        var titleList = respons.title;
        var data = [],
            data1 = [],
            data_left_name = [],
            data_top_name = [];
        // 整理sensor data
        for(i = 0; i< len_height; i++)
        {
            data_left_name.push(sensorData[i][0]);
            for (j = 2; j < len_width; j++) 
            {
                data1.push(sensorData[i][j]);
                if (i ==0)
                    data_top_name[j-2] = titleList[j];
            };
            data.push(data1);
            data1=[];
        }

        // for (i = 2; i < len_width; i++) 
        // {
        //     data_top_name.push(sensorData[0][i]);
        // };

        healthcare($('#container11'), data, data_left_name, data_top_name);

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        SelectTableHeader.push({ title: 'Sensor1' });
        SelectTableHeader.push({ title: 'Sensor2' });
        SelectTableHeader.push({ title: 'Sensor3' });
        SelectTableHeader.push({ title: 'Sensor4' });
        SelectTableHeader.push({ title: 'Sensor5' });
        //統計圖表
        $('#tableStat table').DataTable({
            data: sensorStatList,
            columns: SelectTableHeader,
            columnDefs: [{

                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });

    });


});

function healthcare(DOM, data, left_name, top_name)
{
    var names = left_name;

    DOM.highcharts({
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
            categories: top_name
            
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
        series: [
        {
            name: names[0],
            data: data[0],
        }, {
            name: names[1],
            data: data[1],
        }, {
            name: names[2],
            data: data[2],
        }, {
            name: names[3],
            data: data[3],
        }, {
            name: names[4],
            data: data[4],
        }, {
            name: names[5],
            data: data[5],
        }, {
            name: names[6],
            data: data[6],
        }, {
            name: names[7],
            data: data[7],
        }, {
            name: names[8],
            data: data[8],
        }, {
            name: names[9],
            data: data[9],
        }, {
            name: names[10],
            data: data[10],
        }, {
            name: names[11],
            data: data[11],
        },{
            name: names[12],
            data: data[12],
        }, {
            name: names[13],
            data: data[13],
        }, {
            name: names[14],
            data: data[14],
        }, {
            name: names[15],
            data: data[15],
        }, {
            name: names[16],
            data: data[16],
        }, {
            name: names[17],
            data: data[17],
        }, {
            name: names[18],
            data: data[18],
        }, {
            name: names[19],
            data: data[19],
        }, {
            name: names[20],
            data: data[20],
        }, {
            name: names[21],
            data: data[21],
        }]
    });
}