<template>
  <div id="vcomments"></div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function(){
    // require window 
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
      
    }
     
    new Valine({
      el: '#vcomments' ,
      appId: 'bKhpPxwqujntQRo3oE7KgieU-gzGzoHsz',// your appId
      appKey: 'EtDxnn4BbsROCHcgEnn1e3pp', // your appKey
      notify:false, 
      verify:false, 
      avatar:'mm', 
      placeholder: '撰写评论' 
    });
  },
}
</script>