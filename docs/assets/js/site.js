// site.js - small utilities: active nav + simple pagination handling
(function(){
  function setActiveNav(){
    var path = location.pathname.split('/').pop();
    var links = document.querySelectorAll('.main-nav a');
    links.forEach(function(a){
      var href = a.getAttribute('href');
      if(!href) return;
      var filename = href.split('/').pop();
      if(filename === path || (filename === 'index.html' && (path === '' || path === 'index.html'))){
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    })
  }

  function wirePagination(){
    document.querySelectorAll('.pagination a.page').forEach(function(a){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var t = a.textContent.trim();
        // naive behavior: show alert for demo
        if(/\d+/.test(t)){
          alert('Pagination demo — page '+t);
        } else if(t.toLowerCase().includes('préc')){
          alert('Pagination demo — précédent');
        } else {
          alert('Pagination demo — suivant');
        }
      })
    })
  }

  document.addEventListener('DOMContentLoaded', function(){
    setActiveNav();
    wirePagination();
  });
})();
