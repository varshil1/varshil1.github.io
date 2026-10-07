import './edu.scss';
const degrees = [
 {chapter:'01',level:'UNDERGRADUATE',school:'Ahmedabad University',degree:'B.Tech. in Information and Communication Technology',place:'Gujarat, India',dates:'June 2018 — May 2022',gpa:'3.21',label:'Building the foundation.',symbol:'ICT'},
 {chapter:'02',level:'GRADUATE',school:'Arizona State University',degree:'Master of Computer Science',place:'Tempe, Arizona',dates:'August 2023 — May 2025',gpa:'3.97',label:'Taking the next step.',symbol:'MCS'}
];
export default function Education() {
 return <section className="edu education-stack" id="edu" tabIndex={0} aria-labelledby="education-heading">
  <header className="education-heading"><div><p className="education-eyebrow">EDUCATION / 2018 — 2025</p><h1 id="education-heading">Two chapters.<br/><span>One curious mind.</span></h1></div><p className="education-scroll-hint">From information technology to computer science.<br/><span>Scroll through the journey ↓</span></p></header>
  <div className="education-deck">{degrees.map((item,index)=><article className={`education-card education-card-${index}`} key={item.chapter}>
   <div className="education-card-bar"><span>{item.level}</span><span>CHAPTER {item.chapter} / 02</span></div>
   <div className="education-card-body"><div className="education-copy"><p className="education-school">{item.school}</p><h2>{item.degree}</h2><p className="education-location">{item.place}</p><div className="education-facts"><div><span>STUDIED</span><strong>{item.dates}</strong></div><div><span>GPA</span><strong>{item.gpa}<small> / 4.00</small></strong></div></div></div>
   <div className="education-art" aria-hidden="true"><svg viewBox="0 0 280 200" fill="none"><path d="m140 25 110 58-110 59L30 83Z" stroke="currentColor" strokeWidth="2"/><path d="M65 104v47q75 55 150 0v-47M250 83v77" stroke="currentColor" strokeWidth="2"/><circle cx="250" cy="166" r="6" fill="currentColor"/><path d="M40 179h200M140 25v117" stroke="currentColor" strokeOpacity=".25"/></svg><span>{item.symbol}</span></div></div>
   <footer><span>{item.label}</span><span>{item.chapter}</span></footer>
  </article>)}</div>
 </section>;
}

