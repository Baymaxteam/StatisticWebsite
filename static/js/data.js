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

var Chart3TitleX = [];
var Chart3TitleY = [];
var Chart3Title = [];

var Chart3DataXY1 = [];
var Chart3DataXY2 = [];
var Chart3DataXY3 = [];
var Chart3DataXY4 = [];
var Chart3DataLineXY1 = [];
var Chart3DataLineXY2 = [];
var Chart3DataLineXY3 = [];
var Chart3DataLineXY4 = [];


$(document).ready(function() {
    $.get('/ajax_filelist/', " ", function(Jdata) {
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
        var fileTable = $('#P11tableFileList table').DataTable({
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

        $('#P11listFileList').find('option').remove().end();
        for (var y in FileIndex) {
            // add file name to SelectFileList
            $("#P11listFileList").append($("<option></option>").attr("value", FileName[y]).text(FileName[y]));
        };

    });


    // 選取欲讀取檔案後，將檔案資料讀取至table與下拉式選單
    $("#P11btnFileLoading").click(function() {
        // 10/26 檢查DataTable是否存在，如果再則把它刪除
        if ($.fn.DataTable.fnIsDataTable('#P11tableFileContext table')) {
            a = $('#P11tableFileContext table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#P11tableFileContext table thead').empty();
        };
        if ($.fn.DataTable.fnIsDataTable('#P12tableStat table')) {
            a = $('#P12tableStat table').dataTable();
            a.fnClearTable();
            a.fnDestroy();
            $('#P12tableStat table thead').empty();

        };


        // 這個不可以用區域變數，因為很多地方會用到，會導致錯誤
        SelectTableHeader = [];

        var selectfile = $('#P11listFileList :selected').text();

        $.get('/ajax_selectFile/', {
            'fileName': selectfile
        }, function(respons) {
            SelectFile = respons['data'];

            $('#P11listXCategory').find('option').remove().end();
            $('#P11listXDim').find('option').remove().end();
            $('#P11listYDim').find('option').remove().end();
            $('#P11listMulDim').find('option').remove().end();
            $('#P11listDataSeries').find('option').remove().end();

            $('#P11list2XDim').find('option').remove().end();
            $('#P11list2YDim').find('option').remove().end();

            $('#P11listX1Dim').find('option').remove().end();
            $('#P11listY1Dim').find('option').remove().end();
            $('#P11listX2Dim').find('option').remove().end();
            $('#P11listY2Dim').find('option').remove().end();
            $('#P11listX3Dim').find('option').remove().end();
            $('#P11listY3Dim').find('option').remove().end();
            $('#P11listX4Dim').find('option').remove().end();
            $('#P11listY4Dim').find('option').remove().end();

            for (var index = 0; index < respons["title"].length; index++) {
                var TableTitle = respons["title"][index];
                SelectTableHeader.push({
                    title: TableTitle
                });

                $("#P11listXCategory").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listXDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listYDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listMulDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listDataSeries").append($("<option></option>").attr("value", TableTitle).text(TableTitle));

                $("#P11list2XDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11list2YDim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));

                $("#P11listX1Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listY1Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listX2Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listY2Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listX3Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listY3Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listX4Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
                $("#P11listY4Dim").append($("<option></option>").attr("value", TableTitle).text(TableTitle));
            }


            //畫檔案內容
            $('#P11tableFileContext table').DataTable({
                data: SelectFile,
                columns: SelectTableHeader,
                "bFilter": false,
                "bAutoWidth": false
            });


            //1030 判別類別變數之表格
            $('#P11itemClassify').empty();
            var itemClassRow = '<tr>';
            for (x in SelectTableHeader) {
                itemClassRow += ('<td>' + SelectTableHeader[x]['title'] + '</td>');
            };
            itemClassRow += '</tr>';
            itemClassRow += '<tr>';
            for (x in SelectTableHeader) {
                if (typeof(SelectFile[0][x]) === 'number') {
                    itemClassRow += ('<td>' + '連續變數' + '</td>');
                } else {
                    itemClassRow += ('<td>' + '類別變數' + '</td>');
                }
            };
            itemClassRow += '</tr>';
            $('#P11itemClassify').append(itemClassRow);


            //插入一個Title在第一個
            SelectTableHeader.unshift({
                title: '統計量'
            });
            //畫統計量表格
            $('#P12tableStat table').DataTable({
                data: respons['statList'],
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

    // 繪圖與計算量表格按鈕
    $("#P11btnChart").click(function() {
        // 1019 Sam modify 取得沒被選到的統計量checkBox = 要被隱藏的Row index
        var statisticHidelist = [];
        $('#P11chkListStat input[type=checkbox]').each(function() {
            if (!this.checked) {
                statisticHidelist.push(parseInt($(this).val()));
            };
        });
        statisticHidelist.sort(function(a, b) {
            return b - a
        });
        if (statisticHidelist.length > 0) {
            for (x in statisticHidelist) {
                $('#P12tableStat table').DataTable().row(statisticHidelist[x]).remove().draw();
            };
        };
        // 

        // 1019 取得沒被選到的圖表checkBox = 要隱藏的圖表
        checkHiddenChart();

        //切換到tab2
        $('#P1tabsSetting a[href="#P12panelShowChart"]').tab('show');

        //讀取選擇檔案名稱，並檢查選取資料
        FileSelected = [];
        FileSelected.fileName = $('#P11listFileList :selected').text();

        // *******************  type 1 diagram  ***********************
        // title 
        Chart1Title = $('#P11list1Title').val();
        // Y axis title
        Chart1TitleY = $('#P11listYTitle').val();
        // x axis category
        var CategoryX = $('#P11listXCategory :selected').text();
        for (var i in SelectTableHeader) {
            if (SelectTableHeader[i].title == CategoryX) {
                for (var j in SelectFile) {
                    Chart1CategoryX.push(SelectFile[j][i - 1]);
                }
            }
        }

        //Dataseries
        var DataSeires = getSelected("P11listDataSeries");
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
        Chart2TitleX = $('#P11list2XDim :selected').text();
        Chart2TitleY = $('#P11list2YDim :selected').text();
        Chart2Title = $('#P11list2Title').val();

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

        // *******************  type 3 diagram  ***********************
        // select 2 axis data
        Chart3TitleX = [$('#P11listX1Dim :selected').text(), $('#P11listX2Dim :selected').text(), $('#P11listX3Dim :selected').text(), $('#P11listX4Dim :selected').text()];
        Chart3TitleY = [$('#P11listY1Dim :selected').text(), $('#P11listY2Dim :selected').text(), $('#P11listY3Dim :selected').text(), $('#P11listY4Dim :selected').text()]
        Chart3Title = $('#P11list3Title').val();

        Chart3DataX = [];
        Chart3DataY = [];


        [Chart3DataXY1, Chart3DataLineXY1] = XYdataRegress(Chart3TitleX[0], Chart3TitleY[0]);
        [Chart3DataXY2, Chart3DataLineXY2] = XYdataRegress(Chart3TitleX[1], Chart3TitleY[1]);
        [Chart3DataXY3, Chart3DataLineXY3] = XYdataRegress(Chart3TitleX[2], Chart3TitleY[2]);
        [Chart3DataXY4, Chart3DataLineXY4] = XYdataRegress(Chart3TitleX[3], Chart3TitleY[3]);

        // run funciton
        Linechart();
        Histgramchart();
        HorizontalBarChart();
        Piechart();
        XYscatterchart();
        Trendchart();
        HistogramFitchart();
        Regresslinechart();

        //Radarchart();
        //Bubblechart();
        $('#P12chartBubble').hide();
        $('#P12chartRadar').hide();
    });

    $('#P11G2chkListToglle').click(function() {
        var checkDOM = ['chkC_XYScatter', 'chkC_Pie', 'chkC_Trend'];
        var thisone = $('#P11G2chkListToglle');
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

    $('#P11G1chkListToglle').click(function() {
        var checkDOM = ['chkC_Histgram', 'chkC_Histgram_bar', 'chkC_Line', 'chkC_Histgram_Fit'];
        var thisone = $('#P11G1chkListToglle');
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

    $('#P11G0chkListToglle').click(function() {
        var checkDOM = ['chkS_Avg', 'chkS_Sum', 'chkS_StdDev', 'chkS_Varrance', 'chkS_Range',
            'chkS_Max', 'chkS_Min', 'chkS_SEM', 'chkS_Kurtosis', 'chkS_Skewed'
        ];
        var thisone = $('#P11G0chkListToglle');
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

    $('#P11G3chkListToglle').click(function() {
        var checkDOM = ['chkC_Regress'];
        var thisone = $('#P11G3chkListToglle');
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
    $('#P11listDataSeries').on('change', function() {
        var SelectedSeires = getSelected("P11listDataSeries");
        $('#P11listDataSeriesSelect').text(SelectedSeires);
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

    $('#P11G1chkListChart input[type=checkbox]').each(function() {
        if (!this.checked) {
            ChartHidelist.push(parseInt($(this).val()));
        };
    });

    chart = [$('#P12chartHistgram'), $('#P12chartHorizontalBar'), $('#P12chartLine'), $('#P12chartHistogramFit')];
    for (var i = 0; i < chart.length; i++) {
        chart[i].show();
    }
    for (var i = 0; i < ChartHidelist.length; i++) {
        tmp = ChartHidelist[i];
        chart[tmp - 1].hide();
    }

    //chart type 2
    var ChartHidelist = [];
    $('#P11G2chkListChart input[type=checkbox]').each(function() {
        if (!this.checked) {
            ChartHidelist.push(parseInt($(this).val()));
        };
    });

    chart = [$('#P12chartXYScatter'), $('#P12chartPie'), $('#P12chartTrend')];
    for (var i = 0; i < chart.length; i++) {
        chart[i].show();
    }
    for (var i = 0; i < ChartHidelist.length; i++) {
        tmp = ChartHidelist[i];
        chart[tmp - 1].hide();
    }

    //chart type 3
    var ChartHidelist = 0;
    $('#P11G3chkListChart input[type=checkbox]').each(function() {
        if (!this.checked) {
            ChartHidelist = (parseInt($(this).val()));
        };
    });
    
    chart = [$('#P12chartRegress1'), $('#P12chartRegress2'), $('#P12chartRegress3'), $('#P12chartRegress4')];
    if (ChartHidelist == 1) {
        for (var i = 0; i < chart.length; i++) {
            chart[i].hide();
        }
    } else {
        for (var i = 0; i < chart.length; i++) {
            chart[i].show();
        }
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

function XYdataRegress(titleX, titleY) {
    var datatmp = [],
        DataX = [],
        DataY = [],
        lineArray = [],
        ScatterArray = [];
    for (var i in SelectTableHeader) {
        if (SelectTableHeader[i].title == titleX) {
            datatmp = [];
            for (var j in SelectFile) {
                datatmp.push(SelectFile[j][i - 1]);

            }
            DataX = datatmp;
        }
        if (SelectTableHeader[i].title == titleY) {
            datatmp = [];
            for (var j in SelectFile) {
                datatmp.push(SelectFile[j][i - 1]);
            }
            DataY = datatmp;
        }
    }
    for (var i in DataX) {
        ScatterArray.push([DataX[i], DataY[i]]);
    };

    [result_values_x, result_values_y] = findLineByLeastSquares(DataX, DataY)
    for (var i in result_values_x) {
        lineArray.push([result_values_x[i], result_values_y[i]]);
    };


    return [ScatterArray, lineArray];
};

function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [
            [],
            []
        ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x * x;
        sum_xy += x * y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    var b = (sum_y / count) - (m * sum_x) / count;

    /*
     * We will make the x and y result line now
     */
    var result_values_x = [];
    var result_values_y = [];

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }

    return [result_values_x, result_values_y];
}
