var posts=["2025/06/11/毕业遗憾/","2025/06/26/书摊/","2025/12/21/love/","2025/09/11/competition/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };