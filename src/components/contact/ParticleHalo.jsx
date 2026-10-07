import { useEffect, useRef, useState } from 'react';
export default function ParticleHalo() {
 const canvasRef = useRef(null);
 const [paused,setPaused] = useState(false);
 useEffect(() => {
  const canvas=canvasRef.current, host=canvas.parentElement, ctx=canvas.getContext('2d');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=window.matchMedia('(max-width: 800px)');
  let frame=0,visible=false,angle=0,last=0,size=0,color='',pointer={x:0,y:0};
  const points=Array.from({length:650},(_,i)=>{const y=1-2*(i+.5)/650;const r=Math.sqrt(1-y*y),a=i*2.399963;return {x:r*Math.cos(a),y,z:r*Math.sin(a)};});
  const draw=()=>{
   ctx.clearRect(0,0,size,size);ctx.fillStyle=color;
   const c=Math.cos(angle),s=Math.sin(angle);
   points.forEach((p,i)=>{const ripple=1+.045*Math.sin(p.y*8+angle*3);const x=(p.x*c-p.z*s)*ripple,z=p.x*s+p.z*c;const scale=size*.43;ctx.globalAlpha=.18+(z+1)*.22;ctx.beginPath();ctx.arc(size/2+x*scale+pointer.x*5,size/2+p.y*scale*ripple+pointer.y*5,(.7+(z+1)*.4)*size/500,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
  };
  const tick=time=>{frame=0;if(!visible||paused||reduced.matches||mobile.matches||document.hidden)return;angle+=Math.min(time-last,40)*.00009;last=time;draw();frame=requestAnimationFrame(tick);};
  const sync=()=>{cancelAnimationFrame(frame);frame=0;draw();if(visible&&!paused&&!reduced.matches&&!mobile.matches&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick);}};
  const resize=()=>{size=host.clientWidth;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=size*dpr;canvas.height=size*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);color=getComputedStyle(host).getPropertyValue('--accent').trim();sync();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});observer.observe(canvas);
  const dimensions=new ResizeObserver(resize);dimensions.observe(host);
  const theme=new MutationObserver(resize);theme.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  const move=event=>{const rect=host.getBoundingClientRect();pointer={x:(event.clientX-rect.left)/rect.width-.5,y:(event.clientY-rect.top)/rect.height-.5};};
  const leave=()=>{pointer={x:0,y:0};};host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
  reduced.addEventListener('change',sync);mobile.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);resize();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();dimensions.disconnect();theme.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);reduced.removeEventListener('change',sync);mobile.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
 },[paused]);
 return <><canvas ref={canvasRef} className="contact-particles" aria-hidden="true"/><button type="button" className="particle-control" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?'Resume particles':'Pause particles'}</button></>;
}
