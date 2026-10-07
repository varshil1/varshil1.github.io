import { useState } from 'react';
import { ProjectEvidence } from '../systems/Systems';
import { featuredPortfolio,webPortfolio,mobilePortfolio,designPortfolio,contentPortfolio } from '../../data';
import './portfolio.scss';
const groups=[['featured','Pinned',featuredPortfolio],['web','Web',webPortfolio],['mobile','Mobile',mobilePortfolio],['ai','AI / ML',designPortfolio],['python','Python',contentPortfolio]];
export default function Portfolio(){
 const [selected,setSelected]=useState('featured');
 const [query,setQuery]=useState('');
 const [preview,setPreview]=useState(null);
 const group=groups.find(item=>item[0]===selected);
 const projects=group[2].filter(item=>item.title.toLowerCase().includes(query.toLowerCase()));
 return <section className="portfolio repo-portfolio" id="portfolio" aria-labelledby="projects-heading">
 <p className="section-eyebrow">SELECTED PROJECTS</p><h1 id="projects-heading">Ideas, committed.</h1><p className="portfolio-intro">Explore my workbench of AI experiments, data projects, and digital products.</p>
 <div className="repo-window"><div className="repo-titlebar"><span aria-hidden="true">⌘</span><span>varshil1 <b>/</b> project-explorer</span><a href="https://github.com/varshil1" target="_blank" rel="noreferrer">GitHub profile ↗</a></div>
 <div className="repo-toolbar"><div className="repo-branches" aria-label="Project category">{groups.map(([id,label,items])=><button key={id} type="button" aria-pressed={selected===id} onClick={()=>{setSelected(id);setPreview(null);}}>{label}<span>{items.length}</span></button>)}</div><label className="repo-search"><span>Find a project</span><input type="search" value={query} onChange={event=>{setQuery(event.target.value);setPreview(null);}} placeholder="Search project names…"/></label></div>
 <div className="repo-status"><code>⑂ {selected} /</code><span aria-live="polite">{projects.length} {projects.length===1?'project':'projects'}</span><span>Curated portfolio</span></div>
 <div className="repo-grid">{projects.map(item=>{const isRepo=item.link?.includes('github.com');const opened=preview===item.id;return <article className="repo-card" key={item.id}><div className="repo-card-label"><span aria-hidden="true">▣</span><span>{isRepo?'Repository':item.link?'Demo / website':'Archive'}</span></div><h2>{item.title}</h2>{isRepo&&<p className="repo-path">{item.link.split('github.com/')[1]}</p>}{item.link?.includes('Algorithmic-paper')&&<p className="repo-description">Python · FinRL · PPO. DOW 30 paper trading via Alpaca: a simulated $1M portfolio grew to $1.084M. Simulation results, not live investment returns.</p>}<div className="repo-card-actions"><button type="button" aria-expanded={opened} aria-controls={`project-preview-${selected}-${item.id}`} onClick={()=>setPreview(opened?null:item.id)}>{opened?'− Close preview':'+ Preview'}</button>{item.link?<a href={item.link} target="_blank" rel="noreferrer">{isRepo?'View code':'Open project'} ↗</a>:<span>Link unavailable</span>}</div><div id={`project-preview-${selected}-${item.id}`} className="repo-preview" hidden={!opened}>{opened&&<img src={item.img} alt={`${item.title} project preview`} loading="lazy"/>}</div></article>;})}</div>
 {!projects.length&&<div className="repo-empty"><p>No projects match “{query}” in {group[1]}.</p><button type="button" onClick={()=>setQuery('')}>Clear search</button></div>}
 <div className="repo-readme"><span aria-hidden="true">▤</span><code>README.md</code><p>Select a category, preview a project, or follow its original code and demo link.</p></div></div>
 <ProjectEvidence />
 </section>;
}
