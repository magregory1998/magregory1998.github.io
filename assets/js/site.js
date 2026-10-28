/* Small, dependency-free enhancements. Site remains readable without JavaScript. */
(()=>{
  'use strict';
  const header=document.querySelector('.site-header');
  const progress=document.querySelector('.progress');
  const mobileToggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#primary-nav');
  if(mobileToggle && nav){
    mobileToggle.addEventListener('click',()=>{
      const open=mobileToggle.getAttribute('aria-expanded')!=='true';
      mobileToggle.setAttribute('aria-expanded',String(open));
      mobileToggle.textContent=open?'Close ✕':'Menu ☰';
      nav.classList.toggle('open',open);
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.textContent='Menu ☰';
    }));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape' && nav.classList.contains('open')){
        nav.classList.remove('open');mobileToggle.setAttribute('aria-expanded','false');mobileToggle.textContent='Menu ☰';mobileToggle.focus();
      }
    });
  }
  if(header && progress){
    let raf=0;
    const update=()=>{raf=0;const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,scrollY/max):0})`;};
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update);},{passive:true});
    addEventListener('resize',update);update();
  }
  document.documentElement.classList.add('js-reveal');
  const reveal=[...document.querySelectorAll('[data-reveal]')];
  if(reveal.length){
    if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});
      },{threshold:.08,rootMargin:'0px 0px -25px 0px'});
      reveal.forEach(el=>observer.observe(el));
    }else{reveal.forEach(el=>el.classList.add('is-visible'));}
  }
  const projects={
    floor:{image:'assets/images/floor-plan.svg',alt:'Illustrative architectural floor plan graphic, not a product screenshot.',caption:'Making architectural content easier to use',link:'projects/floor-planning.html'},
    fire:{image:'assets/images/fire-planning.svg',alt:'Illustrative fire safety workflow map, not a product screenshot.',caption:'Researching and defining five emergency workflows',link:'projects/fire-emergency.html'},
    recon:{image:'assets/images/reconstruction.svg',alt:'Illustrative road reconstruction diagram, not a product screenshot.',caption:'Translating field requirements into specialized tools',link:'projects/accident-reconstruction.html'}
  };
  const tabs=[...document.querySelectorAll('[data-work]')];
  const screen=document.getElementById('workbench-screen'),image=document.getElementById('workbench-image'),caption=document.getElementById('workbench-caption'),link=document.getElementById('workbench-link'),panel=document.getElementById('workbench-description');
  if(tabs.length && screen && image && caption && link && panel){
    let pending=0;
    const selectTab=(tab,focus=false)=>{
      const data=projects[tab.dataset.work];if(!data)return;
      tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
      panel.setAttribute('aria-labelledby',tab.id);
      if(pending)clearTimeout(pending);
      screen.classList.add('swap');
      pending=setTimeout(()=>{image.src=data.image;image.alt=data.alt;caption.textContent=data.caption;link.href=data.link;screen.classList.remove('swap');pending=0;},160);
      if(focus)tab.focus();
    };
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>selectTab(tab));
      tab.addEventListener('keydown',e=>{
        const dir=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
        if(dir){e.preventDefault();selectTab(tabs[(i+dir+tabs.length)%tabs.length],true);}
        if(e.key==='Home'){e.preventDefault();selectTab(tabs[0],true);}
        if(e.key==='End'){e.preventDefault();selectTab(tabs[tabs.length-1],true);}
      });
    });
  }
  const methods={
    discover:{index:'THE PROBLEM / 01',title:'First, figure out what is actually wrong.',body:'Customer feedback, product searches, existing diagrams, or my own review usually reveal the first clue. I look for the underlying problem instead of rushing to add more content.',example:'EXAMPLE → A search for “computer” once surfaced duplicates from several libraries.'},
    define:{index:'RESEARCH / 02',title:'Learn enough to make a good decision.',body:'I study competing products, professional conventions, documentation, and how customers use the product. Then I write up the problem, evidence, research and recommended scope.',example:'EXAMPLE → Reading NFPA references and comparing fire-planning products before defining the core workflows.'},
    build:{index:'SCOPE / 03',title:'Keep the first release focused.',body:'I decide which symbols, templates and improvements belong in the first useful release, explain the reasoning, and review major proposals with my Product Manager. Engineering requests are not a prerequisite for most of my work.',example:'EXAMPLE → Starting with the common HVAC plan needs instead of trying to ship every possible symbol.'},
    learn:{index:'DELIVERY / 04',title:'Make it work, not just look good.',body:'I build and organize the content, test it in QA and staging, check it after production deployment, and watch feedback and usage to decide what needs another pass.',example:'EXAMPLE → Testing whether floor-plan symbols scale, recolor and ungroup as customers expect.'}
  };
  const methodButtons=[...document.querySelectorAll('[data-method]')];
  const methodIndex=document.getElementById('method-index'),methodTitle=document.getElementById('method-title'),methodBody=document.getElementById('method-body'),methodExample=document.getElementById('method-example');
  if(methodButtons.length && methodIndex && methodTitle && methodBody && methodExample){
    methodButtons.forEach(button=>button.addEventListener('click',()=>{
      const content=methods[button.dataset.method];if(!content)return;
      methodButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      methodIndex.textContent=content.index;methodTitle.textContent=content.title;methodBody.textContent=content.body;methodExample.textContent=content.example;
    }));
  }
  // Lightweight workflow explainer; no API or fabricated metrics.
  const workflowCopy={
    inspection:['Fire inspection','Symbols and templates for documenting fire protection equipment, hazards, and building conditions.'],
    investigation:['Fire investigation','Evidence and incident-scene markings that help investigators document what happened.'],
    preplan:['Pre-incident planning','Access points, water supplies, utility shutoffs, hazards, and building details for responding crews.'],
    evacuation:['Evacuation planning','Exit routes, assembly points, evacuation guidance, and orientation information.'],
    lifesafety:['Life safety','Building safety elements, egress information, and code-informed plan documentation.']
  };
  const workflowTabs=[...document.querySelectorAll('[data-workflow]')];
  const workflowDetail=document.getElementById('workflow-detail');
  if(workflowTabs.length && workflowDetail){
    const select=(tab,focus=false)=>{
      const item=workflowCopy[tab.dataset.workflow];if(!item)return;
      workflowTabs.forEach(t=>{let active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
      workflowDetail.innerHTML='';const h=document.createElement('strong');h.textContent=item[0];const p=document.createElement('p');p.textContent=item[1];workflowDetail.append(h,p);
      if(focus)tab.focus();
    };
    workflowTabs.forEach((t,i)=>{t.addEventListener('click',()=>select(t));t.addEventListener('keydown',e=>{const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){e.preventDefault();select(workflowTabs[(i+d+workflowTabs.length)%workflowTabs.length],true);}});});
  }
  const contactForm=document.querySelector('[data-contact-form]');
  if(contactForm){contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    if(!contactForm.reportValidity())return;
    const fd=new FormData(contactForm);
    const name=String(fd.get('name')||'').trim(),email=String(fd.get('email')||'').trim(),message=String(fd.get('message')||'').trim();
    const body=`From: ${name}\nReply-to: ${email}\n\n${message}`;
    const href=`mailto:magregory1998@outlook.com?subject=${encodeURIComponent('Portfolio inquiry from '+name)}&body=${encodeURIComponent(body)}`;
    const feedback=contactForm.querySelector('.form-feedback');
    if(feedback)feedback.textContent='Your email app should open with a draft. Review it and press Send there; no message was sent by this website.';
    window.location.href=href;
  });}
})();
