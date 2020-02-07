

 //Getting Data
jQuery.getJSON("samples.json", function(json) {
    var data = json
    var ref_number = 0
    // Grab values from the response json object to build the plots
    var namez = data.names;
    var otu_ids = []
    var sample_values = []
    var otu_labels = []
    var ids = []
    var ethnicities = []
    var genders = []
    var ages = []
    var locations = []
    var bbtypes = []
    var wfreqs = []

    
//Calls my data and puts it into empty arrays

    for (i = 0; i < data.samples.length; i++) { 
        sample_values.push(data.samples[i].sample_values);
        otu_labels.push(data.samples[i].otu_labels);
        otu_ids.push(data.samples[i].otu_ids)
    }

    for (i = 0; i < data.metadata.length; i++) { 
                ids.push(data.metadata[i].id);
        ethnicities.push(data.metadata[i].ethnicity);
        genders.push(data.metadata[i].gender);
        ages.push(data.metadata[i].age);
        locations.push(data.metadata[i].location);
        bbtypes.push(data.metadata[i].bbtype);
        wfreqs.push(data.metadata[i].wfreq);

    }
    
  
    //Demographic Data - Makes the chart
    function make_dems(number) {
        d3.select("#sample-metadata").text('')
        d3.select("#sample-metadata").append("p").text(`ID: ${ids[number]}`);
        d3.select("#sample-metadata").append("p").text(`Ethnicity: ${ethnicities[number]}`);
        d3.select("#sample-metadata").append("p").text(`Gender: ${genders[number]}`);
        d3.select("#sample-metadata").append("p").text(`Age: ${ages[number]}`);
        d3.select("#sample-metadata").append("p").text(`Location: ${locations[number]}`);
        d3.select("#sample-metadata").append("p").text(`bbtype: ${bbtypes[number]}`);
        d3.select("#sample-metadata").append("p").text(`wfreq: ${wfreqs[number]}`);

    }
    console.log(ids)
    make_dems(ref_number)
    otu_idz = otu_ids.map(object => `"${object}"`)
  
    //Bar Chart
    function makebar(number) {
        var trace1 = {
            type: 'bar',
        
            text: otu_labels[number].slice(0,10),
            x: sample_values[number].slice(0,10),
            y: otu_idz[number].slice(0,10),
            orientation: "h",
            line: {
                color: "#17BECF"
      }

    };

        data = [trace1]

        var layout = {
            title: `Most Common Biodiversity in Patient ${namez[number]}`,
            xaxis: {

            title: {
                text: "Sample Value"
            }
       
            },
            yaxis: {
                    tickvals: [0,1,2,3,4,5,6,7,8,9],
                    ticktext: otu_ids[number],
                    tickmode: "array",
                    range: [9.5, -.5],
                //By reversing the range ([9.5, -.5] as opposed to [-.5, 9.5]), 
                //we can get our highest values on top like in the example.
                    
                    title: {
                        text: "OTU ID"
                        }
        

                    }
                    };
                    
                
                Plotly.newPlot("bar", data, layout);
                }
makebar(ref_number)
 
//Appends all of the names to the dropdown menu.
d3.select("#dropdown").text(namez[ref_number])

for (i = 0; i < namez.length; i++) { 

d3.select("select").append("option").text(namez[i])


}



var inputElement = d3.select("#selDataset");
var inputValue = inputElement.property("value");


var button = d3.select("#selDataset");







console.log(otu_ids)

//BUBBLE CHART
function make_bubble(number) {
    var trace2 = {
        x: otu_ids[number],
        
        y: sample_values[number],
        text: otu_labels[number],
        mode: 'markers',
        marker: {
    
            size: sample_values[number],
            color: otu_ids[number],
        }
    };
  
    var data = [trace2];
  
    var layout = {
        yaxis: {

            title: {
                text: "Sample Value"
            }
        },
        xaxis: {

            title: {
                text: "OTU ID"
            }
        },
        title:  `Most Common Biodiversity in Patient ${namez[number]}`,
        showlegend: false,
        height: 600,
        width: 1200,
        range: [-500, 3500]

    
    };
  
    Plotly.newPlot('bubble', data, layout);

}

make_bubble(ref_number)



//Makes Gauge Chart
function make_gauge(number) {

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreqs[number],
          title: { text: `Scrubs Per Week for Patient ${namez[number]}` },
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 380 },
          gauge: {
            axis: { range: [null, 10] },
            steps: [
              { range: [0, 2], color: "rgba(255, 0, 0, 0.6)" },
              { range: [2, 4], color: "rgba(255, 165, 0, 0.6)" },
              { range: [4, 6], color: "rgba(255, 255, 0, 0.6)" },
              { range: [6, 8], color: "rgba(144, 238, 144, 0.6)" },
              { range: [8, 10], color: "rgba(154, 205, 50, 0.6)" }
            ],
           
        
            
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}
make_gauge(ref_number)


//Updates all of the charts.

button.on("change", function() {

    console.log('click')
function optionChanged(){
    inputElement = d3.select("#selDataset");
    inputValue = inputElement.property("value");
    console.log(inputValue)
    for (i = 0; i < namez.length; i++) {

        if (inputValue === namez[i]) {
            ref_number = i
            console.log(ref_number)
            console.log(otu_ids)
            make_dems(ref_number)
            makebar(ref_number)
            make_gauge(ref_number)
            make_bubble(ref_number)
            
                }
                
        else {}
            
    
}}
optionChanged()
}
);
});






