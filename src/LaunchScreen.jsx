import { useEffect, useState } from 'react';
import './LaunchScreen.scss';
export default function LaunchScreen(){
 const [phase,setPhase]=useState('enter');
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const exit=window.setTimeout(()=>setPhase(value=>value==='done'?'done':'exit'),reduced?150:5000);
  const done=window.setTimeout(()=>setPhase('done'),reduced?250:5650);
  return()=>{clearTimeout(exit);clearTimeout(done);};
 },[]);
 if(phase==='done')return null;
 return <div className={`launch-screen launch-${phase}`} aria-label="Portfolio introduction"><div className="launch-brand"><svg viewBox="-1 -7 47 48" fill="none" aria-hidden="true">
 <path pathLength="1" d="M22.436 34.5812L8.5506 28.3569V14.9043V1.15059L1 4.56392H4.1994V30.4149L22.436 38.6471L40.9286 30.4651V4.51373H44L36.3214 1V28.4071L22.436 34.5812Z"/>
 <path pathLength="1" d="M29.261 17.1883L11 9.48276V-0.218833L22.5 -5L34 -0.125995V13.382L26.1016 10.0398H29.261V1.68435L22.5 -1.14721L15.6758 1.73077V7.57958L34 15.4244V25.126L22.3736 30L11 25.0796V11.4324L18.7088 14.6817H15.6758V23.1764L22.3736 26.0544L29.261 23.0371V17.1883Z"/>
 </svg><p>VARSHIL SHAH</p><span>AI ENGINEERING × CREATIVE THINKING</span><div className="launch-line" aria-hidden="true"/></div></div>;
}




