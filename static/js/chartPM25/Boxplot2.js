var DEBUG_Log = true;
var boxplotXtitle = [];
var boxplotDataCity1 = [];
var boxplotDataCity2 = [];
var boxplotDataCity3 = [];
$(function() {

    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var slider3 = document.getElementById('slider3');
    sliderTrigger(slider1, $('#containerPM25BoxCity1'), "忠明")
        sliderTrigger(slider2, $('#containerPM25BoxCity2'), "埔里")
            sliderTrigger(slider3, $('#containerPM25BoxCity3'), "線西")
    
    // slider.noUiSlider.on('update', function(values, handle) {
    //     snapValues[handle].innerHTML = values[handle];
    // });

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
            boxplotXtitle.push(tmpdata[i][1]);
            boxplotDataCity1.push(temp1);
            boxplotDataCity2.push(temp2);
            boxplotDataCity3.push(temp3);
            // temp2.push(tmpdata[j][i+9]);
            // temp3.push(tmpdata[j][i+16]);
            temp1 = [];
            temp2 = [];
            temp3 = [];
        }
        // DEBUG("tempTitle11");
        // DEBUG(tempTitle11);
        BoxChart($('#containerPM25BoxCity1'), boxplotDataCity1, boxplotXtitle, "忠明");
        BoxChart($('#containerPM25BoxCity2'), boxplotDataCity2, boxplotXtitle, "埔里");
        BoxChart($('#containerPM25BoxCity3'), boxplotDataCity3, boxplotXtitle, "線西");

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
        colors: ['#ED561B', '#5433e5']
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
            boxplot: {
                fillColor: '#e1dfd5',
                lineWidth: '2.5'},
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

function DEBUG(printData) {
    if (DEBUG_Log === true) {
        console.log(printData)
    }
}

function sliderTrigger(slidername, DOM, city) {
    noUiSlider.create(slidername, {
        start: [0, 102],
        connect: true,
        range: {
            'min': 0,
            'max': 102
        }
    });

    slidername.noUiSlider.on('end', function(){
        var index1 = parseInt(slidername.noUiSlider.get()[0]);
        var index2 = parseInt(slidername.noUiSlider.get()[1]);
        var newdata = [], newXtitle =[];
        var i;
        for (i = index1 ; i < index2 + 1; i++) {
            newdata.push(boxplotDataCity1[i]);
            newXtitle.push(boxplotXtitle[i]);
        }
        BoxChart( DOM, newdata, newXtitle, city);
    });

}