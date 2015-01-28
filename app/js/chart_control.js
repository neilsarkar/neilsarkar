angular.module('neil').controller('ChartControl', [
  function() {
    var data = [4, 8, 15, 16, 23, 42],
        width = 420,
        barHeight = 20;

    var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, width]);

    var chart = d3.select('.chart')
      .attr('width', width)
      .attr('height', barHeight * data.length);

    var bar = chart.selectAll('g')
      .data(data)
    .enter().append('g')
      .attr('transform', function(d, i) { return 'translate(0,'+i*barHeight+')'});

    bar.append('rect')
      .attr('width', x)
      .attr('height', barHeight - 1);

    bar.append('text')
      .attr('x', function(d) { return x(d) - 3 })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(function(d) { return d; });

    // ALPHABET
    var svg = d3.select('#alphabet').append('svg')
      .attr("width", 960)
      .attr("height", 400)
    .append("g")
      .attr("transform", "translate(32,"+(400/2)+")");

    var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

    update(alphabet)
    function update(letters) {
      var text = svg.selectAll('text')
        .data(letters, function(d) {
          return d.charCodeAt(0)
        })
        .style({fill: 'black'});

      text
        .transition().duration(750)
        .attr("x", function(d, i) { return i*32; });

      text.enter().append('text')
        .style({fill: 'green'})
        .attr("x", function(d, i) { return i*32; })
        .attr("y", -20)
        .style("fill-opacity", 1e-6)
      .transition().duration(750)
        .attr("y", 0)
        .style('fill-opacity', 1);

      text
        .text(function(d) { return d;})
        .attr("dy", "-.35em");

      text.exit()
        .style({fill: 'brown'})
        .transition().duration(750)
        .attr('y', '150px')
        .style('fill-opacity', 1e-6)
        .remove();
    }

    // Grab a random sample of letters from the alphabet, in alphabetical order.
    setInterval(function() {
      update(shuffle(alphabet)
          .slice(0, Math.floor(Math.random() * 26))
          .sort());
    }, 1500);

    // Shuffles the input array.
    function shuffle(array) {
      var m = array.length, t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m], array[m] = array[i], array[i] = t;
      }
      return array;
    }
  }
])
