<template>
  <figure align='center'>
    <img :src="imagesrc" :width="width" alt=""/>
    <figcaption><i><small><small>{{ caption }}</small></small></i></figcaption>
  </figure>
</template>
<script>
export default {
  props: ['src', 'caption', 'width'],
  computed: {
    imagesrc () {
      return  this.src
    }
  }
}
</script>