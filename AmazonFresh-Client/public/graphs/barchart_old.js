  $(document).ready(function () {
    
    $(".ShowRevenuePerWeek").on("click", function () {
    $('#chart1').empty();   // reload the chart
    var d = $("#revenueDate").text();
    alert(d);
    var param = { date: "2008-08-10",
                  days: 7}
    $.getJSON("\ testGraph",  param, function(res){
        
    var r1 = res.s1;
    
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
                label: "Date",
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

//////////////***************      Start showRidesPerArea ***************///////////////////////////
        
        $(".getStatesAndGenerateGraph").on("click", function () {
        $('#chart2').empty();       // reload the chart
        i=0;
        var ticks =[];
        $('.states_checkbox:checked').each(function () {
           ticks[i++] = "'"+$(this).val()+"'";
       });
        alert(ticks);
        var param = ticks;
        $.getJSON("\ testGraph_3",  param, function(res){
        var s1 = res.s1;
         
        plot2 = $.jqplot('chart2', [s1], {
            title : "Total Rides Per Area",
            animateReplot: true,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    label: "States",
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                },
                yaxis: {
                label: "Total Rides"

            }}
        });
     
        $('#chart2').bind('jqplotDataHighlight', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data[1]);
            }
        );
             /*
        $('#chart2').bind('jqplotDataUnhighlight', 
            function (ev) {
                $('#info2').html('Nothing');
            }
        );*/}
    });

//////////////***************      end  showRidesPerArea ***************///////////////////////////
//////////////***************      Start showRidesPerDriver ***************///////////////////////////
        
        $(".getDriverMonthAndGenerateGraph").on("click", function () {
        $('#chart3').empty();       // reload the chart
        i=0;
        var ticks =[];
        $('.Driver_month_checkbox:checked').each(function () {
           ticks[i++] = "'"+$(this).val()+"'";
       });
        alert(ticks);
        $.getJSON("\ testGraph_3",  param, function(res){

        var s1 = res.s1;
         
        plot2 = $.jqplot('chart3', [s1], {
            title : "Total Rides Per Driver",
            animateReplot: true,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    label: "Month",
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                },
                yaxis: {
                label: "Total Rides"

            }}
        });
     
        $('#chart3').bind('jqplotDataHighlight', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info3').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data[1]);
            }
        );
             /*
        $('#chart2').bind('jqplotDataUnhighlight', 
            function (ev) {
                $('#info3').html('Nothing');
            }
        );*/}
    });

//////////////***************      end  showRidesPerDriver ***************///////////////////////////
//////////////***************      Start showRidesPerCustomer ***************///////////////////////////
        
        $(".getCustomerMonthAndGenerateGraph").on("click", function () {
        $('#chart4').empty();       // reload the chart
        i=0;
        var ticks =[];
        $('.Customer_month_checkbox:checked').each(function () {
           ticks[i++] = "'"+$(this).val()+"'";
       });
        alert(ticks);
        $.getJSON("\ testGraph_3",  param, function(res){
        var s1 =res.s1
         
        plot2 = $.jqplot('chart4', [s1], {
            title : "Total Rides Per Customer",
            animateReplot: true,
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    label: "Month",
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                },
                yaxis: {
                label: "Total Rides"

            }}
        });
     
        $('#chart4').bind('jqplotDataHighlight', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info4').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data[1]);
            }
        );
             /*
        $('#chart2').bind('jqplotDataUnhighlight', 
            function (ev) {
                $('#info4').html('Nothing');
            }
        );*/}
    });

//////////////***************      end  showRidesPerCustomer ***************///////////////////////////

});