<template>
    <div id="lv-container"
        :data-id="id"
        :data-uid="uid"
    ></div>
</template>

<script>
    export default {
        name: 'LiveRe',
        props: ['id', 'uid'],
        mounted() {
            const ds = document.createElement('script');
            if (typeof LivereTower === 'function') return;
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = 'https://cdn-city.livere.com/js/embed.dist.js';
            const s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ds, s);
        }
    };
</script>