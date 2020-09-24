<template>
    <iframe :src="framesrc"  :height="height" width="100%" frameborder="no"></iframe>
</template>

<script>
export default {
  props: ['src', 'height'],
  computed: {
    framesrc () {
      return  this.src
    }
  }
}
</script>
