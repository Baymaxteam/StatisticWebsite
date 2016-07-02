var City_location_2 =1;

var virus_r_data = [],
    virus_r_data1 = [],
    virus_r_data2 = [],
    virus_r_data3 = [],
    virus_r_data4 = [],
    virus_r_data5 = [],
    virus_r_data6 = [];

var virus_r_array = 
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
        var h = respons.data.length;
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
        
        for (i = 0; i < h; i++) 
        {
            virus_r_data1.push([sensorData[i][0],sensorData[i][1]]);
            virus_r_data2.push([sensorData[i][0],sensorData[i][2]]);
            virus_r_data3.push([sensorData[i][0],sensorData[i][3]]);
            virus_r_data4.push([sensorData[i][0],sensorData[i][4]]);
            virus_r_data5.push([sensorData[i][0],sensorData[i][5]]);
            virus_r_data6.push([sensorData[i][0],sensorData[i][6]]);
        };
        virus_r_array = 
        {virus_r_data1, virus_r_data2,virus_r_data3,virus_r_data4,virus_r_data5,virus_r_data6};

        virus_taiwan($('#container12'));

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

function virus_taiwan(DOM)
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