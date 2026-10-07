import ResearchPaper from './ResearchPaper';
import { useEffect, useRef, useState } from 'react';
import './systems.scss';
import AgentTrace from './AgentTrace';
function Illustration({ kind }) {
  return <svg className={`system-illustration illustration-${kind}`} viewBox="0 0 360 180" fill="none" aria-hidden="true">
    <defs><pattern id={`grid-${kind}`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="currentColor" strokeOpacity=".09" /></pattern></defs>
    <rect width="360" height="180" fill={`url(#grid-${kind})`} />
    {kind === 'agents' ? <>
      <circle cx="180" cy="90" r="62" stroke="currentColor" strokeOpacity=".2" strokeDasharray="3 7" />
      <path d="M68 90H140M220 90H292M180 28V54M180 126V153" stroke="currentColor" strokeWidth="1.5" />
      <g className="illustration-float"><path d="m180 48 42 24v40l-42 24-42-24V72Z" fill="var(--surface-raised)" stroke="currentColor" strokeWidth="2" /><path d="m138 72 42 24 42-24M180 96v40" stroke="currentColor" /><circle cx="168" cy="77" r="3" fill="currentColor" /><circle cx="191" cy="77" r="3" fill="currentColor" /></g>
      <rect x="42" y="76" width="30" height="28" rx="7" fill="var(--surface)" stroke="currentColor" /><path d="m51 90 5 5 9-11" stroke="currentColor" />
      <circle cx="292" cy="90" r="15" fill="var(--surface)" stroke="currentColor" /><path d="M287 90h10m-5-5v10" stroke="currentColor" />
      <circle cx="180" cy="25" r="6" fill="currentColor" /><circle cx="180" cy="155" r="6" fill="currentColor" />
    </> : kind === 'data' ? <>
      {[0,1,2].map(i => <g key={i} transform={`translate(0 ${i*24})`}><path d="M111 55v25c0 14 138 14 138 0V55" fill="var(--surface)" stroke="currentColor" /><ellipse cx="180" cy="55" rx="69" ry="17" fill="var(--surface-raised)" stroke="currentColor" /><circle cx="226" cy="77" r="3" fill="currentColor" /></g>)}
      <path d="M42 110h45V75h24M249 112h30V64h42" stroke="currentColor" strokeDasharray="5 5" /><circle cx="42" cy="110" r="5" fill="currentColor" /><circle cx="320" cy="64" r="5" fill="currentColor" />
    </> : <>
      <path d="m77 121 103-58 103 58-103 59Z" fill="var(--surface-raised)" stroke="currentColor" /><path d="m77 91 103-58 103 58-103 59Z" fill="var(--surface)" fillOpacity=".75" stroke="currentColor" /><path d="m112 90 68-38 68 38-68 39Z" stroke="currentColor" strokeDasharray="4 4" />
      <circle cx="180" cy="88" r="19" fill="var(--surface-raised)" stroke="currentColor" /><circle cx="180" cy="88" r="7" fill="currentColor" /><path d="M180 13v36M165 28h30" stroke="currentColor" />
    </>}
  </svg>;
}
export default function Systems() {


  const [visible, setVisible] = useState(false);
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`systems ${motion && visible ? "motion-active" : "motion-paused"}`} id="systems" aria-labelledby="systems-heading">
    <header><div className="systems-heading-row"><p className="section-eyebrow">WHAT I BUILD</p><button type="button" className="motion-control" aria-pressed={!motion} onClick={() => setMotion(value => !value)}>{motion ? "Pause animations" : "Enable animations"}</button></div><h2 id="systems-heading">Intelligence is a system.<br /><span>Not just a model.</span></h2><p className="systems-intro">My work connects the data, decisions, and delivery layers that make AI useful.</p></header>
    <div className="capability-grid">
      {[['agents','Agentic applications','Tool-connected workflows with clear contracts, human review, and observable decisions.'],['data','Data & retrieval','Reliable ingestion, knowledge-grounded retrieval, and context that earns its place in the prompt.'],['research','Applied research','Computer vision, geospatial analysis, and controlled evaluation of model behavior.']].map(([kind,title,description]) => <article key={kind}><Illustration kind={kind} /><div><h3>{title}</h3><p>{description}</p></div></article>)}
    </div>
    <AgentTrace visible={visible} motion={motion} />
  </section>;
}

export function ProjectEvidence() { return <div className="project-evidence">    <div className="evidence-grid"><article><strong>86–88%</strong><span>Measured inference cost reduction</span><p>Context engineering and focused agents at TD SYNNEX.</p></article><article><strong>10+ TB</strong><span>Imagery processed for research</span><p>Planet APIs and Meta SAM at Arizona State University.</p></article><article><strong>$20K / mo</strong><span>Data workload savings</span><p>AWS pipeline optimization at Anicca.</p></article></div>
    <ResearchPaper />
</div>; }




