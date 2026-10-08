var posts=["2025/06/26/bookstalls/","2025/09/11/competition/","2026/06/28/llm-interpretability/","2025/12/21/love/","2025/06/11/missing-senior-year/","2026/03/20/passing-the-torch/","2026/06/30/s5-circuit/"];function toRandomPost(){
    window.location.href='/'+posts[Math.floor(Math.random() * posts.length)];
  };