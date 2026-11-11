(function(){
 const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close ✕':'Menu ☰';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu ☰';}));}
 const dialog=document.querySelector('#image-viewer');
 if(dialog&&typeof dialog.showModal==='function'){
   const image=dialog.querySelector('img');const title=dialog.querySelector('.viewer-top span');
   document.querySelectorAll('[data-view-image]').forEach(button=>button.addEventListener('click',()=>{
     image.src=button.getAttribute('data-view-image');image.alt=button.querySelector('img')?.alt||'Enlarged project image';title.textContent=button.getAttribute('data-image-title')||'Project artwork';dialog.showModal();
   }));
   dialog.querySelector('.viewer-close')?.addEventListener('click',()=>dialog.close());
   dialog.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});
   dialog.addEventListener('close',()=>{image.removeAttribute('src');});
 }
 if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('js-motion');
  const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}})},{threshold:.06,rootMargin:'0px 0px -22px 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{observer.observe(el)});
 }
})();