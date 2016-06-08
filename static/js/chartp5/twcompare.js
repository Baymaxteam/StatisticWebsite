var location;
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
    tc_data22 = [],
    data_array = 
    {tc_data1, tc_data2,tc_data3,tc_data4,tc_data5,tc_data6,tc_data7,tc_data8,tc_data9,tc_data10,
     tc_data11,tc_data12,tc_data13,tc_data14,tc_data15,tc_data16,tc_data17,tc_data18,tc_data19,tc_data20,
     tc_data21,tc_data22};
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
        // get current time, and the start time is the fifth point 
        // so startTime = currentTime - 50 point *1000ms + (UTC+8);
        
        var sensorData = respons.data;
        var sensorStatList = respons.statList;


        // 整理sensor data
        var k = 0;
        setInterval(function () 
        {
        	data_shift(k,sensorData,len);

        	k = k+1;
        	if (k==(len-12))
        		k = 0;
        //taiwancompare($('#container1'), tc_data1,tc_data2,tc_data3,tc_data4,tc_data5,tc_data6,tc_data7,tc_data8,tc_data9,tc_data10,tc_data11,tc_data12,tc_data13,tc_data14,tc_data15,tc_data16,tc_data17,tc_data18,tc_data19,tc_data20,tc_data21,tc_data22);
        taiwancompare($('#container1'), data_array);
        
        }, 3000);
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
function sendlocation(locat)
{
	location = locat;
};
//function taiwancompare(DOM, data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22)
function taiwancompare(DOM, A)

{

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
                text : '26縣市流感併發重症'
            },

            scrollbar : {
                enabled : false
            },

            series : 
            [{
                name : '基隆市(人)',
                data : A.tc_data1,
                tooltip: {
                    valueDecimals: 0
                }
            }/*,{
                name : '台北市(人)',
                data : data2,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '新北市(人)',
                data : data3,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '桃園市(人)',
                data : data4,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '新竹市(人)',
                data : data5,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '新竹縣(人)',
                data : data6,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '苗栗縣(人)',
                data : data7,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '台中市(人)',
                data : data8,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '南投縣(人)',
                data : data9,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '彰化縣(人)',
                data : data10,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '嘉義市(人)',
                data : data11,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '嘉義縣(人)',
                data : data12,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '雲林縣(人)',
                data : data13,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '台南市(人)',
                data : data14,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '高雄市(人)',
                data : data15,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '屏東縣(人)',
                data : data16,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '宜蘭縣(人)',
                data : data17,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '花蓮縣(人)',
                data : data18,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '台東縣(人)',
                data : data19,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '金門縣(人)',
                data : data20,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '連江縣(人)',
                data : data21,
                tooltip: {
                    valueDecimals: 0
                }
            },{
                name : '澎湖縣(人)',
                data : data22,
                tooltip: {
                    valueDecimals: 0
                }
            }*/]
        });
}