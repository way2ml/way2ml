<template>
  <div id="app">
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import planetChartData from './js/chart-data.js';
export default{
    mounted() {
        this.createChart('planet-chart', this.planetChartData);
    },

    data() {
        return {
                planetChartData: planetChartData,
            }
    },

    methods:{
          createChart(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
            type: chartData.type,
            data: chartData.data,
            options: chartData.options,
            });
        }
    },
}
</script>