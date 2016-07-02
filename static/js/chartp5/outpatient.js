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
        'fileName': 'outpatient.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data[0].length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        var h = respons.data.length;
        var sensorData = respons.data;
        var sensorStatList = respons.statList;
        var titleList = respons.title;
        var data = [],
            data1 = [];
        var data_left_name = [];
        var sum_row = 0;
        var sum_total = 0;
        var sum_d = [];
        var sum_t = [];


        DEBUG("sData");
        DEBUG(sensorData);
        
        for(i = 0; i<h; i++)
        {
            sum_row = 0;
            data_left_name.push(sensorData[i][0]);
            for(j = 1; j<len; j++)
            {
                sum_row = sum_row + sensorData[i][j];
            }
            sum_total = sum_total + sum_row;
            sum_d.push(sum_row);

        }
        for(i = 0; i<h; i++)
        {
            sum_t.push(100*sum_d[i]/sum_total);
        }

        for(i = 0; i<h; i++)
        {
            data1 = [];
            for(j = 1; j<len; j++)
            {
                data1.push([titleList[j],(100*sensorData[i][j]/sum_d[i])]);
            }
            data.push(data1);

        }
        
        DEBUG("Data");
        DEBUG(data);

        outpatient($('#container9'), sum_t, data, data_left_name);

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

function outpatient(DOM, data_t, data_d, names)
{
    DOM.highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'pie'
        },
        title: {
            text: '門診申報件數'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [{
            name: '縣市',
            colorByPoint: true,
            data: [{
                name: names[0],
                y: data_t[0],
                drilldown: names[0]
            },{
                name: names[1],
                y: data_t[1],
                drilldown: names[1]
            },{
                name: names[2],
                y: data_t[2],
                drilldown: names[2]
            },{
                name: names[3],
                y: data_t[3],
                drilldown: names[3]
            },{
                name: names[4],
                y: data_t[4],
                drilldown: names[4]
            },{
                name: names[5],
                y: data_t[5],
                drilldown: names[5]
            },{
                name: names[6],
                y: data_t[6],
                drilldown: names[6]
            },{
                name: names[7],
                y: data_t[7],
                drilldown: names[7]
            },{
                name: names[8],
                y: data_t[8],
                drilldown: names[8]
            },{
                name: names[9],
                y: data_t[9],
                drilldown: names[9]
            },{
                name: names[10],
                y: data_t[10],
                drilldown: names[10]
            },{
                name: names[11],
                y: data_t[11],
                drilldown: names[11]
            },{
                name: names[12],
                y: data_t[12],
                drilldown: names[12]
            },{
                name: names[13],
                y: data_t[13],
                drilldown: names[13]
            },{
                name: names[14],
                y: data_t[14],
                drilldown: names[14]
            },{
                name: names[15],
                y: data_t[15],
                drilldown: names[15]
            },{
                name: names[16],
                y: data_t[16],
                drilldown: names[16]
            },{
                name: names[17],
                y: data_t[17],
                drilldown: names[17]
            },{
                name: names[18],
                y: data_t[18],
                drilldown: names[18]
            },{
                name: names[19],
                y: data_t[19],
                drilldown: names[19]
            },{
                name: names[20],
                y: data_t[20],
                drilldown: names[20]
            },{
                name: names[21],
                y: data_t[21],
                drilldown: names[21]
            },{
                name: names[22],
                y: data_t[22],
                drilldown: names[22]
            }]
        }],
        drilldown: {
            series: [
            {
                name: names[0],
                id: names[0],
                data:data_d[0]
            },{
                name: names[1],
                id: names[1],
                data:data_d[1]
            },{
                name: names[2],
                id: names[2],
                data:data_d[2]
            },{
                name: names[3],
                id: names[3],
                data:data_d[3]
            },{
                name: names[4],
                id: names[4],
                data:data_d[4]
            },{
                name: names[5],
                id: names[5],
                data:data_d[5]
            },{
                name: names[6],
                id: names[6],
                data:data_d[6]
            },{
                name: names[7],
                id: names[7],
                data:data_d[7]
            },{
                name: names[8],
                id: names[8],
                data:data_d[8]
            },{
                name: names[9],
                id: names[9],
                data:data_d[9]
            },{
                name: names[10],
                id: names[10],
                data:data_d[10]
            },{
                name: names[11],
                id: names[11],
                data:data_d[11]
            },{
                name: names[12],
                id: names[12],
                data:data_d[12]
            },{
                name: names[13],
                id: names[13],
                data:data_d[13]
            },{
                name: names[14],
                id: names[14],
                data:data_d[14]
            },{
                name: names[15],
                id: names[15],
                data:data_d[15]
            },{
                name: names[16],
                id: names[16],
                data:data_d[16]
            },{
                name: names[17],
                id: names[17],
                data:data_d[17]
            },{
                name: names[18],
                id: names[18],
                data:data_d[18]
            },{
                name: names[19],
                id: names[19],
                data:data_d[19]
            },{
                name: names[20],
                id: names[20],
                data:data_d[20]
            },{
                name: names[21],
                id: names[21],
                data:data_d[21]
            },{
                name: names[22],
                id: names[22],
                data:data_d[22]
            }]
        }
    });
}