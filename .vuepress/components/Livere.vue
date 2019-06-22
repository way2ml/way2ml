<template>
    <section style="border-top: 1px solid #eaecef;padding-top:1rem;margin-top:2rem;">
        <div id="lv-container" data-id="city" data-uid="MTAyMC80NDg0Mi8yMTM2Mw==">
        </div>
    </section>
</template>


<script type="text/javascript">
export default {
  mounted () {
    import('./Valine.vue').then(module => {
      // use code
    function myfun(d, s) {
        var j, e = d.getElementsByTagName(s)[0];

        if (typeof LivereTower === 'function') { return; }

        j = d.createElement(s);
        j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
        j.async = true;

        e.parentNode.insertBefore(j, e);
    }
    myfun(document, 'script');
    })
  }
}

</script>


