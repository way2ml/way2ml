<template>
    <div>
        <canvas id="dice-dis" width="300" height="100"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    export default {
        data(){
            return{
                myChart: "",
            }
        },
        
        mounted(){
            this.createPlot("dice-dis")
        },

        methods:{
            createPlot: function(id){
                var ctx = document.getElementById(id).getContext('2d');
                this.myChart = new Chart(ctx,{
                    type: 'bar',
                    data:{
                        labels: [1,2,3,4,5,6],
                        datasets:[
                        {
                            label: '概率',
                            backgroundColor: ["#3cba9f","#3cba9f","#3cba9f","#3cba9f","#3cba9f","#3cba9f"],
                            data: [1/6, 1/6, 1/6, 1/6, 1/6, 1/6, 1/6]
                        }],
                    },
                    options: {
                    title: {
                        display: false,
                        text: '随机变量X的概率分布'
                    }, 
                    scales: {
                        yAxes: [{ 
                                ticks: {
                                suggestedMin: 0,
                                suggestedMax: 0.18
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "P(X=x)",
                            
                        }
                        }],
                        xAxes: [{ 
                        scaleLabel: {
                            display: true,
                            labelString: "x",
                            
                        }
                        }],
                    }
                    }
                })                
            },

        }
    }
</script>