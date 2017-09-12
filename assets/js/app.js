/*global $, console, Chart, document, window*/
function convertHex(hex, opacity) {
    'use strict';
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
}

function screenshot() {
    'use strict';
    var canvas = document.getElementById("myChart");
    window.open(canvas.toDataURL("image/png"), '_blank');
}

var ctx = $("#myChart").get(0).getContext("2d"),
    response = {},
    colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
    options = {
        // Boolean - If false, the lines between points are not drawn
        showLines: true,
        // Boolean - If true, lines stack on top of each other along the y axis.
        stacked: true,
        hover: {
            // String - Sets which elements hover. Acceptable options are 'single', 'label', or 'dataset'. single highlights the closest element. label highlights elements in all datasets at the same X value. dataset highlights the closest dataset.
            mode: 'dataset'
        },
        // String - Animation easing effect
        // Possible effects are:
        // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
        //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
        //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
        //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
        //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
        //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
        //  easeOutElastic, easeInCubic]
        animation: {
            easing: "easeInOutCubic"
        },

        // Boolean - If we should show the scale at all
        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,

        // String - Colour of the scale line
        scaleLineColor: "rgba(0,0,0,.1)",

        // Number - Pixel width of the scale line
        scaleLineWidth: 1,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        // Interpolated JS string - can access value
        scaleLabel: "<%=value%>",

        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,

        // String - Scale label font declaration for the scale label
        scaleFontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Scale label font size in pixels
        scaleFontSize: 12,

        // String - Scale label font weight style
        scaleFontStyle: "normal",

        // String - Scale label font colour
        scaleFontColor: "#666",

        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: true,

        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
        customTooltips: false,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.8)",

        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,

        // String - Tooltip font weight style
        tooltipFontStyle: "normal",

        // String - Tooltip label font colour
        tooltipFontColor: "#fff",

        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,

        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "bold",

        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",

        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,

        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,

        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,

        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 3,

        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,

        // String - Template string for single tooltips
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

        // String - Template string for multiple tooltips
        //multiTooltipTemplate: "<%= value %>",
        multiTooltipTemplate: "<%= datasetLabel + ' ' + value + ' %' %>",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    },
    processData = function (data) {
        'use strict';
        var versions = [],
            datesLabel = [],
            dates = [],
            key,
            i,
            c,
            x,
            percent,
            label,
            fillColor,
            strokeColor,
            pointColor,
            pointStrokeColor,
            pointHighlightFill,
            pointHighlightStroke,
            mydata,
            responseData;

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                versions.push(key);
            }
        }
        //console.log(versions);

        for (key in data[3]) {
            if (data[3].hasOwnProperty(key)) {
                datesLabel.push(key.substring(0, 7));
                dates.push(key);
            }
        }
        dates.splice(0, 2);
        datesLabel.splice(0, 2);
        //console.log(datesLabel);
        response.labels = datesLabel;
        response.datasets = [];

        for (i = 0, c = 0; i < versions.length; i++) {
            // Exclude subversions
            if (versions[i] !== '2.3 - 2.3.2' && versions[i] !== '2.3.3 - 2.3.7' && versions[i] !== '3' && versions[i] !== '3.1' && versions[i] !== '3.2' && versions[i] !== '4.0 - 4.0.2' && versions[i] !== '4.0.3 - 4.0.4' && versions[i] !== '4.1.x' && versions[i] !== '4.2.x' && versions[i] !== '4.3.x' && versions[i] !== '5.x' && versions[i] !== '5.1.x') {
                label = data[versions[i]].Codename;
                fillColor = convertHex(colors[c], 50);
                //strokeColor = "rgba(220,220,220,1)";
                strokeColor = convertHex(colors[c], 100);
                //pointColor = "rgba(220,220,220,1)";
                pointColor = convertHex(colors[c], 100);
                pointStrokeColor = "#fff";
                pointHighlightFill = "#fff";
                //pointHighlightStroke = "rgba(220,220,220,1)";
                pointHighlightStroke = convertHex(colors[c], 100);
                mydata = [];
                responseData = [];
                for (x = 0; x < dates.length; x++) {
                    percent = data[versions[i]][dates[x]] * 100;
                    mydata.push(percent.toFixed(1));
                }
                responseData = {
                    'label': label,
                    'fill': true,
                    'backgroundColor': fillColor,
                    'borderColor': strokeColor,
                    'pointBackgroundColor': pointColor,
                    'pointBorderColor': pointStrokeColor,
                    'pointHoverBackgroundColor': pointHighlightFill,
                    'pointHoverBorderColor': pointHighlightStroke,
                    'pointBorderWidth': 1,
                    'data': mydata
                };
                //console.log(responseData);
                response.datasets.push(responseData);
                c++;
            }
        }

        //console.dir(response);
        Chart.Line(ctx, {data: response, options: options});
    };
$(function () {
    'use strict';
    $.ajax({
        url: 'data.json',
        async: true,
        success: function (data) {
            //console.dir(data);
            processData(data);
        }
    });
});

$(document).keypress(function (event) {
    'use strict';
    if (event.which === 112) {
        event.preventDefault();
        screenshot();
    }
});
