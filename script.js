
const intro=document.getElementById('intro');
window.addEventListener('load',()=>setTimeout(()=>intro.classList.add('hide'),2800));

const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const release=new Date(document.querySelector('.countdown').dataset.release).getTime();
function updateCountdown(){
  const d=Math.max(0,release-Date.now()),day=86400000,hour=3600000,min=60000;
  document.getElementById('days').textContent=Math.floor(d/day);
  document.getElementById('hours').textContent=Math.floor((d%day)/hour);
  document.getElementById('minutes').textContent=Math.floor((d%hour)/min);
  document.getElementById('seconds').textContent=Math.floor((d%min)/1000);
}
updateCountdown();setInterval(updateCountdown,1000);
document.getElementById('year').textContent=new Date().getFullYear();

const canvas=document.getElementById('interactive-bg'),ctx=canvas.getContext('2d');
let w=0,h=0,dpr=Math.min(devicePixelRatio||1,2),p={x:.5,y:.5},t=0;
function resize(){w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
addEventListener('resize',resize);resize();
addEventListener('pointermove',e=>{p.x=e.clientX/w;p.y=e.clientY/h});
addEventListener('touchmove',e=>{if(e.touches[0]){p.x=e.touches[0].clientX/w;p.y=e.touches[0].clientY/h}},{passive:true});
function draw(){t+=.004;ctx.clearRect(0,0,w,h);ctx.fillStyle='#020403';ctx.fillRect(0,0,w,h);
  const cx=w*(.3+.4*p.x),cy=h*(.25+.45*p.y);
  for(let i=0;i<24;i++){const a=(Math.PI*2/24)*i+t,r=Math.min(w,h)*(.12+i*.018),x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
    const g=ctx.createRadialGradient(x,y,0,x,y,80+i*2);g.addColorStop(0,'rgba(115,255,75,.08)');g.addColorStop(1,'rgba(115,255,75,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,90+i*2,0,Math.PI*2);ctx.fill();}
  requestAnimationFrame(draw);
}
draw();
