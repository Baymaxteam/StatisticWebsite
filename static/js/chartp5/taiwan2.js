var City_location_2 =1;
    virus_l_data = [],
    virus_l_data1 = [],
    virus_l_data2 = [],
    virus_l_data3 = [],
    virus_l_data4 = [],
    virus_l_data5 = [],
    virus_l_data6 = [],

    virus_l_array = [virus_l_data1, virus_l_data2,virus_l_data3,virus_l_data4,virus_l_data5,virus_l_data6];

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
        var titleList = respons.title;
        var sensorData = respons.data;
        var sensorStatList = respons.statList;

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        for (var i = 0; i < titleList.length; i++) {
            SelectTableHeader.push({ title: titleList[i] });
        };

        // 整理sensor data
        for (i = 0; i < len; i++) {
            virus_l_data1.push(sensorData[i][0]);
            virus_l_data2.push(sensorData[i][1]);
            virus_l_data3.push(sensorData[i][2]);
            virus_l_data4.push(sensorData[i][3]);
            virus_l_data5.push(sensorData[i][4]);
            virus_l_data6.push(sensorData[i][5]);
        };
        virus_l_data.push(virus_l_data1,virus_l_data2,virus_l_data3,virus_l_data4,virus_l_data5,virus_l_data6);
        DEBUG("virus_l_data");
        DEBUG(virus_l_data);

        virus_taiwan($('#container12'), virus_l_array);
        virus_data_shift(sensorData,len);
        DEBUG("virus_r_data");
        DEBUG(virus_r_data);
        virus_taiwancompare($('#container13'), virus_r_array);

        //統計圖表
        $('#tableTaiwan2 table').DataTable({
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
        1264982400000,
        1265587200000,
        1266192000000,
        1266796800000,
        1267401600000,
        1268006400000,
        1268611200000,
        1269216000000,
        1269820800000,
        1270425600000,
        1271030400000,
        1271635200000,
        1272240000000,
        1272844800000,
        1273449600000,
        1274054400000,
        1274659200000,
        1275264000000,
        1275868800000,
        1276473600000,
        1277078400000,
        1277683200000,
        1278288000000,
        1278892800000,
        1279497600000,
        1280102400000,
        1280707200000,
        1281312000000,
        1281916800000,
        1282521600000,
        1283126400000,
        1283731200000,
        1284336000000,
        1284940800000,
        1285545600000,
        1286150400000,
        1286755200000,
        1287360000000,
        1287964800000,
        1288569600000,
        1289174400000,
        1289779200000,
        1290384000000,
        1290988800000,
        1291593600000,
        1292198400000,
        1292803200000,
        1293408000000,
        1294012800000,
        1294617600000,
        1295222400000,
        1295827200000,
        1296432000000,
        1297036800000,
        1297641600000,
        1298246400000,
        1298851200000,
        1299456000000,
        1300060800000,
        1300665600000,
        1301270400000,
        1301875200000,
        1302480000000,
        1303084800000,
        1303689600000,
        1304294400000,
        1304899200000,
        1305504000000,
        1306108800000,
        1306713600000,
        1307318400000,
        1307923200000,
        1308528000000,
        1309132800000,
        1309737600000,
        1310342400000,
        1310947200000,
        1311552000000,
        1312156800000,
        1312761600000,
        1313366400000,
        1313971200000,
        1314576000000,
        1315180800000,
        1315785600000,
        1316390400000,
        1316995200000,
        1317600000000,
        1318204800000,
        1318809600000,
        1319414400000,
        1320019200000,
        1320624000000,
        1321228800000,
        1321833600000,
        1322438400000,
        1323043200000,
        1323648000000,
        1324252800000,
        1324857600000,
        1325462400000,
        1326067200000,
        1326672000000,
        1327276800000,
        1327881600000,
        1328486400000,
        1329091200000,
        1329696000000,
        1330300800000,
        1330905600000,
        1331510400000,
        1332115200000,
        1332720000000,
        1333324800000,
        1333929600000,
        1334534400000,
        1335139200000,
        1335744000000,
        1336348800000,
        1336953600000,
        1337558400000,
        1338163200000,
        1338768000000,
        1339372800000,
        1339977600000,
        1340582400000,
        1341187200000,
        1341792000000,
        1342396800000,
        1343001600000,
        1343606400000,
        1344211200000,
        1344816000000,
        1345420800000,
        1346025600000,
        1346630400000,
        1347235200000,
        1347840000000,
        1348444800000,
        1349049600000,
        1349654400000,
        1350259200000,
        1350864000000,
        1351468800000,
        1352073600000,
        1352678400000,
        1353283200000,
        1353888000000,
        1354492800000,
        1355097600000,
        1355702400000,
        1356307200000,
        1356912000000,
        1357516800000,
        1358121600000,
        1358726400000,
        1359331200000,
        1359936000000,
        1360540800000,
        1361145600000,
        1361750400000,
        1362355200000,
        1362960000000,
        1363564800000,
        1364169600000,
        1364774400000,
        1365379200000,
        1365984000000,
        1366588800000,
        1367193600000,
        1367798400000,
        1368403200000,
        1369008000000,
        1369612800000,
        1370217600000,
        1370822400000,
        1371427200000,
        1372032000000,
        1372636800000,
        1373241600000,
        1373846400000,
        1374451200000,
        1375056000000,
        1375660800000,
        1376265600000,
        1376870400000,
        1377475200000,
        1378080000000,
        1378684800000,
        1379289600000,
        1379894400000,
        1380499200000,
        1381104000000,
        1381708800000,
        1382313600000,
        1382918400000,
        1383523200000,
        1384128000000,
        1384732800000,
        1385337600000,
        1385942400000,
        1386547200000,
        1387152000000,
        1387756800000,
        1388361600000,
        1388966400000,
        1389571200000,
        1390176000000,
        1390780800000,
        1391385600000,
        1391990400000,
        1392595200000,
        1393200000000,
        1393804800000,
        1394409600000,
        1395014400000,
        1395619200000,
        1396224000000,
        1396828800000,
        1397433600000,
        1398038400000,
        1398643200000,
        1399248000000,
        1399852800000,
        1400457600000,
        1401062400000,
        1401667200000,
        1402272000000,
        1402876800000,
        1403481600000,
        1404086400000,
        1404691200000,
        1405296000000,
        1405900800000,
        1406505600000,
        1407110400000,
        1407715200000,
        1408320000000,
        1408924800000,
        1409529600000,
        1410134400000,
        1410739200000,
        1411344000000,
        1411948800000,
        1412553600000,
        1413158400000,
        1413763200000,
        1414368000000,
        1414972800000,
        1415577600000,
        1416182400000,
        1416787200000,
        1417392000000,
        1417996800000,
        1418601600000,
        1419206400000,
        1419811200000,
        1420416000000,
        1421020800000,
        1421625600000,
        1422230400000,
        1422835200000,
        1423440000000,
        1424044800000,
        1424649600000,
        1425254400000,
        1425859200000,
        1426464000000,
        1427068800000,
        1427673600000,
        1428278400000,
        1428883200000,
        1429488000000,
        1430092800000,
        1430697600000,
        1431302400000,
        1431907200000,
        1432512000000,
        1433116800000,
        1433721600000,
        1434326400000,
        1434931200000,
        1435536000000,
        1436140800000,
        1436745600000,
        1437350400000,
        1437955200000,
        1438560000000,
        1439164800000,
        1439769600000,
        1440374400000,
        1440979200000,
        1441584000000,
        1442188800000,
        1442793600000,
        1443398400000,
        1444003200000,
        1444608000000,
        1445212800000,
        1445817600000,
        1446422400000,
        1447027200000,
        1447632000000,
        1448236800000,
        1448841600000,
        1449446400000,
        1450051200000,
        1450656000000,
        1451260800000,
        1451865600000,
        1452470400000,
        1453075200000,
        1453680000000,
        1454284800000,
        1454889600000,
        1455494400000,
        1456099200000,
        1456704000000,
        1457308800000,
        1457913600000,
        1458518400000,
        1459123200000,
        1459728000000,
        1460332800000,
        1460937600000,

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
            "hc-key": "tw-tp",
            
        },
        {
            "hc-key": "tw-hs",
            
        },
        {
            "hc-key": "tw-th",
            
        },
        {
            "hc-key": "tw-cs",
            
        },
        {
            "hc-key": "tw-kh",
            
        },
        {
            "hc-key": "tw-hl",
            
        },
        
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
                            // 忠明、埔里、線西
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
    if (locat === "New Taipei City") 
    {
        City_location_2 = 1;
        virus_name = "台北區";
    }
    else if (locat === "Hsinchu City") 
    {
        City_location_2 = 2;
        virus_name = "北區";
    }
    else if (locat === "Taichung City") 
    {
        City_location_2 = 3;
        virus_name = "中區";
    }
    else if (locat === "Chiayi City") 
    {
        City_location_2 = 4;
        virus_name = "南區";
    }
    else if (locat === "Kaohsiung City") 
    {
        City_location_2 = 5;
        virus_name = "高屏區";
    }
    else if (locat === "Hualien") 
    {
        City_location_2 = 6;
        virus_name = "東區";
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