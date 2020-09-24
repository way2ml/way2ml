<template>
    <div class="counter">
        <button @click = "dice">掷骰子🎲</button>
        <button @click = "clear">清除记录</button>
        <div> 投掷次数: {{dice_num}}</div>
        <div> 点数之和: {{sum_his}}</div>
        <div> 平均点数: {{mean}}</div>   
        <div> 历史结果: {{history}}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                history: [],
                sum_his: 0,
                dice_num: 0,
                mean: 0,
            }
        },
        
        // Define a function to sum a list
        sum: function(arr){
            var sum = 0;
            for (var i=0,len=arr.length; i<len; ++i) {
                sum += arr[i];
            };
            return sum;
        },
        methods:{

            getRandomNumberBetween: function(min,max){
                return Math.floor(Math.random()*(max-min+1)+min);
            },

            dice(){
                // Get a radom number between [1,6]
                var value = this.getRandomNumberBetween(1,6);
                this.history.push(value);
                // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                // console.log(this.history, this.history.reduce(reducer), this.history.length)
                this.sum_his = this.history.reduce(reducer);
                this.dice_num = this.history.length;
                this.mean = (this.sum_his/this.dice_num).toFixed(4);
            },

            clear(){
                this.history = [];
                this.sum_his = 0;
                this.dice_num = 0;
                this.mean = 0;
            },
        }
    }
</script>


<style scoped>
.counter{
    /* display: inline-block; */
    /* margin-left: 2%;
    margin-right: 2%; */
    /* background-color: rgb(240, 240, 240); */
    /* border-radius: 8px; */
}
button{
    display: inline-block;
    padding: 20px;
    margin: 10px;
    font-weight: bold;
    border-radius: 5px;
    /* box-shadow: 0px 0px 5px 0px rgb(11, 11, 114);    */
}
h1{
    text-align: center;
}
h2{
    text-align: left;
}
</style>