var FileJsonData = [];
var FileName = [];
var FileIndex = [];

var FileSelected = [];

$(document).ready(function() {
    var selectfile = '';
    var StreamData = [];
    $.get('/ajax_StreamfileList/', " ", function(Jdata) {
        // prase the json file 

        for (var x in Jdata["data"]) {
            // get each item data
            var context = [];
            for (var y in Jdata["data"][x]) {
                context.push(Jdata["data"][x][y])
            }
            FileName.push(Jdata["data"][x]["name"])
            FileIndex.push(Jdata["data"][x]["index"])
            FileJsonData.push(context)
        };
        // data table title
        var thead = [];
        for (var y in Jdata["data"][0]) {
            thead.push({
                title: y
            });
        }
        // fill this table from FileJsonData
        var fileTable = $('#P41tableFileList table').DataTable({
            data: FileJsonData,
            columns: thead,
            "bFilter": false
        });
        // Apply the search
        fileTable.columns().every(function() {
            var that = this;
            $('input', this.footer()).on('keyup change', function() {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });

        $('#P41listFileList').find('option').remove().end();
        for (var y in FileIndex) {
            // add file name to SelectFileList
            $("#P41listFileList").append($("<option></option>").attr("value", FileName[y]).text(FileName[y]));
        };

        // $('#P41tableFileContext table').DataTable({
        //     "destroy": true
        // });
    });


    // 選取欲讀取檔案後，將檔案資料讀取至table與下拉式選單
    $("#P41btnFileLoading").click(function() {
        selectfile = $('#P41listFileList :selected').text();

        $.get('/ajax_selectStreamFile/', {
                'fileName': selectfile
            },
            function(respons) {
                StreamData = respons['data'];
                $('#P41tableFileContext table').DataTable({
                    data: StreamData,
                    columns: [{
                        title: "DateTime"
                    }, {
                        title: "Value"
                    }],
                    "bFilter": false
                });

            });

    });

    $("#P41btnChart").click(function() {
        if (selectfile != null) {
            drawingRTchart(selectfile);
        }
        $('#P4tabsSetting a[href="#P42panelShowChart"]').tab('show');
    });
    
    $("#P41btnLocalData").click(function() {
        drawingRTchart('LocalData');
        $('#P4tabsSetting a[href="#P42panelShowChart"]').tab('show');
    });


});


function drawingRTchart(fileName) {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    var x = [],
        y = [];
    // Create the chart
    $('#P42chartInteractive').highcharts('StockChart', {
        chart: {
            events: {
                load: function() {
                    if (fileName !== 'LocalData') {
                        var series = this.series[0];
                        setInterval(function() {
                            $.get('/ajax_requestStreamdata/', {
                                    'fileName': fileName,
                                    'dataNum': 1
                                },
                                function(respons) {
                                    x = new Date(respons['data'][0][0]).getTime(),
                                    y = parseFloat(respons['data'][0][1]);
                                });
                            series.addPoint([x, y], true, true);
                            // console.log(series);

                        }, 1000);
                    } else {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            var x = (new Date()).getTime(), // current time
                                y = (Math.random().toFixed(3) * 20) + 15;
                            series.addPoint([x, y], true, true);
                        }, 1000);


                    };
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 10,
                type: 'second',
                text: '10s'
            }, {
                count: 30,
                type: 'second',
                text: '30s'
            }, {
                count: 1,
                type: 'minue',
                text: '1M'
            },{
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title: {
            text: 'Realtime Stream Data'
        },
        xAxis: {
            type: 'datetime'
        },
        exporting: {
            enabled: false
        },

        series: [{
            name: 'Temperature',
            color: (function() {
                if(fileName !== 'LocalData'){
                    color = '#f45b5b';
                }
                else{
                    color = '#434348';
                };
                return color;
            }()),
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -99; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000, (Math.random().toFixed(3) * 20) + 15
                    ]);
                }
                return data;
                
            }())
        }]
    });

};
