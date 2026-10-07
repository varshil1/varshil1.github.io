import { useEffect, useRef, useState } from 'react';
import './work.scss';
import { experience } from '../../profile';
export default function Works() {
  const [active, setActive] = useState(0);
  const timeline = useRef(null);
  useEffect(() => {
    const root = document.querySelector('main.sections');
    const cards = Array.from(timeline.current.querySelectorAll('.experience-entry'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = root.getBoundingClientRect().top + root.clientHeight * .3;
      let current = 0;
      cards.forEach((card, index) => { if (card.getBoundingClientRect().top <= line) current = index; });
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { root.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);
  const jump = index => document.getElementById(`career-${index}`).scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
  return <section className="work" id="works" aria-labelledby="experience-heading">
    <header className="experience-heading"><p className="section-eyebrow">EXPERIENCE / 2020 — NOW</p><h1 id="experience-heading">From data foundations<br />to intelligent systems<span>.</span></h1><p>Engineering, research, and the work behind the results.</p></header>
    <div className="career-layout"><nav className="career-map" aria-label="Career chapters"><p>CAREER EXPLORER</p><div className="career-track"><span style={{height: `${active / (experience.length - 1) * 100}%`}} /></div><div className="career-stops">{experience.map((entry,index)=><button key={`${entry.company}-${entry.title}`} type="button" aria-current={active === index ? "step" : undefined} onClick={()=>jump(index)}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{entry.company.split(" · ")[0]}</strong><small>{entry.title}</small></div><b aria-hidden="true">↗</b></button>)}</div><div className="career-map-footer">CHAPTER {String(active+1).padStart(2,"0")} / 07<br/><span>Scroll to follow the journey</span></div></nav><div className="experience-timeline" ref={timeline}>{experience.map((entry, index) => <article id={`career-${index}`} className={`experience-entry ${active === index ? "is-active" : ""}`} key={`${entry.company}-${entry.title}`}>
      <div className="experience-date"><span className="experience-number">{String(index + 1).padStart(2, '0')}</span><span>{entry.dates}</span>{entry.location && <span>{entry.location}</span>}</div>
      <div className="experience-card"><header><img src={entry.logo} alt="" loading="lazy" /><div><p className="experience-company">{entry.company}</p><h2>{entry.title}</h2></div></header>
        <div className="experience-tags">{entry.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <ul>{entry.points.slice(0, 2).map(point => <li key={point}>{point}</li>)}</ul>
        {entry.points.length > 2 && <details><summary>More about this role</summary><ul>{entry.points.slice(2).map(point => <li key={point}>{point}</li>)}</ul></details>}
      </div>
    </article>)}</div></div>
  </section>;
}

