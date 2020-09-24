<template>
  <section>
    <div id="dia"></div>
  </section>
</template>

<script>
import * as d3 from 'd3'
 
export default {
  name: 'VisualComponent',
  mounted() {
    const data = [1, 2, 3, 4, 5]
    const svg = d3
      .select('#dia')
      .append('svg')
      .attr('width', 400)
      .attr('height', 300)
 
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return i * 50
      })
      .attr('y', 10)
      .attr('width', 25)
      .attr('height', function(d) {
        return d * 51
      })
      .attr('fill', 'steelblue')
  }
}
</script>