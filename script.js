console.log("hello");

d3.csv("visualizeRRAA.csv", function(data) { // updated dataset
  console.log(data);
  const margin = {top: 20, right: 40, bottom: 20, left: 20}
  const _HackPadding = {y: 5, x:30}
  const width = 600 - margin.left - margin.right;
	const height = 600 - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
      .domain([0,311])
      .range([0, width]);
  const yScale = d3.scaleLinear()
      .domain([0,1])
      .range([height, 0]);

  const dotYScale = d3.scaleLinear()
      .domain([0,1])
      .range([height - _HackPadding.y, 0]);
  const dotXScale = d3.scaleLinear()
      .domain([0,311])
      .range([0, width - _HackPadding.x ]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

	//Create SVG element
	const svg = d3.select("#main")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				.attr("style",
          "border: thin solid rgb(13, 0, 65); border-radius: 2px;"
        );

	const scatter = svg.selectAll("circle")
	   .data(data)
	   .enter()
	   .append("circle")
	   .attr("cx", function(data){
       return dotXScale(data.index);
     })
     .attr("transform", "translate(10,0)")
	   .attr("cy", function(data){
       return dotYScale(data.rrightAndAll);
     })
	   .attr("r", 3)
     .attr("opacity", 0.5)
     .style("fill", "#3240ff")
     .on("mouseover", function(d) {
        d3.select(this)
          .attr("r", 6)
          .style("fill", "#ff7441")
          .style("cursor", "pointer");
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .attr("r", 3)
          .style("fill", "#3240ff");
      });


  const conX = d3.select("#conX")
			.append("svg")
      .attr("width", 60)
      .attr("height",600);
  conX.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .text("Ratio")
      .attr("transform","translate(20,300)");

  const conY = d3.select("#conY")
			.append("svg")
      .attr("width", 600)
      .attr("height",60);
  conY.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .text("Index")
      .attr("transform","translate(390,20)");

  // text axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(10," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(10,0)")
      .call(yAxis)

  d3.select("#rRAA").on("click", function() {
  	scatter
  		.transition()
  		.attr("cx", function(data) {
  			return dotXScale(data.index);
  		})
  		.attr("cy", function(data) {
  			return dotYScale(data.rrightAndAll);
  		})
  });

  d3.select("#rTAT").on("click", function() {
  	scatter
  		.transition()
  		.attr("cx", function(data) {
  			return dotXScale(data.index);
  		})
  		.attr("cy", function(data) {
  			return dotYScale(data.rThinkAndRight);
  		})
  });

  d3.select("#uR").on("click", function() {
  	scatter
  		.transition()
  		.attr("cx", function(data) {
  			return dotXScale(data.index);
  		})
  		.attr("cy", function(data) {
  			return dotYScale(data.uR);
  		})
  });

});
