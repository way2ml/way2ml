<template>
  <div id="app">
    <canvas ref="chart" id="testChart" width="400" height="150"></canvas>
    <!-- <input type="button" value="Add Data" onclick="addData" ></button> -->
    <button @click = "addData">掷骰子🎲</button>
  </div>
</template>


<script>
import Chart from 'chart.js';
export default{
    data() {
        return {
                myChart: "",
            }
    },

    mounted() {
                var chart = this.$refs.chart;
                var ctx = chart.getContext("2d");
                this.myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            },



    methods:{
            addData() {
                    var label = "Black"
                    var data = "8"
                    this.myChart.data.labels.push(label);
                    this.myChart.data.datasets.forEach((dataset) => {
                        dataset.data.push(data);
                    });
                    this.myChart.update();
                },
    }

}

</script>