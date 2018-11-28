var margin = {top: 40, right: 20, bottom: 30, left: 40},
    totalWidth = 800,
    totalHeight = 500,
    width = totalWidth - margin.left - margin.right,
    height = totalHeight - margin.top - margin.bottom;
var formatPercent = d3.format(",d");

var categories = ['DEV', 'STAG', 'PROD'];

// 定义比例尺
// 定义坐标轴
var xScale = d3.scaleBand()
               .range([0, width])
               .padding(0.2)
							 .domain(categories);
var xAxis = d3.axisBottom(xScale);

var yScale = d3.scaleLinear()
               .range([height, 0])
							 .domain([0, 5]);
var yAxis = d3.axisLeft(yScale)
              .tickFormat(formatPercent);


// 创建绘图区域
var svg = d3.select("#container")
            .append("svg")
            .attr("width", totalWidth)
            .attr("height", totalHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




d3.tsv("data.tsv", function(error, data) {
  xScale.domain(data.map(function(d) {return d.letter;}));
  yScale.domain([0, d3.max(data, function(d) {return d.frequency;})]);
  svg.append("g")
     .attr("class", "x-axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis);
  svg.append("g")
     .attr("class", "y-axis")
     .call(yAxis)
     .append("text").attr("transform", "rotate(-90)")
     .attr("y", 6).attr("dy", "0.71em")
     .attr("text-anchor", "end").text("频率");

  svg.append("g")
     .attr("class", "bars")
     .selectAll(".bar")
     .data(data).enter()
     .append("rect").attr("class", "bar")
     .attr("x", function(d) { return xScale(d.letter); })
     .attr("width", xScale.bandwidth())
     .attr("y", function(d) { return yScale(d.frequency); })
     .attr("height", function(d) {
       return height - yScale(d.frequency);
     });

  // 绘制图例
  var legendWrap = svg.append("g");
  var series = legendWrap.append("g").attr("class", "series");
  series.append("circle")
        .attr("stroke-width", 2)
        .attr("fill", "steelblue")
        .attr("stroke", "steelblue")
        .attr("r", 6);
  series.append("text")
        .attr("font-size", "0.75em")
        .attr("text-anchor", "start")
        .attr("dy", ".32em")
        .attr("dx", 12)
        .text("英文字母");
  var legendWidth = legendWrap.node().getBoundingClientRect().width;
  legendWrap.attr("transform", "translate(" + (width - legendWidth) / 2 + ", -16)");
});
