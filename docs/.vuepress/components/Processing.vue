<template>
  <div class="border" al>
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
  </div>
</template>

<script>
export default{
        mounted() {
        const script = function (p5) {
            p5.setup = _ => {
                var canvas = p5.createCanvas(880, 400, p5.WEBGL);
                canvas.parent("p5Canvas");
            }

            p5.draw = _ => {
                p5.background(255);
                p5.rotateY(p5.frameCount * 0.01);

                for (let j = 0; j < 5; j++) {
                    p5.push();
                    for (let i = 0; i < 80; i++) {
                    p5.translate(
                        p5.sin(p5.frameCount * 0.001 + j) * 100,
                        p5.sin(p5.frameCount * 0.001 + j) * 100,
                        i * 0.1
                    );
                    p5.rotateZ(p5.frameCount * 0.002);
                    p5.push();
                    p5.sphere(8, 6, 4);
                    p5.pop();
                    }
                    p5.pop();
                }
            }
        }

        const P5 = require('p5')
        new P5(script)
        },

}
</script>


<style scoped>
.border{
    /* display: inline-block; */
    margin: auto;
    /* margin-left: 20%;
    margin-right: 20%;  */
    /* background-color: rgb(240, 240, 240); */
    /* border-radius: 8px; */
}
</style>