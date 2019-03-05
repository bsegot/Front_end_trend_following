

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};


//window.randomScalingFactor = function() {
//	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.random() * 100;
//};


window.get_current_time = function() {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.


    var date = new Date();
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	return formattedTime;
};




var config = {
    type: 'line',
    data: {
        //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: [],
        datasets: [{
            label: 'ticker_A',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                //randomScalingFactor(),
                //randomScalingFactor(),
                //randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
        
        //to make animation stop, preventing bugs? 
        animation: {
            duration: 0
        },
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        ////////////


        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value of underlying'
                }
            }]
        }
    }
};



var current_graph = {   //current graph store the current graph we want to display
    type: 'line',
    data: {
        //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: [],
        datasets: [{
            label: 'ticker_A',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                //randomScalingFactor(),
                //randomScalingFactor(),
                //randomScalingFactor()
            ],
            fill: false,
        }]
    },
    options: {
        
        //to make animation stop, preventing bugs? 
        animation: {
            duration: 0
        },
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        ////////////


        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value of underlying'
                }
            }]
        }
    }
};



window.onload = function() {
    var ctx = document.getElementById('PortfolioChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
    hide_all_charts();
};


var colorNames = Object.keys(window.chartColors);



/*
document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + config.data.datasets.length,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [],
        fill: false
    };

    for (var index = 0; index < config.data.labels.length; ++index) {
        newDataset.data.push(randomScalingFactor());
    }

    config.data.datasets.push(newDataset);
    window.myLine.update();
});


document.getElementById('removeDataset').addEventListener('click', function() {
    config.data.datasets.splice(0, 1);
    window.myLine.update();
});

document.getElementById('removeData').addEventListener('click', function() {
    config.data.labels.splice(-1, 1); // remove the label first

    config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
    });

    window.myLine.update();
});
*/

window.get_latest_backend_data = function()
{
    return data_backend;
}



//to simulate the stock request we have a random point displayed every 5 sec
window.setInterval(function() {



    if (config.data.datasets.length > 0) {
        var current_time = get_current_time();
        config.data.labels.push(current_time);

        var raw_backend_data = get_latest_backend_data();
        var json_pulled_backend = JSON.parse(raw_backend_data);
        update_data_backend_to_frontend_var(json_pulled_backend);


        //we update each front end ticker dataset
        config.data.datasets.forEach(function(dataset) {
            let new_data_point = json_pulled_backend.object[0].data[json_pulled_backend.object[0].data.length - 1];
            dataset.data.push(new_data_point);
            //dataset.data.push(randomScalingFactor());
        });


        //updating the current graph
        //////////////////////
        var size_back_end_data = Object.keys(json_pulled_backend.object).length;
        var current_ticker = current_graph.data.datasets[0].label  

        for (i = 0; i < size_back_end_data; i++) 
        {
            
            if(json_pulled_backend.object[i].ticker == current_ticker)
            {
                let new_data_point = json_pulled_backend.object[i].data[json_pulled_backend.object[i].data.length - 1];

                current_graph.data.datasets[0].data.push(new_data_point);

                //test
                //current_graph.data.labels.push(new_data_point);
            }
        }
        //////////////////////



        window.myLine.update();
        window.current_chart.update();


    }
    // method to be executed;
  }, 5000);

  
  
  //check if we need to add data
  window.update_data_backend_to_frontend_var = function(data_back_end)
  {

    var size_back_end_data = Object.keys(data_back_end.object).length;
    var size_front_end_data = Object.keys(config.data.datasets).length;


    if(size_back_end_data > size_front_end_data)
    {
        add_element_to_front_end_var(data_back_end,size_back_end_data,size_front_end_data);
    }
    
    else if(size_back_end_data < size_front_end_data)
    {
        //delete_element_to_front_end_var(data_back_end,size_back_end_data,size_front_end_data);
    }    


  }


  //add the element to the front end graphs when we locate there is a new one
  window.add_element_to_front_end_var = function(data_back_end,size_back_end_data,size_front_end_data)
    {
        for (i = 0; i < size_back_end_data; i++) {
            var ticker_located = 0;
            for (j = 0; j < size_front_end_data; j++){
                if(data_back_end.object[i].ticker == config.data.datasets[j].label) //if we locate the ticker we flag the var,
                {
                    ticker_located = 1; 
                }
            }
            
            if(ticker_located == 0) // for every ticker that doesnt exist we add the data to our front end data
            {
                console.log('the missing data that we are adding to the dataset is')
                console.log(data_back_end.object[i].ticker)

                var colorName = colorNames[config.data.datasets.length % colorNames.length];
                var newColor = window.chartColors[colorName];
                var newDataset = {
                    label: data_back_end.object[i].ticker,
                    backgroundColor: newColor,
                    borderColor: newColor,
                    data: data_back_end.object[i].data,
                    fill: false
                };

                config.data.datasets.push(newDataset);
                window.myLine.update();

            
            }

          }

    }


  
  //delete one the element to the front end graphs when we locate there is too much and the back end flushed one
  window.delete_element_to_front_end_var = function(data_back_end,size_back_end_data,size_front_end_data)
    {
        for (i = 0; i < size_front_end_data; i++) {
            var ticker_located = 0;
            for (j = 0; j < size_back_end_data; j++){
                if(data_back_end.object[i].ticker == config.data.datasets[j].label) //if we locate the ticker we flag the var,
                {
                    ticker_located = 1; 
                }
            }
            
            if(ticker_located == 0) // for every ticker that doesnt exist if means we have to delete it from the front end
            {
                console.log('the missing data that we are deletring from the dataset is')
                console.log(data_back_end.object[i].ticker)

                config.data.datasets.splice(i, 1);
                window.myLine.update();

                break; //to prevent index problem we can only delete on at a time
            
            }

          }

    }



   
    //add the sufficient number of tabs for as many tickers there is
    window.append_tabs = function()
    {
        var raw_backend_data = get_latest_backend_data();
        var json_pulled_backend = JSON.parse(raw_backend_data);
        var size_back_end_data = Object.keys(json_pulled_backend.object).length;
        
        //we get the tickers name from the backend data (safer than front end if refresh problem) to create as many tabs as needed 
        //create the tabs
        for (i = 0; i < size_back_end_data; i++) { 
          var tab_name = json_pulled_backend.object[i].ticker;
          var tab_icon_id = "tab" + i;
          var href_ref = "chart" + i;
          if(i == 0) {var html_text = `<li><a id=${tab_icon_id} data-toggle="pill" href="#${href_ref}">${tab_name}</a></li>`}
          else {html_text = html_text + `<li><a id=${tab_icon_id} data-toggle="pill" href="#${href_ref}">${tab_name}</a></li>`}
        }      
        $( "#ticker_tabs" ).append(html_text);

        //create the canvas to save the content of each chart
        var canvas_html = `<div class="tab-content">` 
        for (j = 0; j < size_back_end_data; j++) { 
          var href_ref = "chart" + j;
          var canvas_id = "myChart" + j;
          if(j == 0) {var html_text2 = `<div id="${href_ref}" class="tab-pane active"> <canvas id="${canvas_id}" width="400" height="400"></canvas> </div>`  }
          else {html_text2 = html_text2 + `<div id="${href_ref}" class="tab-pane"> <canvas id="${canvas_id}" width="400" height="400"></canvas> </div>`  }
        } 
  
        html_text2 = canvas_html + html_text2 + '</div>'

        $( "#graph_content" ).append(html_text2);

    }



    
    window.append_graphs_tabs = function()
    {
        'use strict';

        var raw_backend_data = get_latest_backend_data();
        var json_pulled_backend = JSON.parse(raw_backend_data);
        var size_back_end_data = Object.keys(json_pulled_backend.object).length;

        var every_ticker = []

        for (var i = 0; i < size_back_end_data; i++) { 
            every_ticker.push(json_pulled_backend.object[i].ticker);
        }

        //we initialize the current ctx at the first ticker and create the graph
        var charts = {}; //creation of the global variable to synch the data


        var canvas_id_0 = "myChart0";
        var first_ctx = $(`#${canvas_id_0}`).get(0).getContext("2d");
        
        charts[canvas_id_0] = graph(first_ctx);

        $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {

            var current = $(e.target).attr('href').slice(1);
            try { var previous = $(e.relatedTarget).attr('href').slice(1); }
            catch(err) { console.log("first pass plot graph, bug expected")}
            
            var chart_id = "myChart" + current.slice(-1);
            var chart = $('#' + chart_id).get(0).getContext("2d");
            
            if (charts[previous]) {
                console.log('Deleting previous chart: ' + previous);
                charts[previous].destroy();
                charts[previous] = null;
            }
            if (chart) {
                console.log('Creating new chart: ' + current);
                var ticker_located = every_ticker[current.slice(-1)];
                charts["ticker"] = ticker_located;
                charts[current] = graph(chart,ticker_located,json_pulled_backend,size_back_end_data);
                window.current_chart = charts[current];
            }
        });
        
        function graph(chart,ticker_located,json_pulled_backend,size_back_end_data) {
            var data_graph = data_to_graph(ticker_located,json_pulled_backend,size_back_end_data)
            //console.log(json_pulled_backend)
            //return new Chart(chart,data_graph);
            return new Chart(chart,data_graph);
        }

    }
      


    window.data_to_graph = function(ticker_located,json_pulled_backend,size_back_end_data)
    {

        for (i = 0; i < size_back_end_data; i++) 
        {
            if(json_pulled_backend.object[i].ticker == ticker_located)
            {
                var dataset = json_pulled_backend.object[i].data;
            }
        }
        
        var colorName = colorNames[config.data.datasets.length % colorNames.length];
        var newColor = window.chartColors[colorName];
        current_graph.data =        
        {
            labels: dataset,
            datasets: [{
                label: ticker_located,
                backgroundColor: newColor,
                borderColor: newColor,
                data: dataset,
                fill: false,
            }]
        }

    return current_graph
   
}

    

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// ugly solution because I am tired to do nice code, just 'working'
/////////////////////////////////////////////////////////////////


    //if Summary button pressed
    $(document).ready(function(){
        $("#summary_front_page").click(function(){
            //lazy if case solution, just tired to code, just want to get over it....
            //should make a solution like graph tabs... but dont care
            hide_all_charts();
            $("#picture_fun").show();
        });
    });

    //if Positions button pressed
    $(document).ready(function(){
        $("#positions_front_page").click(function(){
            //lazy if case solution, just tired to code, just want to get over it....
            //should make a solution like graph tabs... but dont care
            hide_all_charts();
            $("#graph_content").show();
            //work to be done
            //a ) the tabs 
            //b ) setTimeout(myFunction, 3000) whenever we show for the first time to prevent unsunch with the data 
            append_tabs();
            append_graphs_tabs();
        });
    });


    //if Expected performances button pressed
    $(document).ready(function(){
        $("#performances_front_page").click(function(){
            //lazy if case solution, just tired to code, just want to get over it....
            //should make a solution like graph tabs... but dont care
            hide_all_charts();
            $("#picture_returns").show();
        });
    });

    //if About button pressed
    $(document).ready(function(){
        $("#about_front_page").click(function(){
            //lazy if case solution, just tired to code, just want to get over it....
            //should make a solution like graph tabs... but dont care
            hide_all_charts();
            $("#picture_about").show();
        });
    });
//

    window.hide_all_charts = function()
    {
        try {$("#picture_fun").hide();}
        catch(err) {}
        try {$("#picture_returns").hide();}
        catch(err) {}
        try {$("#graph_content").hide();}
        catch(err) {}
        try {$("#picture_about").hide();}
        catch(err) {}
    }