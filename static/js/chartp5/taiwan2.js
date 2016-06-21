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
        1262332800000,
        1262937600000,
        1263542400000,
        1264147200000,
        1264752000000,
        1265356800000,
        1265961600000,
        1266566400000,
        1267171200000,
        1267776000000,
        1268380800000,
        1268985600000,
        1269590400000,
        1270195200000,
        1270800000000,
        1271404800000,
        1272009600000,
        1272614400000,
        1273219200000,
        1273824000000,
        1274428800000,
        1275033600000,
        1275638400000,
        1276243200000,
        1276848000000,
        1277452800000,
        1278057600000,
        1278662400000,
        1279267200000,
        1279872000000,
        1280476800000,
        1281081600000,
        1281686400000,
        1282291200000,
        1282896000000,
        1283500800000,
        1284105600000,
        1284710400000,
        1285315200000,
        1285920000000,
        1286524800000,
        1287129600000,
        1287734400000,
        1288339200000,
        1288944000000,
        1289548800000,
        1290153600000,
        1290758400000,
        1291363200000,
        1291968000000,
        1292572800000,
        1293177600000,
        1293782400000,
        1294387200000,
        1294992000000,
        1295596800000,
        1296201600000,
        1296806400000,
        1297411200000,
        1298016000000,
        1298620800000,
        1299225600000,
        1299830400000,
        1300435200000,
        1301040000000,
        1301644800000,
        1302249600000,
        1302854400000,
        1303459200000,
        1304064000000,
        1304668800000,
        1305273600000,
        1305878400000,
        1306483200000,
        1307088000000,
        1307692800000,
        1308297600000,
        1308902400000,
        1309507200000,
        1310112000000,
        1310716800000,
        1311321600000,
        1311926400000,
        1312531200000,
        1313136000000,
        1313740800000,
        1314345600000,
        1314950400000,
        1315555200000,
        1316160000000,
        1316764800000,
        1317369600000,
        1317974400000,
        1318579200000,
        1319184000000,
        1319788800000,
        1320393600000,
        1320998400000,
        1321603200000,
        1322208000000,
        1322812800000,
        1323417600000,
        1324022400000,
        1324627200000,
        1325232000000,
        1325836800000,
        1326441600000,
        1327046400000,
        1327651200000,
        1328256000000,
        1328860800000,
        1329465600000,
        1330070400000,
        1330675200000,
        1331280000000,
        1331884800000,
        1332489600000,
        1333094400000,
        1333699200000,
        1334304000000,
        1334908800000,
        1335513600000,
        1336118400000,
        1336723200000,
        1337328000000,
        1337932800000,
        1338537600000,
        1339142400000,
        1339747200000,
        1340352000000,
        1340956800000,
        1341561600000,
        1342166400000,
        1342771200000,
        1343376000000,
        1343980800000,
        1344585600000,
        1345190400000,
        1345795200000,
        1346400000000,
        1347004800000,
        1347609600000,
        1348214400000,
        1348819200000,
        1349424000000,
        1350028800000,
        1350633600000,
        1351238400000,
        1351843200000,
        1352448000000,
        1353052800000,
        1353657600000,
        1354262400000,
        1354867200000,
        1355472000000,
        1356076800000,
        1356681600000,
        1357286400000,
        1357891200000,
        1358496000000,
        1359100800000,
        1359705600000,
        1360310400000,
        1360915200000,
        1361520000000,
        1362124800000,
        1362729600000,
        1363334400000,
        1363939200000,
        1364544000000,
        1365148800000,
        1365753600000,
        1366358400000,
        1366963200000,
        1367568000000,
        1368172800000,
        1368777600000,
        1369382400000,
        1369987200000,
        1370592000000,
        1371196800000,
        1371801600000,
        1372406400000,
        1373011200000,
        1373616000000,
        1374220800000,
        1374825600000,
        1375430400000,
        1376035200000,
        1376640000000,
        1377244800000,
        1377849600000,
        1378454400000,
        1379059200000,
        1379664000000,
        1380268800000,
        1380873600000,
        1381478400000,
        1382083200000,
        1382688000000,
        1383292800000,
        1383897600000,
        1384502400000,
        1385107200000,
        1385712000000,
        1386316800000,
        1386921600000,
        1387526400000,
        1388131200000,
        1388736000000,
        1389340800000,
        1389945600000,
        1390550400000,
        1391155200000,
        1391760000000,
        1392364800000,
        1392969600000,
        1393574400000,
        1394179200000,
        1394784000000,
        1395388800000,
        1395993600000,
        1396598400000,
        1397203200000,
        1397808000000,
        1398412800000,
        1399017600000,
        1399622400000,
        1400227200000,
        1400832000000,
        1401436800000,
        1402041600000,
        1402646400000,
        1403251200000,
        1403856000000,
        1404460800000,
        1405065600000,
        1405670400000,
        1406275200000,
        1406880000000,
        1407484800000,
        1408089600000,
        1408694400000,
        1409299200000,
        1409904000000,
        1410508800000,
        1411113600000,
        1411718400000,
        1412323200000,
        1412928000000,
        1413532800000,
        1414137600000,
        1414742400000,
        1415347200000,
        1415952000000,
        1416556800000,
        1417161600000,
        1417766400000,
        1418371200000,
        1418976000000,
        1419580800000,
        1420185600000,
        1420790400000,
        1421395200000,
        1422000000000,
        1422604800000,
        1423209600000,
        1423814400000,
        1424419200000,
        1425024000000,
        1425628800000,
        1426233600000,
        1426838400000,
        1427443200000,
        1428048000000,
        1428652800000,
        1429257600000,
        1429862400000,
        1430467200000,
        1431072000000,
        1431676800000,
        1432281600000,
        1432886400000,
        1433491200000,
        1434096000000,
        1434700800000,
        1435305600000,
        1435910400000,
        1436515200000,
        1437120000000,
        1437724800000,
        1438329600000,
        1438934400000,
        1439539200000,
        1440144000000,
        1440748800000,
        1441353600000,
        1441958400000,
        1442563200000,
        1443168000000,
        1443772800000,
        1444377600000,
        1444982400000,
        1445587200000,
        1446192000000,
        1446796800000,
        1447401600000,
        1448006400000,
        1448611200000,
        1449216000000,
        1449820800000,
        1450425600000,
        1451030400000,
        1451635200000,
        1452240000000,
        1452844800000,
        1453449600000,
        1454054400000,
        1454659200000,
        1455264000000,
        1455868800000,
        1456473600000,
        1457078400000,
        1457683200000,
        1458288000000,

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