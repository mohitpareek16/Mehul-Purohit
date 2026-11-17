(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
var mx=-9999,my=-9999,svel=0,lastY=scrollY;
function mod(f){try{f()}catch(e){if(window.console)console.error(e)}}
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY});

mod(function(){ // photos: every slot gets the red duotone
  $$('.slot > input').forEach(function(inp){
    inp.addEventListener('change',function(){
      var f=inp.files&&inp.files[0];if(!f)return;var r=new FileReader();
      r.onload=function(){var s=inp.parentNode,d=s.querySelector('.duo');if(!d){d=document.createElement('span');d.className='duo';s.insertBefore(d,s.firstChild)}d.style.backgroundImage='url("'+r.result+'")';s.classList.add('has-img')};
      r.readAsDataURL(f);
    });
  });
});

mod(function(){ $$('.tq-t').forEach(function(t){var c=t.innerHTML;t.insertAdjacentHTML('beforeend',c.replace(/<figure class="qc"/g,'<figure class="qc" aria-hidden="true"'))}) });

mod(function(){ // hero slides: auto-advance every 7s
  var H=$('#hero'),sl=$$('.hslide',H),dots=$$('.hd',H),cur=0,el=0,DUR=7000,vis=true,last=performance.now();
  function go(k){k=(k+sl.length)%sl.length;if(k===cur)return;var old=cur;sl.forEach(function(s,j){s.classList.remove('first');if(j!==k&&j!==old)s.classList.remove('on','prev')});sl[old].classList.remove('on');sl[old].classList.add('prev');sl[k].classList.remove('prev');sl[k].classList.add('on');cur=k;el=0;
    setTimeout(function(){if(cur!==old)sl[old].classList.remove('prev')},1200);
    dots.forEach(function(d,j){d.classList.toggle('on',j===k);d.setAttribute('aria-current',j===k?'true':'false')});H.setAttribute('data-slide',k+1)}
  $('#hprev').addEventListener('click',function(){go(cur-1)});$('#hnext').addEventListener('click',function(){go(cur+1)});
  dots.forEach(function(d,j){d.addEventListener('click',function(){go(j)})});
  H.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
  var tx=null;H.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  H.addEventListener('touchend',function(e){if(tx===null)return;var dx=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(dx)>60)go(cur+(dx<0?1:-1))});
  new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(H);
  (function tick(now){requestAnimationFrame(tick);var dt=Math.min(now-last,100);last=now;if(vis&&!document.hidden&&!rm)el+=dt;var p=Math.min(el/DUR,1);
    dots.forEach(function(d,j){d.firstChild.firstChild.style.transform='scaleX('+(j===cur?p:0)+')'});if(el>=DUR)go(cur+1)})(last);
});

mod(function(){ // moments slider
  var t=$('#mtrack');function step(){var s=t.querySelector('.slot');return s?s.getBoundingClientRect().width+14:300}
  $('#mprev').addEventListener('click',function(){t.scrollBy({left:-step(),behavior:'smooth'})});
  $('#mnext').addEventListener('click',function(){t.scrollBy({left:step(),behavior:'smooth'})});
});

mod(function(){ // reveals
  if(rm){$$('.rv').forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
  $$('.rv').forEach(function(el){io.observe(el)});
});

mod(function(){ // counters
  if(rm)return;
  function run(el){var end=parseFloat(el.getAttribute('data-count')),suf=el.getAttribute('data-suffix')||'',t0=null;function s(t){if(!t0)t0=t;var p=Math.min((t-t0)/1700,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(end*e)+(p<1?'':suf);if(p<1)requestAnimationFrame(s);else el.textContent=end+suf}el.textContent='0';requestAnimationFrame(s)}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.5});
  $$('[data-count]').forEach(function(el){io.observe(el)});
});

mod(function(){ // hero: cursor light + portrait parallax
  var h=$('#hero'),p=h;if(rm||!fine)return;
  h.addEventListener('pointermove',function(e){var r=h.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;h.style.setProperty('--hx',x+'px');h.style.setProperty('--hy',y+'px');p.style.setProperty('--px',((x/r.width-.5)*-26)+'px');p.style.setProperty('--py',((y/r.height-.5)*-16)+'px')});
});

mod(function(){ // marquee + scroll velocity + spinning asterisk
  var t=$('.mq-t'),x=0,w=0;
  function meas(){var spans=t.children.length/1;if(!t.dataset.dup){t.innerHTML+=t.innerHTML;t.dataset.dup=1}w=t.scrollWidth/2}
  meas();addEventListener('resize',function(){w=t.scrollWidth/2});
  var ast=$('#astk');
  (function loop(){
    var y=scrollY;svel+=((y-lastY)-svel)*.15;lastY=y;
    if(!rm&&w){x-=1+Math.abs(svel)*.5;if(x<-w)x+=w;t.style.transform='translate3d('+x+'px,0,0) skewX('+clamp(-svel*.3,-8,8)+'deg)'}
    if(ast&&!rm){var r=ast.parentNode.getBoundingClientRect();ast.style.transform='rotate('+(-r.top*.12)+'deg)'}
    requestAnimationFrame(loop);
  })();
});

mod(function(){ // horizontal journey
  var J=$('#story'),T=$('#jt'),pins=$$('.panel',T),jy=$('#jy'),jp=$('#jp'),cr=$('#cr'),dot=$('#dot'),path=$('#cpath'),dist=0,lut=[];
  var len=path.getTotalLength();for(var i=0;i<=240;i++)lut.push(path.getPointAtLength(len*i/240));
  function yAt(x){var lo=0,hi=lut.length-1;while(hi-lo>1){var m=(lo+hi)>>1;if(lut[m].x<x)lo=m;else hi=m}return lut[hi].y}
  function size(){var w=J.querySelector('.pin').clientWidth;dist=Math.max(0,T.scrollWidth-w);J.style.height=(dist+innerHeight)+'px'}
  size();addEventListener('resize',size);addEventListener('load',size);if(document.fonts)document.fonts.ready.then(size);
  var cur=-1;
  (function tick(){
    var r=J.getBoundingClientRect(),p=clamp(-r.top/Math.max(1,J.offsetHeight-innerHeight),0,1);
    T.style.transform='translate3d('+(-p*dist)+'px,-50%,0)';jp.style.transform='scaleX('+p+')';cr.setAttribute('width',p*1000);
    dot.style.left=(p*100)+'%';dot.style.bottom=((1-yAt(p*1000)/220)*100)+'%';
    var c=innerWidth*.42,best=0,bd=1e9;pins.forEach(function(el,i){var m=el.offsetLeft-p*dist+el.offsetWidth*.35,d=Math.abs(m-c);if(d<bd){bd=d;best=i}});
    if(best!==cur){cur=best;pins.forEach(function(el,i){el.classList.toggle('on',i===best)});jy.textContent=pins[best].getAttribute('data-y')}
    requestAnimationFrame(tick);
  })();
});

mod(function(){ // services strip drag
  var s=$('#strip'),d=false,sx=0,sl=0;
  s.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;d=true;s.classList.add('drag');sx=e.clientX;sl=s.scrollLeft});
  addEventListener('pointerup',function(){d=false;s.classList.remove('drag')});
  addEventListener('pointermove',function(e){if(d)s.scrollLeft=sl-(e.clientX-sx)});
  $$('.svc',s).forEach(function(c){c.addEventListener('pointerenter',function(){$$('.svc',s).forEach(function(o){o.classList.toggle('feat',o===c)})})});
});

mod(function(){ // 3D award ring
  var ring=$('#ring'),world=$('#world'),cards=$$('.rc',ring),rot=0,vel=0,drag=false,sx=0,sr=0,moved=false,vis=true;
  new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(world);
  world.addEventListener('pointerdown',function(e){if(e.target.tagName==='INPUT'&&e.pointerType!=='mouse')return;drag=true;moved=false;sx=e.clientX;sr=rot;vel=0});
  addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-sx;if(Math.abs(dx)>5)moved=true;var nr=sr+dx*.35;vel=nr-rot;rot=nr});
  addEventListener('pointerup',function(){drag=false});
  world.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  (function tick(){requestAnimationFrame(tick);if(!vis)return;
    if(!drag){rot+=vel+(rm?0:.12)+svel*.06;vel*=.94}
    ring.style.transform='rotateY('+rot+'deg)';
    cards.forEach(function(c,i){var a=((i*(360/cards.length)+rot)%360+360)%360,f=(Math.cos(a*Math.PI/180)+1)/2;c.style.filter='brightness('+(.3+.7*f)+')'});
  })();
});

mod(function(){ // giants: photo card follows the cursor
  var f=$('#follow'),fs=$('#fslot'),fx=0,fy=0;
  $$('.gr').forEach(function(row){
    var slot=$('.slot',row);
    row.addEventListener('pointerenter',function(){var d=slot.querySelector('.duo'),fd=fs.querySelector('.duo');if(d){if(!fd){fd=document.createElement('span');fd.className='duo';fs.insertBefore(fd,fs.firstChild)}fd.style.backgroundImage=d.style.backgroundImage;fs.classList.add('has-img')}else{fs.classList.remove('has-img');if(fd)fd.remove()}f.classList.add('on')});
    row.addEventListener('pointerleave',function(){f.classList.remove('on')});
  });
  (function t(){requestAnimationFrame(t);fx+=(mx+28-fx)*.14;fy+=(my-140-fy)*.14;f.style.left=fx+'px';f.style.top=fy+'px'})();
});

mod(function(){ // flashlight quote
  var s=$('#flash'),last=0;
  function set(x,y){s.style.setProperty('--mx',x+'px');s.style.setProperty('--my',y+'px')}
  s.addEventListener('pointermove',function(e){var r=s.getBoundingClientRect();set(e.clientX-r.left-parseFloat(getComputedStyle(s).paddingLeft),e.clientY-r.top-parseFloat(getComputedStyle(s).paddingTop));last=performance.now()});
  (function t(now){requestAnimationFrame(t);if(rm)return;if(!fine||now-last>2500){var r=s.getBoundingClientRect();set(r.width*(.45+.36*Math.sin(now*.0006)),r.height*(.36+.26*Math.sin(now*.0009+1)))}})(0);
});

mod(function(){ // glow cards
  $$('.glow').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
});

mod(function(){ // variable-weight CTA headline
  var h=$('#big'),lines=h.innerHTML.split('<br>');
  h.innerHTML=lines.map(function(l){return l.split('').map(function(c){return '<span class="ch" aria-hidden="true">'+(c===' '?'&nbsp;':c)+'</span>'}).join('')}).join('<br>');
  var chars=$$('.ch',h),vis=false;new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(h);
  function paint(now){var sweep=!fine;chars.forEach(function(c){var r=c.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=sweep?Math.abs(cx-((now*.25)%(innerWidth+400)-200))*1.2:Math.hypot(cx-mx,cy-my),k=clamp(d/340,0,1);c.style.fontWeight=Math.round(800-k*600);c.style.fontStretch=(100-k*30)+'%';c.style.color=k<.3?'#120304':'#f6f0eb'})}
  (function t(now){requestAnimationFrame(t);if(!vis||rm)return;paint(now)})(0);
});

mod(function(){ // cursor + magnetic buttons
  if(!fine||rm)return;
  var cur=$('#cur'),cx=0,cy=0;document.documentElement.classList.add('has-cur');
  document.addEventListener('pointerover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,label.slot,.svc,.gr,.erow'))});
  (function t(){requestAnimationFrame(t);cx+=(mx-cx)*.22;cy+=(my-cy)*.22;cur.style.transform='translate3d('+cx+'px,'+cy+'px,0)'})();
  var mags=$$('.mag');
  addEventListener('pointermove',function(e){mags.forEach(function(m){var r=m.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);m.style.transform=Math.hypot(dx,dy)<110?'translate('+dx*.28+'px,'+dy*.28+'px)':''})});
});

mod(function(){ // form + copy
  $('#copy').addEventListener('click',function(){var t=$('#em'),b=this;function ok(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1500)}function sel(){var r=document.createRange();r.selectNodeContents(t);var s=getSelection();s.removeAllRanges();s.addRange(r)}try{navigator.clipboard.writeText(t.textContent).then(ok,sel)}catch(e){sel()}});
  $('#form').addEventListener('submit',function(e){e.preventDefault();var n=$('#note'),nm=$('#fn').value.trim(),em=$('#fe').value.trim();if(!nm||!/^\S+@\S+\.\S+$/.test(em)){n.textContent='Add your name and a valid email address first.';return}n.textContent='This preview does not send messages. Copy the address above and email your request to the team.'});
});
})();
