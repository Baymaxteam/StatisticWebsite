var DEBUG_Log = false;

$(function() {
    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_box.csv'
    }, function(respons) {
        // DEBUG("Server response the json data 123 : ");
        // DEBUG(respons);

        var i, j, temp1 = [],
            temp2 = [],
            temp3 = [];
        var temp11 = [],
            temp21 = [],
            temp31 = [];
        var tempTitle11 = [],
            tempTitle21 = [],
            tempTitle31 = [];
        var len = respons['data'].length;
        var tmpdata = respons['data'];
        for (i = 0; i < len; i++) {
            for (j = 0; j < 5; j++) {
                temp1.push(tmpdata[i][j + 2]);
                temp2.push(tmpdata[i][j + 9]);
                temp3.push(tmpdata[i][j + 16]);
            }
            tempTitle11.push(tmpdata[i][1]);
            tempTitle21.push(tmpdata[i][8]);
            tempTitle31.push(tmpdata[i][15]);
            temp11.push(temp1);
            temp21.push(temp2);
            temp31.push(temp3);
            // temp2.push(tmpdata[j][i+9]);
            // temp3.push(tmpdata[j][i+16]);
            temp1 = [];
            temp2 = [];
            temp3 = [];
        }
        // DEBUG("tempTitle11");
        // DEBUG(tempTitle11);
        BoxChart($('#containerPM25BoxHr'), temp11, tempTitle11, "忠明");
        BoxChart($('#containerPM25BoxMonth'), temp21, tempTitle21, "埔里");
        BoxChart($('#containerPM25BoxWeek'), temp31, tempTitle31, "線西");

    });

    $.get('/ajax_selectFilePart2/', {
        'fileName': 'PM2.5_data_boxStat.csv'
    }, function(respons) {
        // DEBUG("Server response the json data : ");
        // DEBUG(respons);
        var titleList = respons.title;
        var StatList = respons.statList;
        var i;
        // 整理sensor data
       

        var SelectTableHeader = [];
        SelectTableHeader.push({ title: '統計量' });
        for (var i = 0; i < titleList.length; i++) {
            SelectTableHeader.push({ title: titleList[i] });
        }
        // DEBUG("SelectTableHeader");
        // DEBUG(SelectTableHeader);
        //統計圖表
        $('#tableStat table').DataTable({
            data: StatList,
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

function BoxChart(DOM, plotData, titleData, placeData) {
    Highcharts.setOptions({
        colors: ['#ED561B', '#DDDF00']
    });
    DOM.highcharts({

        chart: {
            type: 'boxplot'
        },
        exporting: {
            enabled: false
        },

        title: {
            text: ''
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: titleData,
            title: {
                text: '區間'
            }
        },

        yAxis: {
            // title: {
            //     text: 'Observations'
            // },
            // plotLines: [{
            //     value: 50,
            //     color: 'red',
            //     width: 1,
            //     label: {
            //         text: 'Theoretical mean: 50',
            //         align: 'center',
            //         style: {
            //             color: 'gray'
            //         }
            //     }
            // }]
        },
        plotOptions: {
            series: {
                colorByPoint: true
            }
        },


        series: [{
            name: placeData,
            data: plotData,
            tooltip: {
                headerFormat: '<em> 區間 {point.key}</em><br/>'
            }
        }]

    });
};
