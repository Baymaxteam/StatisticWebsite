$(function () {
    var updateFlag = false;
    var DEBUG_Log = false;
    var addPointIndex = 50;
    var names_count=
    [

        '出院人次',
        '住院健檢人次',
        '手術人次',
        '門診手術人次',
        '住院手術人次',
        '門診人次',
        '急診人次',
        '門診體檢人次',
        '接生人次(含剖腹產)',
        '剖腹產人次',
        '血液透析人次',
        
    ];

    function DEBUG(printData) 
    {
        if (DEBUG_Log === true) 
        {
            console.log(printData)
        }
    }


    $.get('/ajax_selectFilePart2/', {
        'fileName': 'service.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data[0].length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        var h = respons.data.length;
        var sensorData = respons.data;
        var percentData = [];
        var sensorStatList = respons.statList;
        var data = [];
        data1 = [],
        data2 = [],
        data3 = [],
        data4 = [],
        data5 = [],
        data6 = [],
        data7 = [],
        data8 = [],
        data9 = [],
        data10 = [],
        data11 = [],
        data12 = [],
        data13 = [],
        data14 = [],
        data15 = [],
        data16 = [],
        data17 = [],
        data18 = [],
        data19 = [],
        data20 = [],
        data21 = [],
        data22 = [];

        var sum = 0;
        var A=0;

        DEBUG("sData");
        DEBUG(sensorData);
        
        for (i = 0; i < len; i++) 
        {
            if(i == 0)
            {
                for (j=0; j<22; j++)
                {
                    sum = sum + sensorData[j][0];

                };

                for(k=0 ; k<22; k++)
                {
                    percentData.push([(100*sensorData[k][0])/sum]);
                };
                sum = 0;
            }
            else
            {
                for(k=0 ; k<22; k++)
                {
                    percentData[k][i]=(100*(sensorData[k][i])/(sensorData[k][0]));
                };
                
            }

        };
        
        // 整理sensor data

        DEBUG("pData");
        DEBUG(percentData);

        for (i=0; i<(len-1); i++)
        {
            data1.push([names_count[i],percentData[0][i+1]]);
            data2.push([names_count[i],percentData[1][i+1]]);
            data3.push([names_count[i],percentData[2][i+1]]);
            data4.push([names_count[i],percentData[3][i+1]]);
            data5.push([names_count[i],percentData[4][i+1]]);
            data6.push([names_count[i],percentData[5][i+1]]);
            data7.push([names_count[i],percentData[6][i+1]]);
            data8.push([names_count[i],percentData[7][i+1]]);
            data9.push([names_count[i],percentData[8][i+1]]);
            data10.push([names_count[i],percentData[9][i+1]]);
            data11.push([names_count[i],percentData[10][i+1]]);
            data12.push([names_count[i],percentData[11][i+1]]);
            data13.push([names_count[i],percentData[12][i+1]]);
            data14.push([names_count[i],percentData[13][i+1]]);
            data15.push([names_count[i],percentData[14][i+1]]);
            data16.push([names_count[i],percentData[15][i+1]]);
            data17.push([names_count[i],percentData[16][i+1]]);
            data18.push([names_count[i],percentData[17][i+1]]);
            data19.push([names_count[i],percentData[18][i+1]]);
            data20.push([names_count[i],percentData[19][i+1]]);
            data21.push([names_count[i],percentData[20][i+1]]);
            data22.push([names_count[i],percentData[21][i+1]]);

        }

        data.push(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22);

        DEBUG("Data");
        DEBUG(data);

        service($('#container10'), percentData, data);

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

function service(DOM, data_t, data_d)
{
    var names =
    [
        '臺北市',
        '臺中市',
        '臺南市',
        '高雄市',
        '基隆市',
        '新竹市',
        '嘉義市',
        '新北市',
        '桃園市',
        '新竹縣',
        '宜蘭縣',
        '苗栗縣',
        '彰化縣',
        '南投縣',
        '雲林縣',
        '嘉義縣',
        '屏東縣',
        '澎湖縣',
        '花蓮縣',
        '臺東縣',
        '金門縣',
        '連江縣',

    ];
    DOM.highcharts({
        exporting: { 
            enabled: false 
        },
        chart: {
            type: 'column'
        },
        title: {
            text: '服務量'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
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
                y: data_t[0][0],
                drilldown: names[0]
            },{
                name: names[1],
                y: data_t[1][0],
                drilldown: names[1]
            },{
                name: names[2],
                y: data_t[2][0],
                drilldown: names[2]
            },{
                name: names[3],
                y: data_t[3][0],
                drilldown: names[3]
            },{
                name: names[4],
                y: data_t[4][0],
                drilldown: names[4]
            },{
                name: names[5],
                y: data_t[5][0],
                drilldown: names[5]
            },{
                name: names[6],
                y: data_t[6][0],
                drilldown: names[6]
            },{
                name: names[7],
                y: data_t[7][0],
                drilldown: names[7]
            },{
                name: names[8],
                y: data_t[8][0],
                drilldown: names[8]
            },{
                name: names[9],
                y: data_t[9][0],
                drilldown: names[9]
            },{
                name: names[10],
                y: data_t[10][0],
                drilldown: names[10]
            },{
                name: names[11],
                y: data_t[11][0],
                drilldown: names[11]
            },{
                name: names[12],
                y: data_t[12][0],
                drilldown: names[12]
            },{
                name: names[13],
                y: data_t[13][0],
                drilldown: names[13]
            },{
                name: names[14],
                y: data_t[14][0],
                drilldown: names[14]
            },{
                name: names[15],
                y: data_t[15][0],
                drilldown: names[15]
            },{
                name: names[16],
                y: data_t[16][0],
                drilldown: names[16]
            },{
                name: names[17],
                y: data_t[17][0],
                drilldown: names[17]
            },{
                name: names[18],
                y: data_t[18][0],
                drilldown: names[18]
            },{
                name: names[19],
                y: data_t[19][0],
                drilldown: names[19]
            },{
                name: names[20],
                y: data_t[20][0],
                drilldown: names[20]
            },{
                name: names[21],
                y: data_t[21][0],
                drilldown: names[21]
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
            }]
        }
    });
}