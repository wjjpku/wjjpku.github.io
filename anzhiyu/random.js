var posts=["2025/06/25/hello-world/","2025/06/29/post/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };