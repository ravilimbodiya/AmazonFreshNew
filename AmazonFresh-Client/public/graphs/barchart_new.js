$(document).ready(function () {
    
    $(".clickRevenuePerDay").on("click", function () {
    $.getJSON("\ testGraph", function(res){
        alert(res.Message);
                
        var s1 = [2, 6, 7, 10];
        var s2 = [7, 5, 3, 2, 3, 4, 10];
        var ticks = ['12 July', '12 July', '12 July', '12 July', '12 July', '12 July', '12 July'];
         
        plot1 = $.jqplot('chart1', [s2], {
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true },
                barWidth: 6,
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            }
        });
     
        $('#chart1').bind('jqplotDataHighlight', 
            function (ev, seriesIndex, pointIndex, data) {
                $('#info2').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
             
        $('#chart1').bind('jqplotDataUnhighlight', 
            function (ev) {
                $('#info2').html('Nothing');
            }
        );
 

    });
    });
});