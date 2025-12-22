var posts=["2025/06/11/毕业遗憾/","2025/06/26/书摊/","2025/06/29/first_post/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };