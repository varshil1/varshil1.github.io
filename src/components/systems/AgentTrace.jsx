import WorkflowGraph from './WorkflowGraph';
import { useEffect, useRef, useState } from 'react';
import './agentTrace.scss';
const stages=[['01','Intake','Message received','Normalize the request and identify the workflow.'],['02','Retrieve','Evidence attached','Retrieve relevant policy and business context.'],['03','Route','Inquiry routed to drafting','AI routes the request using retrieved context and scoped order-tool results.'],['04','Human review','Reviewer checks the draft','Illustrated approval checkpoint before any external action.'],['05','Response','Reviewed draft ready','Evidence and review stay attached. Nothing is sent from this demo.']];
export default function AgentTrace({visible,motion=true}){
 const [step,setStep]=useState(0),[inView,setInView]=useState(false),[pageActive,setPageActive]=useState(!document.hidden),[reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const ref=useRef(null);
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.35});observer.observe(ref.current);const media=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(media.matches);const visibility=()=>setPageActive(!document.hidden);media.addEventListener('change',change);document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();media.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility);};},[]);
 const running=visible&&inView&&pageActive&&motion&&!reduced;
 useEffect(()=>{if(!running)return;const timer=setTimeout(()=>setStep(value=>(value+1)%stages.length),2600);return()=>clearTimeout(timer);},[running,step]);
 return <div ref={ref} className={`workflow-studio ${running?'is-running':''}`}>
 <div className="studio-top"><div><span className="section-eyebrow">EXPLORE THE WORKFLOW</span><h3>You’re the human in the loop.</h3></div><span className="studio-demo">ILLUSTRATIVE WORKFLOW · NO LIVE API</span></div>
 <div className="studio-body"><aside className="studio-sidebar"><span className="studio-label">WORKSPACE</span><strong>Support copilot</strong><span className="studio-chip">⑂ Request → resolution</span><div className="studio-request"><span className="studio-label">INCOMING REQUEST</span><p>“Can I return an unopened laptop after 12 days?”</p></div><div className="studio-source"><span>▤ returns_policy.md</span><span>⌘ orders.lookup</span><span>◎ Human reviewer</span></div></aside>
 <div className="studio-canvas"><div className="studio-canvas-heading"><span>ORCHESTRATION CANVAS</span><span className="studio-indicator">{reduced?'Workflow overview':running?'● Following the request':'○ Workflow paused'}</span></div><WorkflowGraph step={step} />
 <div className="studio-bottom"><div className="studio-inspector"><span className="studio-label">{stages[step][0]} / EXECUTION TRACE</span><h4>{stages[step][2]}</h4><p>{stages[step][3]}</p></div><div className="studio-artifact"><span className="studio-label">{step<3?'CONTEXT PACKET':'REVIEW RECORD'}</span><code>{step===0?'intent: return_request':step===1?'source: returns_policy.md':step===2?'tool: orders.lookup':step===3?'gate: human_approval':'status: reviewed_draft'}</code><div className="studio-bars" aria-hidden="true"><i/><i/><i/></div><span className="studio-label">{step===4?'DEMO COMPLETE · NOTHING SENT':'SCHEMATIC DEMO DATA'}</span></div></div></div></div>
 </div>;
}

