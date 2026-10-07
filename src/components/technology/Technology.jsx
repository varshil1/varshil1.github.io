import './technology.scss';
import { useEffect, useState } from 'react';
import { skillGroups } from './skills';

export default function Technology() {
  const [group, setGroup] = useState('All');
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(null);
  const skills = group === 'All' ? [...new Set(Object.values(skillGroups).flat())] : skillGroups[group];
  useEffect(() => {
    const cloud = window.TagCanvas;
    if (!cloud) { setReady(false); return; }
    const start = () => {
      try {
        cloud.Delete('tagcanvas');
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        const stop = paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const result = cloud.Start('tagcanvas', 'taglist', {
          textColour: accent, outlineColour: accent, textHeight: group === 'All' ? 14 : 19,
          outlineThickness: 1, maxSpeed: stop ? 0 : 0.025, initial: stop ? [0, 0] : [0.14, -0.08],
          freezeActive: true, shuffleTags: false, shape: 'sphere', zoom: 0.9,
          wheelZoom: false, noSelect: true, textFont: 'Outfit, sans-serif', depth: 0.8, fadeIn: 300,
        });
        setReady(result !== false);
      } catch { setReady(false); }
    };
    start();
    const observer = new MutationObserver(start);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { observer.disconnect(); cloud.Delete('tagcanvas'); };
  }, [group, paused]);
  const choose = (event, name) => { event.preventDefault(); setSelected(name); };
  return <section className="bdy2" id="technology" aria-labelledby="tools-heading">
    <div className="techWrapper">
      <div className="techLeftWrapper">
        <p className="tools-eyebrow">THE ENGINEERING TOOLBOX</p><h1 id="tools-heading">Tech and Tools</h1>
        <h2>From model context<br />to production infrastructure.</h2>
        <p className="tools-description">Explore the languages, frameworks, and methods from my résumé and earlier work. Related concepts are included as a separate exploration category.</p>
        <div className="skill-filters" aria-label="Filter the tools globe">{['All', ...Object.keys(skillGroups)].map(name => <button type="button" key={name} aria-pressed={group === name} onClick={() => { setGroup(name); setSelected(null); }}>{name}</button>)}</div>
        <p className="globe-meta">{skills.length} keywords · {group === 'Related concepts' ? 'Adjacent ideas, not additional experience claims' : 'Select a category to explore'}</p>
        <button type="button" className="globe-pause" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button>
        <p className="selected-skill" role="status">{selected ? `${selected} · ${Object.keys(skillGroups).find(name => skillGroups[name].includes(selected))}` : 'Select a keyword in the globe or list.'}</p>
      </div>
      <div className="techRightWrapper">
        <div className="skills-charts">
          <div id="myCanvasContainer"><canvas id="tagcanvas" width="680" height="680" aria-label="Rotating globe of engineering keywords. Use the keyword list below for keyboard access." style={{ display: ready ? 'block' : 'none' }} /></div>
          <div id="taglist" hidden={ready}><ul>{skills.map(name => <li key={name}><a href="#technology" onClick={event => choose(event,name)}>{name}</a></li>)}</ul></div>
          {ready && <details className="accessible-skills"><summary>Browse all {skills.length} keywords as a list</summary><div>{skills.map(name => <button type="button" key={name} onClick={() => setSelected(name)}>{name}</button>)}</div></details>}
        </div>
      </div>
    </div>
  </section>;
}
