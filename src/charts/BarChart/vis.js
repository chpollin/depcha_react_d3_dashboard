import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    d3.select('.vis-barchart > *').remove();
    const data = props.data;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const value_type = "income";
    console.log("In Vis Component:" + data);
    console.log(data);


    
    let svg = d3.select('.vis-barchart').append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                   
        const graph = svg.append('g')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    


      // + ... cast to number as d3.max from datatype string is different
      const bk_value = d => +d[value_type];

      //const bk_income = d => d.income;
      //const bk_expens = d => d.expens;
      const bk_date = d => d.date;
      
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, bk_value)]) 
        .range([innerHeight, 0])
        .nice();  

      // scale on x axis
      const x = d3.scaleBand()
        .domain(
          // define sorting 
          data.map(bk_date).sort(function(a, b) {return a - b; })
          )
        .range([0,innerWidth])
        .padding(0.05);
        
    

      // y-Axis
      const gYAxis = graph.append('g');
    
      const yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickSize(-innerWidth)
        .tickFormat(d => `£ ${d / 1000}K`);  
      
      gYAxis.call(yAxis);
 
      const rects = graph.selectAll('rect')
      .data(data);  

    
          
      rects.attr('width', x.bandwidth)
        .attr('class', 'bar-rect')
        .attr('height', d => innerHeight - y(d[value_type]))
        .attr('x', d => x(d.date))
        .attr('y', d => y(d[value_type]));  
          
      rects.enter()
        .append('rect')
          .attr('class', 'bar-rect')
          .attr('width', x.bandwidth)
          .attr('height', d => innerHeight - y(d[value_type]))
          .attr('x', d => x(d.date))
          .attr('y', d => y(d[value_type])) 
        .append('title')
          .text(d => d[value_type]); 

      const gXAxis = graph.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);

      const xAxis = d3.axisBottom(x);
      // show x-axis  
      gXAxis.call(xAxis);
      // style text of x-axis
      gXAxis.selectAll('text')
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");


        //console.log(data);
        //console.log(bk_value);
        //console.log(d3.max(data, bk_value));


 /*
    // format the data
    data.forEach(function(d) {
        d.age = +d.age;
    });

    // Scale the range of the data in the domains
    let x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
    let y = d3.scaleLinear()
          .range([height, 0]);
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.age; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.age); })
        .attr("height", function(d) { return height - y(d.age); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
*/
}

export default draw;