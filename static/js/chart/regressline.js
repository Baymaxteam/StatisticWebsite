function Regresslinechart() {
    $('#P12chartRegress1 .chart').highcharts({
        title: {
            text: Chart3Title
        },
        series: [{
            type: 'line',
            name: 'Regression Line',
            data: Chart3DataLineXY1,
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    lineWidth: 0
                }
            },
            enableMouseTracking: false
        }, {
            type: 'scatter',
            name: 'Observations',
            data: Chart3DataXY1,
            marker: {
                radius: 4
            }
        }]
    });

    $('#P12chartRegress2 .chart').highcharts({
        title: {
            text: Chart3Title
        },
        series: [{
            type: 'line',
            name: 'Regression Line',
            data: Chart3DataLineXY2,
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    lineWidth: 0
                }
            },
            enableMouseTracking: false
        }, {
            type: 'scatter',
            name: 'Observations',
            data: Chart3DataXY2,
            marker: {
                radius: 4
            }
        }]
    });

    $('#P12chartRegress3 .chart').highcharts({
        title: {
            text: Chart3Title
        },
        series: [{
            type: 'line',
            name: 'Regression Line',
            data: Chart3DataLineXY3,
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    lineWidth: 0
                }
            },
            enableMouseTracking: false
        }, {
            type: 'scatter',
            name: 'Observations',
            data: Chart3DataXY3,
            marker: {
                radius: 4
            }
        }]
    });

    $('#P12chartRegress4 .chart').highcharts({
        title: {
            text: Chart3Title
        },
        series: [{
            type: 'line',
            name: 'Regression Line',
            data: Chart3DataLineXY4,
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    lineWidth: 0
                }
            },
            enableMouseTracking: false
        }, {
            type: 'scatter',
            name: 'Observations',
            data: Chart3DataXY4,
            marker: {
                radius: 4
            }
        }]
    });
};