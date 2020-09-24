<template>
    <div class="counter">
        <canvas id="dice-chart" width="400" height="150"></canvas>
        <button @click = "dice">掷骰子🎲</button>
        <button @click = "clear">清除记录</button>
        <div> 点数之和: {{sum_his}}</div>
        <div> 投掷次数: {{dice_num}}</div>
        <div> 平均点数: {{mean}}</div> 
        <div> 历史记录: {{history}} </div>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    export default {
        // Global Variabals 
        data(){
            return{
                value: "",
                history: [],
                means: [],
                sum_his: 0,
                dice_num: 0,
                mean: 0,
                myChart: "",

            }
        },
        
        mounted(){
            this.createPlot("dice-chart")
        },

        methods:{
            getRandomNumberBetween: function(min,max){
                return Math.floor(Math.random()*(max-min+1)+min);
            },

            createPlot: function(id){
                var ctx = document.getElementById(id).getContext('2d');
                this.myChart = new Chart(ctx,{
                    type: 'line',
                    data:{
                        
                        // labels: [],
                        datasets:[
                        {
                            fill: false,
                            label: '均值',
                            data: this.means,
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 3
                        },
                        {
                            fill: false,
                            label: '点数',
                            data: this.history,
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1
                        }],
                    },
                    options: {
                    title: {
                        display: false,
                        text: '试验记录'
                    }, 
                    scales: {
                        yAxes: [{ 
                                ticks: {
                                suggestedMin: 1,
                                suggestedMax: 6
                        },
                        scaleLabel: {
                            display: false,
                            labelString: "",
                            
                        }
                        }]
                    }
                    }
                })                
            },

            addData: function(chart, label, data0, data1) {
                chart.data.labels.push(label);
                chart.data.datasets[0].data.push(data0);
                chart.data.datasets[1].data.push(data1);
                chart.update();
            },

            removeData: function(chart) {
                chart.data.labels.pop();
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.pop();
                });
                chart.update();
            },

            emptyData: function(chart) {
                chart.destroy();
                this.createPlot("dice-chart")
            },

            dice(){
                // Get a radom number between [1,6]
                var value = this.getRandomNumberBetween(1,6);
                this.history.push(value);
                // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                this.sum_his = this.history.reduce(reducer);
                this.dice_num = this.history.length;
                this.mean = (this.sum_his/this.dice_num).toFixed(4);
                this.means.push(this.mean);
                this.myChart.data.labels.push(this.dice_num)
                this.myChart.update()
            },

            clear(){
                this.history = [];
                this.sum_his = 0;
                this.dice_num = 0;
                this.mean = 0;
                this.means = [];
                this.emptyData(this.myChart);
            },

        }
    }
</script>



<style scoped>

button{
    display: inline-block;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
    border-radius: 5px;
    /* box-shadow: 0px 0px 5px 0px rgb(11, 11, 114);    */
}
</style>