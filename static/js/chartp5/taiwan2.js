var City_location_2 =1;
    virus_l_data = [],
    virus_l_data1 = [],
    virus_l_data2 = [],
    virus_l_data3 = [],
    virus_l_data4 = [],
    virus_l_data5 = [],
    virus_l_data6 = [],

    virus_l_array = [];

    virus_r_data = [],
    virus_r_data1 = [],
    virus_r_data2 = [],
    virus_r_data3 = [],
    virus_r_data4 = [],
    virus_r_data5 = [],
    virus_r_data6 = [];

    virus_r_array = 
    {virus_r_data1, virus_r_data2,virus_r_data3,virus_r_data4,virus_r_data5,virus_r_data6};   

    virus_name = "台北區";  
   
$(function () {
    var updateFlag = false;
    var DEBUG_Log = true;
    var addPointIndex = 50;
    
    function DEBUG(printData) 
    {
        if (DEBUG_Log === true) 
        {
            console.log(printData)
        }
    }


    $.get('/ajax_selectFilePart2/', {
        'fileName': 'virus.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data.length;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        
        var sensorData = respons.data;
        var sensorStatList = respons.statList;


        // 整理sensor data
        for (i = 0; i < len; i++) {
            virus_l_data1.push(sensorData[i][0]);
            virus_l_data2.push(sensorData[i][1]);
            virus_l_data3.push(sensorData[i][2]);
            virus_l_data4.push(sensorData[i][3]);
            virus_l_data5.push(sensorData[i][4]);
            virus_l_data6.push(sensorData[i][5]);
        };
        virus_l_array.push(virus_l_data1,virus_l_data2,virus_l_data3,virus_l_data4,virus_l_data5,virus_l_data6);
        DEBUG("virus_l_data");
        DEBUG(virus_l_data);

        virus_taiwan($('#container12'), virus_l_array);
        virus_data_shift(sensorData,len);
        
        virus_taiwancompare($('#container13'), virus_r_array);

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

function virus_data_shift(sensorData, len)
{
    var time_data = 
    [
        1264953540000,
        1267372740000,
        1270051140000,
        1272643140000,
        1275321540000,
        1277913540000,
        1280591940000,
        1283270340000,
        1285862340000,
        1288540740000,
        1291132740000,
        1293811140000,
        1296489540000,
        1298908740000,
        1301587140000,
        1304179140000,
        1306857540000,
        1309449540000,
        1312127940000,
        1314806340000,
        1317398340000,
        1320076740000,
        1322668740000,
        1325347140000,
        1328025540000,
        1330531140000,
        1333209540000,
        1335801540000,
        1338479940000,
        1341071940000,
        1343750340000,
        1346428740000,
        1349020740000,
        1351699140000,
        1354291140000,
        1356969540000,
        1359647940000,
        1362067140000,
        1364745540000,
        1367337540000,
        1370015940000,
        1372607940000,
        1375286340000,
        1377964740000,
        1380556740000,
        1383235140000,
        1385827140000,
        1388505540000,
        1391183940000,
        1393603140000,
        1396281540000,
        1398873540000,
        1401551940000,
        1404143940000,
        1406822340000,
        1409500740000,
        1412092740000,
        1414771140000,
        1417363140000,
        1420041540000,
        1422719940000,
        1425139140000,
        1427817540000,
        1430409540000,
        1433087940000,
        1435679940000,
        1438358340000,
        1441036740000,
        1443628740000,
        1446307140000,
        1448899140000,
        1451577540000,
        1454255940000,
        1456761540000,
        1459439940000,
        1462031940000,
        1464710340000,
        1467302340000,
        1469980740000,
        1472659140000,
        1475251140000,
        1477929540000,
        1480521540000,
        1483199940000,

    ];


    virus_r_data = [];
    virus_r_data1 = [],
    virus_r_data2 = [],
    virus_r_data3 = [],
    virus_r_data4 = [],
    virus_r_data5 = [],
    virus_r_data6 = [];
    
    for (i = 0; i < len; i++) {
                virus_r_data1.push([time_data[i],sensorData[i][0]]);
                virus_r_data2.push([time_data[i],sensorData[i][1]]);
                virus_r_data3.push([time_data[i],sensorData[i][2]]);
                virus_r_data4.push([time_data[i],sensorData[i][3]]);
                virus_r_data5.push([time_data[i],sensorData[i][4]]);
                virus_r_data6.push([time_data[i],sensorData[i][5]]);
                

            };
    virus_r_data.push(virus_r_data1,virus_r_data2,virus_r_data3,virus_r_data4,virus_r_data5,virus_r_data6);
    virus_r_array = 
    {virus_r_data1, virus_r_data2,virus_r_data3,virus_r_data4,virus_r_data5,virus_r_data6};
};

function virus_taiwan(DOM, data_1, week)
{
      var count = 0;
    // Prepare demo data
    var data = [
        {
            "hc-key": "tw-cl",

        },
        {
            "hc-key": "tw-tw",
            
        },
        {
            "hc-key": "tw-tp",
            
        },
        {
            "hc-key": "tw-ty",
            
        },
        {
            "hc-key": "tw-hs",
            
        },
        {
            "hc-key": "tw-hh",
            
        },
        {
            "hc-key": "tw-ml",
            
        },
        {
            "hc-key": "tw-th",
            
        },
        {
            "hc-key": "tw-nt",
            
        },
        {
            "hc-key": "tw-cg",
            
        },
        {
            "hc-key": "tw-yl",
            
        },
        {
            "hc-key": "tw-cs",
            
        },
        {
            "hc-key": "tw-ch",
            
        },
        {
            "hc-key": "tw-tn",
            
        },
        {
            "hc-key": "tw-kh",
            
        },
        {
            "hc-key": "tw-pt",
            
        },
        {
            "hc-key": "tw-il",
            
        },
        {
            "hc-key": "tw-hl",
            
        },
        {
            "hc-key": "tw-tt",
            
        },
        {
            "hc-key": "tw-km",
            
        },
        {
            "hc-key": "tw-lk",
            
        },
        {
            "hc-key": "tw-ph",
            
        }
    ];

    // Initiate the chart
    DOM.highcharts('Map', {
        exporting: { 
            enabled: false 
        },
        title : {
            text : '急診腸病毒'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {
                            // alert(this.name);
                            var CityName = this.name;
                            console.log(CityName);
                            // 宗明、埔里、線西
                            virus_sendlocation(CityName);
                            
                        }

                    }
                }
            }
        },
        series : [{
            data : data,
            mapData: Highcharts.maps['countries/tw/tw-all'],
            joinBy: 'hc-key',
            name: '急診腸病毒人數',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]


    }
    );
};



function virus_sendlocation(locat)
{
    if (locat === "Keelung City") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    else if (locat === "Taipei City") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    else if (locat === "New Taipei City") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    else if (locat === "Taoyuan") 
    {
        City_location_2 = 2;
        virus_name = "北區";
    }
    else if (locat === "Hsinchu City") 
    {
        City_location_2 = 2;
        virus_name = "北區";
    }
    else if (locat === "Hsinchu") 
    {
        City_location_2 = 2;
        virus_name = "北區";
    }
    else if (locat === "Miaoli") 
    {
        City_location_2 = 2;
        virus_name = "北區";
    }
    else if (locat === "Taichung City") 
    {
        City_location_2 = 3;
        virus_name = "中區";
    }
    else if (locat === "Nantou") 
    {
        City_location_2 = 3;
        virus_name = "中區";
    }
    else if (locat === "Changhua") 
    {
        City_location_2 = 3;
        virus_name = "中區";
    }
    else if (locat === "Chiayi City") 
    {
        City_location_2 = 4;
        virus_name = "南區";
    }
    else if (locat === "Chiayi") 
    {
        City_location_2 = 4;
        virus_name = "南區";
    }
    else if (locat === "Yunlin") 
    {
        City_location_2 = 4;
        virus_name = "南區";
    }
    else if (locat === "Tainan City") 
    {
        City_location_2 = 4;
        virus_name = "南區";
    }
    else if (locat === "Kaohsiung City") 
    {
        City_location_2 = 5;
        virus_name = "高屏區";
    }
    else if (locat === "Pingtung") 
    {
        City_location_2 = 5;
        virus_name = "高屏區";
    }
    else if (locat === "Yilan") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    else if (locat === "Hualien") 
    {
        City_location_2 = 6;
        virus_name = "東區";
    }
    else if (locat === "Taitung") 
    {
        City_location_2 = 6;
        virus_name = "東區";
    }
    else if (locat === "Kinmen") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    else if (locat === "Penghu") 
    {
        City_location_2 = 5;
        virus_name = "高屏區";
    }
    else if (locat === "Lienchiang") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    virus_taiwancompare($('#container13'), virus_r_array);
};
function virus_taiwancompare(DOM, A)
{
    if (City_location_2 === 1)
        A.virus_r_data = A.virus_r_data1;
    else if (City_location_2 === 2)
        A.virus_r_data = A.virus_r_data2;
    else if (City_location_2 === 3)
        A.virus_r_data = A.virus_r_data3;
    else if (City_location_2 === 4)
        A.virus_r_data = A.virus_r_data4;
    else if (City_location_2 === 5)
        A.virus_r_data = A.virus_r_data5;
    else if (City_location_2 === 6)
        A.virus_r_data = A.virus_r_data6;
    
    DOM.highcharts('StockChart', {
            exporting: { 
                enabled: false 
            },

            rangeSelector : {
                selected : 5
            },
            chart: {
                type: 'area'
            },
            title : {
                text : '急診腸病毒('+virus_name+')'
            },

            scrollbar : {
                enabled : false
            },

            series : 
            [
                {
                name : virus_name,
                data : A.virus_r_data,
                tooltip: {
                    valueDecimals: 0
                }
            }]
        });
}