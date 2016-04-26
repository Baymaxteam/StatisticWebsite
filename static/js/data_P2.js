// File list variable
var FileJsonData = [];
var FileName = [];
var FileIndex = [];

// SelectFile variable
var FileSelected = [];
var SelectFile = [];
var SelectTableHeader = [];

// type 1 chart variable
var Chart1CategoryX = [];
var Chart1TitleY = [];
var Chart1DataSeires = [];
var Chart1Title = [];

var Chart1Col = [];
var Chart1Avg = [];
var Chart1Pie = [];

// type 2 chart variable
var Chart2DataX = [];
var Chart2DataY = [];
var Chart2TitleX = [];
var Chart2TitleY = [];
var Chart2Title = [];


var Chart2DataXY = [];
var Chart2ScatterXY = [];
var Chart2Trend = [];

$(document).ready(function() {
    $.get('/DBlist/', " ", function(Jdata) {
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
        var fileTable = $('#P21tableFileList table').DataTable({
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

        $('#P21listFileList').find('option').remove().end();
        for (var y in FileIndex) {
            // add file name to SelectFileList
            $("#P21listFileList").append($("<option></option>").attr("value", FileName[y]).text(FileName[y]));
        };

    });


    // 選取欲讀取檔案後，將檔案資料讀取至table與下拉式選單
    $("#P21btnFileLoading").click(function() {
        // 10/26 檢查DataTable是否存在，如果再則把它刪除
        if ($.fn.DataTable.fnIsDataTable('#P21tableFileContext table')) {
            a = $('#P21tableFileContext table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#P21tableFileContext table thead').empty();
        };
        if ($.fn.DataTable.fnIsDataTable('#P22tableStat table')) {
            a = $('#P22tableStat table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#P22tableStat table thead').empty();

        };

        // 這個不可以用區域變數，因為很多地方會用到，會導致錯誤
        SelectTableHeader = [];


        var selectfile = $('#P21listFileList :selected').text();

        $.get('/getDB/', {
            'fileName': selectfile
        }, function(respons) {
            SelectFile = respons['data'];

            $('#P21listXCategory').find('option').remove().end();
            $('#P21listXDim').find('option').remove().end();
            $('#P21listYDim').find('option').remove().end();
            $('#P21listMulDim').find('option').remove().end();
            $('#P21listDataSeries').find('option').remove().end();

            $('#P21list2XDim').find('option').remove().end();
            $('#P21list2YDim').find('option').remove().end();


            for (var index = 0; index < respons["title"].length; index++) {
                var TableTitle = respons["title"][index];
                SelectTableHeader.push({
                    title: TableTitle
                });

                $("#P21listXCategory").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P21listXDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P21listYDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P21listMulDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P21listDataSeries").append($("<option></option>").attr("value", TableTitle).text(TableTitle));

                $("#P21list2XDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P21list2YDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
            }

            //畫檔案內容
            $('#P21tableFileContext table').DataTable({
                data: SelectFile,
                columns: SelectTableHeader,
                "bFilter": false
            });

            //1030 判別類別變數之表格
            $('#P21itemClassify').empty();
            var itemClassRow = '<tr>';
            for(x in SelectTableHeader){
                itemClassRow+=('<td>'+SelectTableHeader[x]['title']+'</td>');
            };
            itemClassRow+='</tr>';
            itemClassRow+='<tr>';
            for(x in SelectTableHeader){
                if(typeof(SelectFile[0][x])==='number'){
                    itemClassRow+=('<td>'+'連續變數'+'</td>');
                }
                else{
                    itemClassRow+=('<td>'+'類別變數'+'</td>');
                }
            };
            itemClassRow+='</tr>';
            $('#P21itemClassify').append(itemClassRow);

            //插入一個Title在第一個
            SelectTableHeader.unshift({
                title: '統計量'
            });
            //畫統計量表格
            console.log(respons['statList']);
            $('#P22tableStat table').DataTable({
                data: respons['statList'],
                columns: SelectTableHeader,
                "bFilter": false
            });

        });

    });

    // 繪圖與計算量表格按鈕
    $("#P21btnChart").click(function() {
        // 1019 Sam modify 取得沒被選到的統計量checkBox = 要被隱藏的Row index
        var statisticHidelist = [];
        $('#P21chkListStat input[type=checkbox]').each(function() {
            if (!this.checked) {
                statisticHidelist.push(parseInt($(this).val()));
            };
        });
        statisticHidelist.sort(function(a, b) {
            return b - a
        });
        if (statisticHidelist.length > 0) {
            for (x in statisticHidelist) {
                $('#P22tableStat table').DataTable().row(statisticHidelist[x]).remove().draw();
            };
        };
        // 

        // 1019 取得沒被選到的圖表checkBox = 要隱藏的圖表
        checkHiddenChart();

        //切換到tab2
        $('#P1tabsSetting a[href="#P22panelShowChart"]').tab('show');

        //讀取選擇檔案名稱，並檢查選取資料
        FileSelected = [];
        FileSelected.fileName = $('#P21listFileList :selected').text();

        // *******************  type 1 diagram  ***********************
        // title 
        Chart1Title = $('#P21list1Title').val();
        // Y axis title
        Chart1TitleY = $('#P21listYTitle').val();
        // x axis category
        var CategoryX = $('#P21listXCategory :selected').text();
        for (var i in SelectTableHeader) {
            if (SelectTableHeader[i].title == CategoryX) {
                for (var j in SelectFile) {
                    Chart1CategoryX.push(SelectFile[j][i - 1]);
                }
            }
        }

        //Dataseries
        var DataSeires = getSelected("P21listDataSeries");
        var datatmp = [];
        var counter = 0;
        Chart1DataSeires = [];
        Chart1Col = [];
        if (DataSeires.length > 0) {
            for (var i = 1; i < SelectTableHeader.length; i++) {
                if (SelectTableHeader[i].title == DataSeires[counter]) {
                    datatmp = [];
                    for (var j in SelectFile) {
                        datatmp.push(SelectFile[j][i - 1]);
                    }

                    Chart1DataSeires.push({
                        'name': DataSeires[counter],
                        'data': datatmp
                    });

                    Chart1Col.push({
                        'type': 'column',
                        'name': DataSeires[counter],
                        'data': datatmp
                    });

                    counter++;
                }
            }

            // 計算histgram fit pie/clomue/average data
            histgramFitDataseries();
        }



        // histgram fit pie

        // *******************  type 2 diagram  ***********************
        // select 2 axis data
        Chart2TitleX = $('#P21list2XDim :selected').text();
        Chart2TitleY = $('#P21list2YDim :selected').text();
        Chart2Title = $('#P21list2Title').val();

        var datatmp = [];
        Chart2DataX = [];
        Chart2DataY = [];
        Chart2DataXY = [];
        for (var i in SelectTableHeader) {
            if (SelectTableHeader[i].title == Chart2TitleX) {
                datatmp = [];
                for (var j in SelectFile) {
                    datatmp.push(SelectFile[j][i - 1]);

                }
                Chart2DataX = datatmp;
            }
            if (SelectTableHeader[i].title == Chart2TitleY) {
                datatmp = [];
                for (var j in SelectFile) {
                    datatmp.push(SelectFile[j][i - 1]);
                }
                Chart2DataY = datatmp;
            }
        }


        // pie chart data 
        for (var i in Chart2DataX) {
            Chart2DataXY.push({
                'name': Chart2DataX[i],
                'y': Chart2DataY[i]
            });
        };

        // XYScatter cahrt data
        var tmArray = [];
        Chart2ScatterXY = [];
        Chart2Trend = [];
        for (var i in Chart2DataX) {
            tmArray.push([Chart2DataX[i], Chart2DataY[i]]);
        };

        Chart2ScatterXY.push({
            'name': 'XY scatter',
            'data': tmArray,
            'color': 'rgba(223, 83, 83, .5)'
        });

        Chart2Trend.push({
            'name': 'Time Trend',
            'data': tmArray,
            'color': 'rgba(223, 83, 83, .5)',
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            }
        });

        // trend chart data



        // run funciton
        Linechart();
        Histgramchart();
        HorizontalBarChart();
        Piechart();
        XYscatterchart();
        Trendchart();
        //Radarchart();
        //Bubblechart();
        HistogramFitchart();
        $('#P22chartBubble').hide();
        $('#P22chartRadar').hide();
    });

    $('#P21G2chkListToglle').click(function() {
        var checkDOM = ['chkC_XYScatter', 'chkC_Pie', 'chkC_Trend'];
        var thisone = $('#P21G2chkListToglle');
        if (thisone.text() == "全選") {
            thisone.text("取消全選");
            for (i = 0; i < checkDOM.length; i++) {
                listCheck(checkDOM[i]);
            }
        } else {
            thisone.text("全選");
            for (i = 0; i < checkDOM.length; i++) {
                listUncheck(checkDOM[i]);
            }
        }
    });

    $('#P21G1chkListToglle').click(function() {
        var checkDOM = ['chkC_Histgram', 'chkC_Histgram_bar', 'chkC_Line', 'chkC_Histgram_Fit'];
        var thisone = $('#P21G1chkListToglle');
        if (thisone.text() == "全選") {
            thisone.text("取消全選");
            for (i = 0; i < checkDOM.length; i++) {
                listCheck(checkDOM[i]);
            }
        } else {
            thisone.text("全選");
            for (i = 0; i < checkDOM.length; i++) {
                listUncheck(checkDOM[i]);
            }
        }
    });

    $('#P21G0chkListToglle').click(function() {
        var checkDOM = ['chkS_Avg', 'chkS_Sum', 'chkS_StdDev', 'chkS_Varrance', 'chkS_Range',
            'chkS_Max', 'chkS_Min', 'chkS_SEM', 'chkS_Kurtosis', 'chkS_Skewed'
        ];
        var thisone = $('#P21G0chkListToglle');
        if (thisone.text() == "全選") {
            thisone.text("取消全選");
            for (i = 0; i < checkDOM.length; i++) {
                listCheck(checkDOM[i]);
            }
        } else {
            thisone.text("全選");
            for (i = 0; i < checkDOM.length; i++) {
                listUncheck(checkDOM[i]);
            }
        }
    });

    // show the selected items
    $('#P21listDataSeries').on('change', function() {
        var SelectedSeires = getSelected("P21listDataSeries");
        $('#P21listDataSeriesSelect').text(SelectedSeires);
    });


});


function getSelected(id) {
    var selected = [];
    selector = document.getElementById(id);
    for (var i = 0; i < selector.options.length; i++) {
        if (selector.options[i].selected) {
            selected.push(selector.options[i].value);
        }
    }
    return selected;
}

//
function checkHiddenChart() {
    //chart type 1
    var ChartHidelist = [];
    var chart = [];
    var tmp = 0;

    $('#P21G1chkListChart input[type=checkbox]').each(function() {
        if (!this.checked) {
            ChartHidelist.push(parseInt($(this).val()));
        };
    });

    chart = [$('#P22chartHistgram'), $('#P22chartHorizontalBar'), $('#P22chartLine'), $('#P22chartHistogramFit')];
    for (var i = 0; i < chart.length; i++) {
        chart[i].show();
    }
    for (var i = 0; i < ChartHidelist.length; i++) {
        tmp = ChartHidelist[i];
        chart[tmp - 1].hide();
    }

    //chart type 2
    var ChartHidelist = [];
    $('#P21G2chkListChart input[type=checkbox]').each(function() {
        if (!this.checked) {
            ChartHidelist.push(parseInt($(this).val()));
        };
    });

    chart = [$('#P22chartXYScatter'), $('#P22chartPie'), $('#P22chartTrend')];
    for (var i = 0; i < chart.length; i++) {
        chart[i].show();
    }
    for (var i = 0; i < ChartHidelist.length; i++) {
        tmp = ChartHidelist[i];
        chart[tmp - 1].hide();
    }

}

function histgramFitDataseries() {
    var piesum = [];
    for (var i = 0; i < Chart1Col.length; i++) {
        piesum[i] = 0;
        for (var j = 0; j < Chart1Col[i].data.length; j++) {
            piesum[i] += Chart1Col[i].data[j];
        }
    }

    var Chart1DataPie = [];
    for (var i = 0; i < piesum.length; i++) {
        Chart1DataPie.push({
            'name': (Chart1Col[i].name),
            'y': piesum[i],
            'color': Highcharts.getOptions().colors[i] // Jane's color
        });
    }

    Chart1Pie = [];
    Chart1Pie.push({
        'type': 'pie',
        'data': Chart1DataPie,
        'center': [50, 50],
        'size': 50,
        'showInLegend': false

    });

    // histgram fit avg
    var avg = [];
    var sum = [];
    var len = Chart1Col[0].data.length
    for (var i = 0; i < len; i++) {
        avg[i] = 0;
        sum[i] = 0;
        for (var j = 0; j < Chart1Col.length; j++) {
            sum[i] += Chart1Col[j].data[i];
        }
        avg[i] = sum[i] / Chart1Col.length;
    }


    Chart1Avg.push({
        'type': 'spline',
        'name': 'Average',
        'data': avg,
        'marker': {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    });
    // concat array
    Chart1Col = Chart1Col.concat(Chart1Pie);
    Chart1Col = Chart1Col.concat(Chart1Avg);
}

function listCheck(checkID) {
    document.getElementById(checkID).checked = true;
}

function listUncheck(checkID) {
    document.getElementById(checkID).checked = false;
}
