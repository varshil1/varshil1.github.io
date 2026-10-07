import { useRef, useState } from 'react';
import './testimonials.scss';
const data = [
 ['Snowflake','Snowflake Data Warehousing','Snowflake','snowflake_logo.png','Data warehousing,Data modeling,SQL','https://achieve.snowflake.com/0242850b-d0ba-445f-b154-ff53d37c523c'],
 ['Spark AR','Spark AR Developer','Facebook','Spark.png','AR content,3D modeling,Interactive effects','https://files.sv.co/soi/0820/completion/Varshil_ChetanKumar_Shah-6d32de5.pdf'],
 ['IBM','Machine Learning with Python','IBM · Coursera','IBM.png','Algorithms,Data preprocessing,Model evaluation,Predictive analytics','https://www.coursera.org/account/accomplishments/certificate/LRF9FSXFE9NV'],
 ['DeepLearning.AI','Deep Learning Specialization','DeepLearning.AI · Coursera','Deeplearning_io.png','Neural networks,Deep learning,Computer vision,NLP','https://www.coursera.org/account/accomplishments/certificate/HDTHG9DE6AP3'],
 ['LinkedIn','Become a Data Analyst Specialization','LinkedIn Learning','linkedin_learning.jpg','Data visualization,Statistics,Data cleaning,Reporting','https://drive.google.com/file/d/1N3MepsAaTvSluEaOrkH3CuGOXRLbV9S3/view']
];
export default function Testimonials() {
 const [active,setActive]=useState(0);
 const touchStart=useRef(null);
 const move=direction=>setActive(value=>(value+direction+data.length)%data.length);
 return <section className="testimonials credential-gallery" id="testimonials" aria-labelledby="credentials-heading">
 <header className="credential-heading"><p>CONTINUOUS LEARNING / 05 CREDENTIALS</p><h1 id="credentials-heading">Curiosity, backed<br/>by <span>credentials.</span></h1><p>Data, intelligence, and creative technology. Explore the learning behind my work.</p></header>
 <div className="credential-controls"><button type="button" className="credential-arrow" aria-label="Previous certification" onClick={()=>move(-1)}>←</button><div className="credential-selectors" aria-label="Choose a certification">{data.map((item,index)=><button key={item[0]} type="button" aria-pressed={active===index} onClick={()=>setActive(index)}>{item[0]}</button>)}</div><button type="button" className="credential-arrow" aria-label="Next certification" onClick={()=>move(1)}>→</button></div>
 <div className="credential-stage" role="region" aria-roledescription="carousel" aria-label="Certifications" tabIndex={0} onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}} onTouchStart={event=>{touchStart.current={x:event.touches[0].clientX,y:event.touches[0].clientY};}} onTouchEnd={event=>{if(!touchStart.current)return;const dx=event.changedTouches[0].clientX-touchStart.current.x;const dy=event.changedTouches[0].clientY-touchStart.current.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1);touchStart.current=null;}}>
 {data.map((item,index)=>{let offset=(index-active+data.length)%data.length;if(offset>2)offset-=data.length;return <article key={item[0]} className={`credential-card ${offset===0?'is-current':''}`} style={{'--offset':offset,'--distance':Math.abs(offset)}} aria-hidden={offset!==0}><div className="credential-card-top"><span>LEARNING RECORD</span><span>0{index+1} / 05</span></div><div className="credential-emblem"><img src={`assets/${item[3]}`} alt=""/></div><p className="credential-issuer">{item[2]}</p><h2>{item[1]}</h2><div className="credential-skills">{item[4].split(',').map(skill=><span key={skill}>{skill}</span>)}</div><a href={item[5]} target="_blank" rel="noreferrer" tabIndex={offset===0?0:-1}>View credential <span aria-hidden="true">↗</span></a></article>;})}
 </div><div className="credential-footer"><span aria-live="polite">0{active+1} / 05 · {data[active][1]}</span><span>Swipe, use arrows, or choose an issuer</span></div>
 </section>;
}
