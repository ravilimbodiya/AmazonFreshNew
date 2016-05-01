  $(document).ready(function () {
    
    $(".clickRevenuePerDay").on("click", function () {
    var d = $("#revenueDate").text();
    alert(d);
    var param = { date: "2008-08-10",
                  days: 7}
    $.getJSON("\ testGraph",  param, function(res){
        
    //    var s1 = res.s1;
    
    var r1 = [['2008-08-10 1:00PM', 112], ['2008-08-11 1:00PM', 122], ['2008-08-12 1:00PM', 104], 
              ['2008-08-13 1:00PM', 121],  ['2008-08-14 1:00PM', 161],  ['2008-08-15 1:00PM', 173], 
              ['2008-08-16 1:00PM', 173]];
    
    var r2 = [['2008-08-10', 112], ['2008-08-11', 122], ['2008-08-12', 104], 
              ['2008-08-13', 121],  ['2008-08-14', 161],  ['2008-08-15', 173], ['2008-08-16', 173]];

 
    plot1 = $.jqplot("chart1", [r1, r1], {
        // Turns on animatino for all series in this plot.
        animate: true,
        // Will animate plot on calls to plot1.replot({resetAxes:true})
        title : "Weekely Revenue Chart",
        animateReplot: true,
        cursor: {
            show: true,
            zoom: true,
            looseZoom: true,
            showTooltip: false
        },
        series:[
            {
                pointLabels: {
                    show: true
                },
                renderer: $.jqplot.BarRenderer,
                showHighlight: false,
                yaxis: 'y2axis',
                rendererOptions: {
                    // Speed up the animation a little bit.
                    // This is a number of milliseconds.  
                    // Default for bar series is 3000.  
                    animation: {
                        speed: 2500
                    },
                    barWidth: 15,
                    barPadding: -15,
                    barMargin: 0,
                    highlightMouseOver: false
                }
            }, 
            {
                rendererOptions: {
                    // speed up the animation a little bit.
                    // This is a number of milliseconds.
                    // Default for a line series is 2500.
                    animation: {
                        speed: 2000
                    }
                }
            }
        ],
        axesDefaults: {
            pad: 0
        },
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
                label: "Revenue For one week ",
                tickInterval: "1 day",
                drawMajorGridlines: false,
                drawMinorGridlines: true,
                drawMajorTickMarks: false,
                renderer:$.jqplot.DateAxisRenderer,
                tickOptions:{ 
                    fontSize:'10pt', 
                    fontFamily:'Tahoma', 
                    angle:-40
                }
                //rendererOptions: {
                //tickInset: 0.5,
                //minorTicks: 1
                //}
            },
            yaxis: {
                label: "Revenue in $",
                tickOptions: {
                    formatString: "$%'d"
                },
                rendererOptions: {
                    forceTickAt0: true
                }
            },
            y2axis: {
                tickOptions: {
                    formatString: "$%'d"
                },
                rendererOptions: {
                    // align the ticks on the y2 axis with the y axis.
                    alignTicks: true,
                    forceTickAt0: true
                }
            }
        },
        highlighter: {
            show: true, 
            showLabel: true, 
            tooltipAxes: 'y',
            sizeAdjust: 7.5 , tooltipLocation : 'ne'
        }
    });
    });
    });
});