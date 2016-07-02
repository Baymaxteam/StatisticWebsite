var City_location_1 =1;
    heavy_l_data = [],
    heavy_l_data1 = [],
    heavy_l_data2 = [],
    heavy_l_data3 = [],
    heavy_l_data4 = [],
    heavy_l_data5 = [],
    heavy_l_data6 = [],
    heavy_l_data7 = [],
    heavy_l_data8 = [],
    heavy_l_data9 = [],
    heavy_l_data10 = [],
    heavy_l_data11 = [],
    heavy_l_data12 = [],
    heavy_l_data13 = [],
    heavy_l_data14 = [],
    heavy_l_data15 = [],
    heavy_l_data16 = [],
    heavy_l_data17 = [],
    heavy_l_data18 = [],
    heavy_l_data19 = [],
    heavy_l_data20 = [],
    heavy_l_data21 = [],
    heavy_l_data22 = [],
    heavy_l_array = [];

    tc_data = [],
    tc_data1 = [],
    tc_data2 = [],
    tc_data3 = [],
    tc_data4 = [],
    tc_data5 = [],
    tc_data6 = [],
    tc_data7 = [],
    tc_data8 = [],
    tc_data9 = [],
    tc_data10 = [],
    tc_data11 = [],
    tc_data12 = [],
    tc_data13 = [],
    tc_data14 = [],
    tc_data15 = [],
    tc_data16 = [],
    tc_data17 = [],
    tc_data18 = [],
    tc_data19 = [],
    tc_data20 = [],
    tc_data21 = [],
    tc_data22 = [],
    data_array = 
    {tc_data1, tc_data2,tc_data3,tc_data4,tc_data5,tc_data6,tc_data7,tc_data8,tc_data9,tc_data10,
     tc_data11,tc_data12,tc_data13,tc_data14,tc_data15,tc_data16,tc_data17,tc_data18,tc_data19,tc_data20,
     tc_data21,tc_data22};   

    heavy_data_name = "Taipei";  

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
        'fileName': 'taiwan.csv'
    }, function(respons) {
        DEBUG("Server response the json data : ");
        DEBUG(respons);
        var len = respons.data.length;
        var h = respons.data.length;
        var titleList = respons.title;
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        
        var sensorData = respons.data;
        var sensorStatList = respons.statList;

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        for (var i = 0; i < 11; i++) {
            SelectTableHeader.push({ title: titleList[i] });
        }
        var SelectTableHeader1 = [];
        SelectTableHeader1.push({ title: '統計量' });
        for (var i = 11; i < titleList.length; i++) {
            SelectTableHeader1.push({ title: titleList[i] });
        }
        // 整理sensor data
        for (i = 0; i < len; i++) {
            heavy_l_data1.push(sensorData[i][0]);
            heavy_l_data2.push(sensorData[i][1]);
            heavy_l_data3.push(sensorData[i][2]);
            heavy_l_data4.push(sensorData[i][3]);
            heavy_l_data5.push(sensorData[i][4]);
            heavy_l_data6.push(sensorData[i][5]);
            heavy_l_data7.push(sensorData[i][6]);
            heavy_l_data8.push(sensorData[i][7]);
            heavy_l_data9.push(sensorData[i][8]);
            heavy_l_data10.push(sensorData[i][9]);
            heavy_l_data11.push(sensorData[i][10]);
            heavy_l_data12.push(sensorData[i][11]);
            heavy_l_data13.push(sensorData[i][12]);
            heavy_l_data14.push(sensorData[i][13]);
            heavy_l_data15.push(sensorData[i][14]);
            heavy_l_data16.push(sensorData[i][15]);
            heavy_l_data17.push(sensorData[i][16]);
            heavy_l_data18.push(sensorData[i][17]);
            heavy_l_data19.push(sensorData[i][18]);
            heavy_l_data20.push(sensorData[i][19]);
            heavy_l_data21.push(sensorData[i][20]);
            heavy_l_data22.push(sensorData[i][21]);
        };
        heavy_l_array.push(heavy_l_data1,heavy_l_data2,heavy_l_data3,heavy_l_data4,heavy_l_data5,heavy_l_data6,heavy_l_data7,heavy_l_data8,heavy_l_data9,heavy_l_data10,heavy_l_data11,heavy_l_data12,heavy_l_data13,heavy_l_data14,heavy_l_data15,heavy_l_data16,heavy_l_data17,heavy_l_data18,heavy_l_data19,heavy_l_data20,heavy_l_data21,heavy_l_data22);
        DEBUG("heavy_l_data");
        DEBUG(heavy_l_data);

        var k = 0;
        taiwan($('#container'), heavy_l_array);
        setInterval(function () 
        {

            data_shift(k,sensorData,len);
            k = k+1;
            if (k==(len-12))
                k = 0;
            taiwancompare($('#container1'), data_array);
        }, 3000);

        //統計圖表
        $('#tableTaiwan table').DataTable({
            data: sensorStatList,
            columns: SelectTableHeader,
            columnDefs: [{

                width: '10%',
                targets: 0
            }], //fix width
            "bAutoWidth": false,
            "bFilter": false
        });
        $('#tableTaiwan1 table').DataTable({
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

function data_shift(loop, sensorData, len)
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


    tc_data = [];
    tc_data1 = [],
    tc_data2 = [],
    tc_data3 = [],
    tc_data4 = [],
    tc_data5 = [],
    tc_data6 = [],
    tc_data7 = [],
    tc_data8 = [],
    tc_data9 = [],
    tc_data10 = [],
    tc_data11 = [],
    tc_data12 = [],
    tc_data13 = [],
    tc_data14 = [],
    tc_data15 = [],
    tc_data16 = [],
    tc_data17 = [],
    tc_data18 = [],
    tc_data19 = [],
    tc_data20 = [],
    tc_data21 = [],
    tc_data22 = [];
    for (i = loop; i < loop+12; i++) {
                tc_data1.push([time_data[i],sensorData[i][0]]);
                tc_data2.push([time_data[i],sensorData[i][1]]);
                tc_data3.push([time_data[i],sensorData[i][2]]);
                tc_data4.push([time_data[i],sensorData[i][3]]);
                tc_data5.push([time_data[i],sensorData[i][4]]);
                tc_data6.push([time_data[i],sensorData[i][5]]);
                tc_data7.push([time_data[i],sensorData[i][6]]);
                tc_data8.push([time_data[i],sensorData[i][7]]);
                tc_data9.push([time_data[i],sensorData[i][8]]);
                tc_data10.push([time_data[i],sensorData[i][9]]);
                tc_data11.push([time_data[i],sensorData[i][10]]);
                tc_data12.push([time_data[i],sensorData[i][11]]);
                tc_data13.push([time_data[i],sensorData[i][12]]);
                tc_data14.push([time_data[i],sensorData[i][13]]);
                tc_data15.push([time_data[i],sensorData[i][14]]);
                tc_data16.push([time_data[i],sensorData[i][15]]);
                tc_data17.push([time_data[i],sensorData[i][16]]);
                tc_data18.push([time_data[i],sensorData[i][17]]);
                tc_data19.push([time_data[i],sensorData[i][18]]);
                tc_data20.push([time_data[i],sensorData[i][19]]);
                tc_data21.push([time_data[i],sensorData[i][20]]);
                tc_data22.push([time_data[i],sensorData[i][21]]);

            };
    tc_data.push(tc_data1,tc_data2,tc_data3,tc_data4,tc_data5,tc_data6,tc_data7,tc_data8,tc_data9,tc_data10,tc_data11,tc_data12,tc_data13,tc_data14,tc_data15,tc_data16,tc_data17,tc_data18,tc_data19,tc_data20,tc_data21,tc_data22);
    data_array = 
    {tc_data1, tc_data2,tc_data3,tc_data4,tc_data5,tc_data6,tc_data7,tc_data8,tc_data9,tc_data10,
     tc_data11,tc_data12,tc_data13,tc_data14,tc_data15,tc_data16,tc_data17,tc_data18,tc_data19,tc_data20,
     tc_data21,tc_data22};
};

function taiwan(DOM, data_1, week)
{
      var count = 0;
    // Prepare demo data
    var data = [
        {
            "hc-key": "tw-cl",
            "value": 0
        },
        {
            "hc-key": "tw-tw",
            "value": 0
        },
        {
            "hc-key": "tw-tp",
            "value": 0
        },
        {
            "hc-key": "tw-ty",
            "value": 0
        },
        {
            "hc-key": "tw-hs",
            "value": 0
        },
        {
            "hc-key": "tw-hh",
            "value": 0
        },
        {
            "hc-key": "tw-ml",
            "value": 0
        },
        {
            "hc-key": "tw-th",
            "value": 0
        },
        {
            "hc-key": "tw-nt",
            "value": 0
        },
        {
            "hc-key": "tw-cg",
            "value": 0
        },
        {
            "hc-key": "tw-yl",
            "value": 0
        },
        {
            "hc-key": "tw-cs",
            "value": 0
        },
        {
            "hc-key": "tw-ch",
            "value": 0
        },
        {
            "hc-key": "tw-tn",
            "value": 0
        },
        {
            "hc-key": "tw-kh",
            "value": 0
        },
        {
            "hc-key": "tw-pt",
            "value": 0
        },
        {
            "hc-key": "tw-il",
            "value": 0
        },
        {
            "hc-key": "tw-hl",
            "value": 0
        },
        {
            "hc-key": "tw-tt",
            "value": 0
        },
        {
            "hc-key": "tw-km",
            "value": 0
        },
        {
            "hc-key": "tw-lk",
            "value": 0
        },
        {
            "hc-key": "tw-ph",
            "value": 0
        }
    ];

    // Initiate the chart
    DOM.highcharts('Map', {
        exporting: { 
            enabled: false 
        },
        title : {
            text : '26縣市流感併發重症'
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
                            // 忠明、埔里、線西
                            sendlocation(CityName);
                            
                        }

                    }
                }
            }
        },
        series : [{
            data : data,
            mapData: Highcharts.maps['countries/tw/tw-all'],
            joinBy: 'hc-key',
            name: '重症人數',
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


    },

        function (chart) 
        {   var week=0;        
            if (!chart.renderer.forExport) 
            {
                setInterval(function () 
                {
                    var point = chart.series[0].points[0],
                        newVal = 0;
                    for(loop = 0; loop< 22; loop++)
                    {
                        point = chart.series[0].points[loop];
                        newVal = data_1[loop][week];
                        point.update(newVal);
                    }
                    week++;
                    if (week == 82)
                        week = 0;
                    }, 3000);
            }
        }
    );
};



function sendlocation(locat)
{
    if (locat === "Keelung City") 
    {
        City_location_1 = 1;
        heavy_data_name = "Keelung City";
    }
    else if (locat === "Taipei City") 
    {
        City_location_1 = 2;
        heavy_data_name = "Taipei City";
    }
    else if (locat === "New Taipei City") 
    {
        City_location_1 = 3;
        heavy_data_name = "New Taipei City";
    }
    else if (locat === "Taoyuan") 
    {
        City_location_1 = 4;
        heavy_data_name = "Taoyuan";
    }
    else if (locat === "Hsinchu City") 
    {
        City_location_1 = 5;
        heavy_data_name = "Hsinchu City";
    }
    else if (locat === "Hsinchu") 
    {
        City_location_1 = 6;
        heavy_data_name = "Hsinchu";
    }
    else if (locat === "Miaoli") 
    {
        City_location_1 = 7;
        heavy_data_name = "Miaoli";
    }
    else if (locat === "Taichung City") 
    {
        City_location_1 = 8;
        heavy_data_name = "Taichung City";
    }
    else if (locat === "Nantou") 
    {
        City_location_1 = 9;
        heavy_data_name = "Nantou";
    }
    else if (locat === "Changhua") 
    {
        City_location_1 = 10;
        heavy_data_name = "Changhua";
    }
    else if (locat === "Chiayi City") 
    {
        City_location_1 = 11;
        heavy_data_name = "Chiayi City";
    }
    else if (locat === "Chiayi") 
    {
        City_location_1 = 12;
        heavy_data_name = "Chiayi";
    }
    else if (locat === "Yunlin") 
    {
        City_location_1 = 13;
        heavy_data_name = "Yunlin";
    }
    else if (locat === "Tainan City") 
    {
        City_location_1 = 14;
        heavy_data_name = "Tainan City";
    }
    else if (locat === "Kaohsiung City") 
    {
        City_location_1 = 15;
        heavy_data_name = "Kaohsiung City";
    }
    else if (locat === "Pingtung") 
    {
        City_location_1 = 16;
        heavy_data_name = "Pingtung";
    }
    else if (locat === "Yilan") 
    {
        City_location_1 = 17;
        heavy_data_name = "Yilan";
    }
    else if (locat === "Hualien") 
    {
        City_location_1 = 18;
        heavy_data_name = "Hualien";
    }
    else if (locat === "Taitung") 
    {
        City_location_1 = 19;
        heavy_data_name = "Taitung";
    }
    else if (locat === "Kinmen") 
    {
        City_location_1 = 20;
        heavy_data_name = "Kinmen";
    }
    else if (locat === "Penghu") 
    {
        City_location_1 = 21;
        heavy_data_name = "Penghu";
    }
    else if (locat === "Lienchiang") 
    {
        City_location_1 = 22;
        heavy_data_name = "Lienchiang";
    }
};
function taiwancompare(DOM, A)
{
    if (City_location_1 === 1)
        A.tc_data = A.tc_data1;
    else if (City_location_1 === 2)
        A.tc_data = A.tc_data2;
    else if (City_location_1 === 3)
        A.tc_data = A.tc_data3;
    else if (City_location_1 === 4)
        A.tc_data = A.tc_data4;
    else if (City_location_1 === 5)
        A.tc_data = A.tc_data5;
    else if (City_location_1 === 6)
        A.tc_data = A.tc_data6;
    else if (City_location_1 === 7)
        A.tc_data = A.tc_data7;
    else if (City_location_1 === 8)
        A.tc_data = A.tc_data8;
    else if (City_location_1 === 9)
        A.tc_data = A.tc_data9;
    else if (City_location_1 === 10)
        A.tc_data = A.tc_data10;
    else if (City_location_1 === 11)
        A.tc_data = A.tc_data11;
    else if (City_location_1 === 12)
        A.tc_data = A.tc_data12;
    else if (City_location_1 === 13)
        A.tc_data = A.tc_data13;
    else if (City_location_1 === 14)
        A.tc_data = A.tc_data14;
    else if (City_location_1 === 15)
        A.tc_data = A.tc_data15;
    else if (City_location_1 === 16)
        A.tc_data = A.tc_data16;
    else if (City_location_1 === 17)
        A.tc_data = A.tc_data17;
    else if (City_location_1 === 18)
        A.tc_data = A.tc_data18;
    else if (City_location_1 === 19)
        A.tc_data = A.tc_data19;
    else if (City_location_1 === 20)
        A.tc_data = A.tc_data20;
    else if (City_location_1 === 21)
        A.tc_data = A.tc_data21;
    else if (City_location_1 === 22)
        A.tc_data = A.tc_data22;
    DOM.highcharts('StockChart', {
            exporting: { 
                enabled: false 
            },

            rangeSelector : {
                selected : 5
            },
/*            chart: {
                type: 'area'
            },*/
            title : {
                text : '26縣市流感併發重症('+heavy_data_name+')'
            },

            scrollbar : {
                enabled : false
            },

            series : 
            [
                {
                name : heavy_data_name,
                data : A.tc_data,
                tooltip: {
                    valueDecimals: 0
                }
            }]
        });
}