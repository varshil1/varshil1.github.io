import React, { useEffect, useRef, useState } from 'react';
import { createChoreography } from './choreography';
import './video-demo.css';

const agents = [
  { name: 'Research', detail: 'Discover relevant context', x: 32, y: 22 },
  { name: 'Retrieval', detail: 'Ground answers in evidence', x: 60, y: 17 },
  { name: 'Analysis', detail: 'Reason across the inputs', x: 76, y: 43 },
  { name: 'Validation', detail: 'Check before taking action', x: 63, y: 73 },
  { name: 'Automation', detail: 'Execute through connected tools', x: 32, y: 73 },
];
const workPaths = [
  'M32 22 L60 17', 'M60 17 L76 43', 'M76 43 L63 73',
  'M32 73 L63 73',
  'M60 17 C88 18 90 89 52 89 C86 87 84 23 60 17',
  'M32 73 L40 89 L32 73',
  'M63 73 L93 73',
  'M76 43 C94 58 82 89 63 89 C86 86 92 58 76 43',
];

export default function VideoDemo({ embedded = false, motion = true }) {
  const root = useRef(null);
  const controller = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    controller.current = createChoreography(root.current, { active: !embedded });
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => { controller.current.dispose(); media.removeEventListener('change', change); };
  }, [embedded]);
  const inView = useRef(!embedded);
  useEffect(() => {
    if (!embedded) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      controller.current.setActive(inView.current && motion);
    }, { threshold: [0, 0.25] });
    observer.observe(root.current.querySelector('.vd-stage'));
    return () => observer.disconnect();
  }, [embedded, motion]);
  useEffect(() => { controller.current.setActive((!embedded || inView.current) && motion); }, [embedded, motion]);
  const Container = embedded ? 'div' : 'main';
  const replay = () => { controller.current.replay(); setPaused(false); };
  const pause = () => { controller.current.pause(!paused); setPaused(!paused); };
  const pointer = event => {
    if (reduced || paused || !motion || event.pointerType !== 'mouse' || window.innerWidth < 700) return;
    const rect = event.currentTarget.getBoundingClientRect();
    root.current.style.setProperty('--vd-x', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 7}px`);
    root.current.style.setProperty('--vd-y', `${(event.clientY - rect.top - rect.height / 2) / rect.height * 5}px`);
  };
  return <Container className={`video-demo ${embedded ? "vd-embedded" : ""}`} ref={root} onPointerMove={pointer}>
    {!embedded && <header className="vd-header"><span className="vd-monogram">VS<span> / LAB</span></span><span className="vd-edition">EXPERIMENT 001 <i /> AGENT ARCHITECTURE</span></header>}
    <div className="vd-layout">
      {!embedded && <section className="vd-copy" aria-label="Introduction">
        <p className="vd-eyebrow">VARSHIL SHAH</p>
        <h1>AI Engineer<span>.</span></h1>
        <p className="vd-description">Building agentic AI systems that <em>automate, reason &amp; scale.</em></p>
        <p className="vd-specialties">Agentic AI <b>·</b> LLM Systems <b>·</b> Intelligent Automation</p>
        <div className="vd-controls"><button onClick={replay} disabled={reduced}>↻ &nbsp; Replay Animation</button><button onClick={pause} disabled={reduced}>{paused ? '▷  Resume Animation' : 'Ⅱ  Pause Animation'}</button></div>
        <p className="vd-note">{reduced ? 'Reduced motion · static architecture' : 'A real-time study of intelligence in motion.'}</p>
      </section>}
      <section className="vd-stage" aria-label="Animated AI architecture">
        <div className="vd-particles" aria-hidden="true" />
        <div className="vd-stage-caption"><span>LIVE SYSTEM STUDY</span><span>01 — 05</span></div>
        <div className="vd-network">
          <div className="vd-source"><small>INPUT DATA</small><span>Documents</span><span>APIs / databases</span><span>Product / SKU</span><span>Unstructured data</span></div>
          <svg className="vd-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {agents.map(agent => <g key={agent.name}><path pathLength="1" d={`M46 47 L${agent.x} ${agent.y}`} className="vd-wire vd-spoke" /><circle className="vd-spoke-packet" r="0.65" fill="#8cdbff" /></g>)}
            {workPaths.map((d, i) => <g key={d}><path pathLength="1" d={d} className="vd-wire vd-work-link" /><g className="vd-work-packets">{[0, 1, 2, 3].map(j => <circle key={j} r={j === 0 ? 0.65 : 0.38} fill={i === 6 ? '#a5f3d0' : '#ceb5ff'} />)}</g></g>)}
          </svg>
          <div className="vd-energy" aria-hidden="true" />
          <div className="vd-core"><span className="vd-core-symbol">⌘</span><strong>AI ORCHESTRATOR</strong><small>RECEIVING</small></div>
          {agents.map((agent, i) => <div key={agent.name} tabIndex={-1} className="vd-agent" style={{ left: `${agent.x}%`, top: `${agent.y}%` }} aria-label={`${agent.name} Agent: ${agent.detail}`}>
            <span className="vd-node-icon">{['⌕', '≡', '∴', '✓', '↗'][i]}</span><strong>{agent.name}<small>AGENT</small></strong><span className="vd-tooltip">{agent.detail}</span>
          </div>)}
          <div className="vd-tools"><small>TOOLS / APIs</small><span className="vd-tool-targets"><b>API</b><b>RAG</b><b>LLM</b></span><span>LangChain · FastAPI</span><span>Docker · Airflow</span></div>
          <div className="vd-output"><small>VALIDATED OUTPUT</small><div className="vd-bars">{[38, 68, 52, 88, 72].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><span>Structured<br />intelligence</span></div>
          <div className="vd-packet-layer" aria-hidden="true">{['DOC', 'API', 'DB', '{ JSON }'].map(label => <span key={label} className="vd-input-packet">{label}</span>)}{['INSIGHT', 'CLASSIFIED', 'VERIFIED', 'STRUCTURED'].map(label => <span key={label} className="vd-output-packet">{label}</span>)}</div>
        </div>
        <div className="vd-stage-footer"><span className="vd-status-dot" /><span className="vd-stage-label">Data arriving</span><span className="vd-time">00.0 / 15s</span></div>
      </section>
    </div>
    <footer className="vd-timeline" aria-label="Animation sequence">{['DATA', 'AI AGENTS', 'REASONING', 'AUTOMATION', 'INTELLIGENCE'].map((label, i) => <div key={label}><span>0{i + 1}</span>{label}<i /></div>)}</footer>
  </Container>;
}





