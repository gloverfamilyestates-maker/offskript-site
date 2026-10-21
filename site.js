(function(){
  var END=new Date('2026-11-01T00:00:00-04:00').getTime();
  var live=Date.now()<END;
  var b=document.body;
  if(live)b.classList.add('halloween');
  var nav=document.getElementById('nav'),m=document.getElementById('menu');
  if(m)m.addEventListener('click',function(){var o=nav.classList.toggle('open');m.setAttribute('aria-expanded',o)});
  var here=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav ul a').forEach(function(a){if(a.getAttribute('href')===here)a.setAttribute('aria-current','page')});
  document.querySelectorAll('.promo,.offer').forEach(function(el){if(live)el.classList.add('on')});
  function tick(){
    var d=END-Date.now();
    if(d<=0){b.classList.remove('halloween');document.querySelectorAll('.promo,.offer').forEach(function(el){el.classList.remove('on')});setPrices();return}
    var dd=Math.floor(d/864e5),hh=Math.floor(d/36e5)%24,mm=Math.floor(d/6e4)%60,ss=Math.floor(d/1e3)%60;
    var t=dd+'d '+String(hh).padStart(2,'0')+'h '+String(mm).padStart(2,'0')+'m '+String(ss).padStart(2,'0')+'s';
    document.querySelectorAll('.clock').forEach(function(c){c.textContent=t});
  }
  if(live){tick();setInterval(tick,1000)}
  var mode='full';
  function money(n){return '$'+n.toLocaleString('en-US')}
  function setPrices(){
    var hw=b.classList.contains('halloween');
    document.querySelectorAll('.tier').forEach(function(t){
      var reg=+t.dataset.price,sale=Math.round(reg*2/3);
      var p=t.querySelector('.price'),w=t.querySelector('.was'),tm=t.querySelector('.term');
      if(mode==='split'){p.textContent=money(Math.round(reg/3));w.textContent='';tm.textContent='x 3 monthly payments ('+money(reg)+' total)'}
      else if(hw){p.textContent=money(sale);w.textContent=money(reg);tm.textContent='paid in full before Halloween, 90 days'}
      else{p.textContent=money(reg);w.textContent='';tm.textContent='paid in full, 90 days'}
    });
  }
  document.querySelectorAll('.toggle button').forEach(function(btn){
    btn.addEventListener('click',function(){
      mode=btn.dataset.mode;
      document.querySelectorAll('.toggle button').forEach(function(x){x.setAttribute('aria-pressed',x===btn)});
      setPrices();
    });
  });
  if(document.querySelector('.tier'))setPrices();
  var s=document.querySelector('.script');
  if(s){
    var out=s.querySelector('.rewrite .txt'),full=out.dataset.text;
    var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(calm){s.classList.add('cut');out.textContent=full}
    else{
      setTimeout(function(){s.classList.add('cut')},700);
      setTimeout(function(){
        var i=0,iv=setInterval(function(){out.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(iv)},28);
      },2400);
    }
  }
  var sel=document.getElementById('pkg'),q=new URLSearchParams(location.search).get('pkg');
  if(sel&&q){for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===q)sel.selectedIndex=i}}
  var hf=document.getElementById('promo-flag');
  if(hf)hf.value=live?'Halloween 33% off (before Oct 31)':'none';
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
