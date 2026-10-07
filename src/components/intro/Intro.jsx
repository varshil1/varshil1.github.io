import "./intro.scss";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const concepts = [ { name: 'LLMs', label: 'Reason with context', detail: 'Focused prompts, structured outputs, and model evaluation.' }, { name: 'RAG', label: 'Ground every answer', detail: 'Retrieval connects model responses to relevant evidence.' }, { name: 'MCP', label: 'Connect the tools', detail: 'A shared interface between AI applications and external capabilities.' }, { name: 'Agents', label: 'Coordinate the workflow', detail: 'Bounded tasks, explicit contracts, and human review.' } ];

const roles = ["An AI Engineer", "A Data Systems Builder", "A Creative Problem Solver"];

export default function Intro() {
  const [concept, setConcept] = useState(0);
  const [effect, setEffect] = useState(null);
  const [typedRole, setTypedRole] = useState("");
  const [decodedCode, setDecodedCode] = useState("code");
  const canvasRef = useRef(null);
  const artRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedRole(roles[0]);
      return;
    }
    let roleIndex = 0;
    let character = 0;
    let deleting = false;
    let timer;
    const type = () => {
      const current = roles[roleIndex];
      character += deleting ? -1 : 1;
      setTypedRole(current.slice(0, character));
      let delay = deleting ? 60 : 90;
      if (!deleting && character === current.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && character === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }
      timer = window.setTimeout(type, delay);
    };
    timer = window.setTimeout(type, 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (effect !== "code" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let columns = [];
    let frame;
    let lastTime = 0;
    const resize = () => {
      canvas.width = artRef.current.clientWidth;
      canvas.height = artRef.current.clientHeight;
      columns = Array.from({ length: Math.ceil(canvas.width / 20) }, () => Math.random() * -50);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(artRef.current);
    resize();
    const draw = time => {
      if (time - lastTime > 50) {
        context.fillStyle = "rgba(4, 4, 41, 0.15)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#81ec72";
        context.font = "16px monospace";
        columns.forEach((y, index) => {
          context.fillText(Math.random() > 0.5 ? "1" : "0", index * 20, y * 20);
          columns[index] = y * 20 > canvas.height && Math.random() > 0.97 ? 0 : y + 1;
        });
        lastTime = time;
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [effect]);

  useEffect(() => {
    setDecodedCode("code");
    if (effect !== "code" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frames = ["c···", "co··", "cod·", "code"];
    let index = 0;
    setDecodedCode(frames[0]);
    const timer = window.setInterval(() => {
      index += 1;
      setDecodedCode(frames[index]);
      if (index === frames.length - 1) window.clearInterval(timer);
    }, 140);
    return () => window.clearInterval(timer);
  }, [effect]);
  const interaction = name => ({
    onMouseEnter: event => { if (event.buttons === 0) setEffect(name); },
    onMouseLeave: () => setEffect(null),
    onFocus: () => setEffect(name),
    onBlur: () => setEffect(null),
    onClick: () => setEffect(name),
  });

  return (
    <section className="intro" id="intro" aria-labelledby="intro-name">
      <div className={`intro-art effect-${effect || "idle"}`} ref={artRef}>
        <div className="portrait-stage">
          <div className="portrait-halo" aria-hidden="true" />
          <svg className="portrait-network" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <circle cx="250" cy="250" r="210" className="network-ring" />
            <ellipse cx="250" cy="250" rx="225" ry="130" transform="rotate(-32 250 250)" className="network-orbit" />
            <ellipse cx="250" cy="250" rx="225" ry="130" transform="rotate(32 250 250)" className="network-orbit orbit-secondary" />
            <path d="M95 105 250 250 410 110M80 355 250 250 415 360" className="network-connections" />
            <g className="network-satellite"><circle cx="250" cy="40" r="5" /></g>
            <g className="network-satellite satellite-secondary"><circle cx="250" cy="40" r="3" /></g>
          </svg>
          {effect === "code" && <canvas className="canvas-bg" ref={canvasRef} aria-hidden="true" />}
          <img className="intro-portrait" src="assets/man_illustrator_wwithout_eyes.png" alt="Illustration of Varshil Shah" />
          <div className="concept-nodes" aria-label="Explore AI concepts">{concepts.map((item, index) => <button type="button" key={item.name} className={`concept-node node-${index}`} aria-pressed={concept === index} onClick={() => setConcept(index)}><span className="node-dot" aria-hidden="true" />{item.name}</button>)}</div>
          <span className="human-label">HUMAN IN THE LOOP</span>
        </div>
        <div className="concept-caption" aria-live="polite"><span className="concept-index">0{concept + 1} / AI SYSTEMS</span><h3>{concepts[concept].label}</h3><p>{concepts[concept].detail}</p></div>
      </div>
      <div className="intro-content">
        <p className="intro-greeting">AI ENGINEERING × CREATIVE THINKING</p>
        <h1 id="intro-name">Varshil Shah</h1>
        <p className="intro-role" aria-label={roles.join(", ")}>
          <span aria-hidden="true">{typedRole}<span className="intro-cursor">|</span></span>
        </p>
        <h2 className="intro-skills">
          <span>I </span>
          <span className="skill-word"><button type="button" className="skill-design" {...interaction("design")}><span className="design-label" data-text="design">design</span><span className="design-aura" aria-hidden="true" /></button>, </span>
          <span className="skill-word"><button type="button" className="skill-code" aria-label="code" {...interaction("code")}><span className="code-label" aria-hidden="true">code<span className="code-decoded">{decodedCode}<i /></span></span><span className="code-bracket bracket-left" aria-hidden="true">&lt;</span><span className="code-bracket bracket-right" aria-hidden="true">/&gt;</span></button> </span>
          <span>and </span>
          <button type="button" className="skill-ai" {...interaction("ai")}><span className="deploy-label" data-text="deploy AI">deploy AI</span><span className="deploy-orbit" aria-hidden="true"><i /><i /></span><span className="deploy-status" aria-hidden="true"><i />MODEL → LIVE</span></button>
        </h2>
        <a className="intro-artwork" href="https://pin.it/4ZcBf6e" target="_blank" rel="noreferrer">Beyond engineering → My artwork ↗</a>
        <p className="intro-description">I build AI systems that work beyond the demo: agents that connect to real tools, RAG grounded in enterprise data, and pipelines designed for reliability. At TD SYNNEX, I turn complex workflows into observable, human-guided automation.</p>
        <button className="intro-explore" type="button" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>Explore selected work <span aria-hidden="true">↓</span></button>
      </div>
    </section>
  );
}









