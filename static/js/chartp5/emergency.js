var data1 = 
[
[1104508799000,1133557 ],
[1136044799000,1055750 ],
[1167580799000,1028541 ],
[1199116799000,1062583 ],
[1230652799000,1035743 ],
[1262188799000,1152358 ],
[1293724799000,1131035 ],
[1325260799000,1170145 ],
[1356796799000,1150630 ],
[1388332799000,1060092 ],
[1419868799000,1081832 ],

];
var data2 = 
[
[1104508799000,787612  ],
[1136044799000,778682  ],
[1167580799000,739422  ],
[1199116799000,756126  ],
[1230652799000,754009  ],
[1262188799000,814857  ],
[1293724799000,830766  ],
[1325260799000,849114  ],
[1356796799000,864306  ],
[1388332799000,825484  ],
[1419868799000,847896  ],
];

var data3 = 
[
[1104508799000,813473  ],
[1136044799000,817455  ],
[1167580799000,784290  ],
[1199116799000,817898  ],
[1230652799000,806469  ],
[1262188799000,880503  ],
[1293724799000,876869  ],
[1325260799000,887087  ],
[1356796799000,916788  ],
[1388332799000,869501  ],
[1419868799000,918061  ],
];

var data4 = 
[
[1104508799000,568649  ],
[1136044799000,623934  ],
[1167580799000,682494  ],
[1199116799000,701126  ],
[1230652799000,704100  ],
[1262188799000,817167  ],
[1293724799000,768887  ],
[1325260799000,838716  ],
[1356796799000,828863  ],
[1388332799000,781711  ],
[1419868799000,796215  ],
];

var data5 = 
[
[1104508799000,143887  ],
[1136044799000,144820  ],
[1167580799000,138334  ],
[1199116799000,137207  ],
[1230652799000,132869  ],
[1262188799000,149465  ],
[1293724799000,150448  ],
[1325260799000,151405  ],
[1356796799000,150075  ],
[1388332799000,141016  ],
[1419868799000,144781  ],

];
$(function () {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {

        // Create the chart
        $('#container7').highcharts('StockChart', {
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

            series : [{
                name : '台北市',
                data : data1,
                tooltip: {
                    valueDecimals: 2
                }
            },{
                  name: '台中市',
                            data: data2,
                            tooltip: {
                    valueDecimals: 2
                }
            },{
                  name: '高雄市',
                            data: data3,
                            tooltip: {
                    valueDecimals: 2
                }
            },{
                  name: '新北市',
                            data: data4,
                            tooltip: {
                    valueDecimals: 2
                }
            },{
                  name: '花蓮市',
                            data: data5,
                            tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
});