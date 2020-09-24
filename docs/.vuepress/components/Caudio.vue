<template>
  <p align='center'>
    <img :src="imagesrc" />
    <audio :src="audiosrc"  controls preload></audio>
  </p>
</template>
<script>
export default {
  props: ['src'],
  computed: {
    audiosrc () {
      return  this.src
    }
  }
}
</script>