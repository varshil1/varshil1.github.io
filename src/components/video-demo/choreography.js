import * as THREE from 'three';
import { sequence, ease, clamp, agentStarts } from './timeline';

// All motion is sampled from a single clock. No independent timers or CSS animations.
export function createChoreography(root, { active: initiallyActive = true } = {}) {
  const query = selector => root.querySelector(selector);
  const all = selector => [...root.querySelectorAll(selector)];
  const agents = all('.vd-agent');
  const wires = all('.vd-spoke');
  const spokePackets = all('.vd-spoke-packet');
  const links = all('.vd-work-link');
  const packetGroups = all('.vd-work-packets');
  const trails = packetGroups.map(group => [...group.children]);
  const inputs = all('.vd-input-packet');
  const outputs = all('.vd-output-packet');
  const network = query('.vd-network');
  const core = query('.vd-core');
  const status = query('.vd-core small');
  const tools = query('.vd-tools');
  const output = query('.vd-output');
  const bars = all('.vd-bars i');
  const toolNodes = all('.vd-tool-targets b');
  const stages = all('.vd-timeline > div');
  const stageLabel = query('.vd-stage-label');
  const timer = query('.vd-time');
  const eyebrow = query('.vd-eyebrow');
  const heading = query('h1');
  const description = query('.vd-description');
  const source = query('.vd-source');
  const pulse = query('.vd-energy');
  const validation = agents[3].querySelector('small');
  const labels = ['Data arriving', 'Orchestrator → specialized agents', 'Evidence → reasoning', 'Calling tools · verifying results', 'Validated intelligence'];
  const host = query('.vd-particles');
  let renderer, geometry, material, camera, scene;
  const mobile = window.innerWidth < 700;
  const inputLabels = ['DOC', '{ JSON }', 'API', 'DB', 'SKU-1842', 'PRODUCT SPEC', 'OEM DATA', 'PARTNER API'];
  const selectInputs = () => {
    const available = [...inputLabels];
    inputs.forEach(packet => {
      packet.textContent = available.splice(Math.floor(Math.random() * available.length), 1)[0];
    });
  };
  selectInputs();
  const count = mobile ? 65 : 180;
  const points = new Float32Array(count * 3);
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    host.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 12;
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
    material = new THREE.PointsMaterial({ color: '#7eabe8', size: 0.026, transparent: true, opacity: 0.3, depthWrite: false });
    scene.add(new THREE.Points(geometry, material));
  } catch { /* HTML/SVG remains complete without WebGL. */ }
  const resize = () => {
    if (!renderer) return;
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = media.matches, paused = false, active = initiallyActive, time = 0, previous, frame;
  const lengths = new Map([...wires, ...links].map(path => [path, path.getTotalLength()]));
  const show = (el, value) => { el.style.opacity = value; el.style.visibility = value <= 0 ? 'hidden' : 'visible'; };
  const dotOn = (dot, path, progress) => {
    const p = path.getPointAtLength(lengths.get(path) * clamp(progress));
    dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
  };
  function render() {
    const state = sequence(time, reduced), t = state.time;
    root.dataset.phase = state.ambient ? 'ambient' : 'intro';
    root.dataset.time = t.toFixed(3);
    root.dataset.paused = paused || reduced || !active;
    const reveal = state.reveal;
    const ambientTime = state.phase % 20;
    const ambientRound = Math.floor(state.phase / 20);
    const desktop = window.innerWidth > 1000;
    const activity = agents.map(() => 0);
    network.style.transform = `perspective(1000px) translate(calc(var(--vd-x,0px) - ${desktop ? 6 : 0}px),var(--vd-y,0px)) rotateY(${reduced ? 0 : Math.sin(t * 0.17) * 0.7}deg) scale(${(1.08 - reveal * 0.08) * (desktop ? 1.07 : 1)})`;
    if (eyebrow) {
    show(eyebrow, 0.4 + ease(t / 1.5) * 0.6); eyebrow.style.letterSpacing = `${6 - ease(t / 2) * 2}px`;
    show(heading, 0.48 + ease(t / 2) * 0.16 + reveal * 0.36); heading.style.transform = `translateY(${(1 - ease(t / 2)) * 9}px)`;
    show(description, 0.22 + ease((t - 6.5) / 2) * 0.43 + reveal * 0.35);
    }
    show(core, state.core); status.textContent = state.status;
    const coreActivity = !reduced && ((t > 2.5 && t < 4.5) || (state.ambient && ambientTime > 2.4 && ambientTime < 3.4));
    core.style.borderColor = coreActivity ? '#80ccff' : '#6e88bd';
    core.style.boxShadow = `0 0 ${coreActivity ? 24 : 10}px #548bd530`;
    show(source, ease((t - 1.5) / 2));
    const pulsePhase = clamp((t - 2.6) / 1.3);
    show(pulse, reduced ? 0 : (t > 2.6 && t < 3.9 ? 0.6 * (1 - pulsePhase) : 0));
    pulse.style.transform = `translate(-50%,-50%) scale(${1 + pulsePhase * 1.2})`;
    agents.forEach((node, i) => {
      show(node, state.agents[i]);
      node.tabIndex = state.agents[i] > 0.9 ? 0 : -1;
      node.style.transform = `translate(-50%,-50%) translateY(${(1 - state.agents[i]) * 8}px) scale(${0.94 + state.agents[i] * 0.06})`;
      const birth = t - agentStarts[i] - 0.55;
      activity[i] = !reduced && birth > 0 && birth < 0.8 ? Math.sin(birth / 0.8 * Math.PI) : 0;
      wires[i].style.strokeDashoffset = 1 - state.connections[i];
      show(wires[i], state.connections[i] > 0 ? 1 : 0);
      const travel = (t - agentStarts[i]) / 0.6;
      show(spokePackets[i], !reduced && travel >= 0 && travel <= 1 ? 1 : 0);
      dotOn(spokePackets[i], wires[i], ease(travel));
    });
    inputs.forEach((packet, i) => {
      const cycle = state.ambient ? ambientTime : t - i * 0.38;
      const p = cycle / (2.7 + (state.ambient ? 0 : i * 0.08));
      const visible = !reduced && cycle >= 0 && p < 1 && (!state.ambient || i === ambientRound % inputs.length) && (!mobile || state.ambient || i < 3);
      show(packet, visible ? Math.min(p * 8, (1 - p) * 6, 1) : 0);
      packet.style.left = `${4 + ease(p) * 42}%`;
      packet.style.top = `${20 + i * 9 + ease(p) * (47 - (20 + i * 9))}%`;
      packet.style.transform = `translate(-50%,-50%) scale(${0.7 + Math.sin(clamp(p) * Math.PI) * (i % 2 ? 0.25 : 0.55)}) rotate(${(1 - clamp(p)) * (i % 2 ? 5 : -5)}deg)`;
    });
    toolNodes.forEach(node => node.style.setProperty('--tool-activity', '0'));
    links.forEach((path, i) => {
      const start = [7, 7.65, 10.1, 10.2, 8.7, 8.8, 11.3, 8.9][i];
      const draw = ease((t - start) / 0.4);
      show(path, draw); path.style.strokeDashoffset = 1 - draw;
      const isTool = i === 4 || i === 5 || i === 7;
      const ambientSelected = i === ambientRound % 2 || i === [4, 5, 7][ambientRound % 3] || i === 6;
      const cycle = state.ambient ? ambientTime - (isTool ? 5 : i === 6 ? 9 : 3.5) : t - start;
      const duration = isTool ? 1.5 : 0.9;
      const p = cycle / duration;
      const moving = !reduced && cycle >= 0 && p < 1 && (!state.ambient || ambientSelected);
      path.style.stroke = moving ? (i === 6 ? '#84dfbd' : '#b5a0ef') : '#536987';
      const dots = trails[i];
      dots.forEach((dot, j) => {
        const position = p - j * 0.035;
        show(dot, moving && position >= 0 && (!mobile || j < 2) ? (1 - j / dots.length) * 0.9 : 0);
        dotOn(dot, path, ease(position));
      });
      if (moving && isTool) {
        const toolIndex = i === 4 ? 1 : i === 5 ? 0 : 2;
        toolNodes[toolIndex].style.setProperty('--tool-activity', Math.max(0, 1 - Math.abs(p - 0.5) * 5));
      }
      if (!reduced && cycle >= 0 && cycle < duration + 0.5 && (!state.ambient || ambientSelected)) {
        const target = [1, 2, 3, 3, 1, 4, -1, 2][i];
        const source = [0, 1, 2, 4, 1, 4, 3, 2][i];
        if (p < 0.3) activity[source] = Math.max(activity[source], Math.sin(clamp(p / 0.3) * Math.PI));
        const arrival = clamp((cycle - duration * 0.75) / (duration * 0.25 + 0.5));
        if (target >= 0) activity[target] = Math.max(activity[target], Math.sin(arrival * Math.PI));
      }
    });
    show(tools, state.tools); show(output, state.output);
    validation.textContent = t < 10.5 ? 'AGENT' : t < 11.3 ? 'VALIDATING...' : 'VALIDATED ✓';
    agents[3].classList.toggle('vd-validated', t >= 11.3);
    const confirmation = state.ambient ? ambientTime - 8.4 : t - 11.3;
    if (!reduced && confirmation > 0 && confirmation < 0.7) activity[3] = Math.max(activity[3], Math.sin(confirmation / 0.7 * Math.PI));
    agents.forEach((node, i) => {
      node.classList.toggle('vd-active', activity[i] > 0.1);
      node.style.setProperty('--activity', activity[i]);
    });
    outputs.forEach((packet, i) => {
      const cycle = state.ambient ? ambientTime - 9 : t - 11.3 - i * 0.3;
      const p = cycle / 0.85;
      show(packet, !reduced && cycle >= 0 && p < 1 && (!state.ambient || i === ambientRound % outputs.length) ? Math.min(p * 9, (1 - p) * 6, 1) : 0);
      packet.style.left = `${65 + clamp(p) * 28}%`; packet.style.top = '73%';
    });
    bars.forEach((bar, i) => {
      bar.style.transform = `scaleY(${ease((t - 12.15 - Math.min(i, 3) * 0.3) / 0.3)})`;
    });
    stages.forEach((node, i) => {
      node.classList.toggle('vd-reached', i <= state.stage);
      node.classList.toggle('vd-current', i === state.stage);
      if (i === state.stage) node.setAttribute('aria-current', 'step'); else node.removeAttribute('aria-current');
    });
    stageLabel.textContent = state.ambient ? 'Intelligence, in operation' : labels[state.stage];
    timer.textContent = reduced ? 'REDUCED MOTION' : state.ambient ? 'AMBIENT' : `${t.toFixed(1).padStart(4, '0')} / 15s`;
    if (renderer) {
      for (let i = 0; i < count; i++) {
        points[i * 3] = ((i * 0.618 + t * 0.002) % 1) * 24 - 12;
        points[i * 3 + 1] = Math.sin(i * 9.7) * 5;
        points[i * 3 + 2] = (i % 13) / 13 * 9 - 4;
      }
      geometry.attributes.position.needsUpdate = true;
      camera.position.z = 11.3 + reveal * 0.7;
      camera.position.x = reduced ? 0 : Math.sin(t * 0.1) * 0.08;
      renderer.render(scene, camera);
    }
  }
  const tick = now => {
    if (previous !== undefined && active && !document.hidden && !paused && !reduced) time += Math.min((now - previous) / 1000, 0.1);
    previous = now;
    if (active && !paused && !reduced && !document.hidden) render();
    frame = requestAnimationFrame(tick);
  };
  const change = () => { reduced = media.matches; render(); };
  media.addEventListener('change', change);
  render(); frame = requestAnimationFrame(tick);
  return {
    setActive(value) { active = value; previous = undefined; render(); },
    pause(value) { paused = value; render(); },
    replay() { time = 0; previous = undefined; paused = false; selectInputs(); root.style.setProperty('--vd-x', '0px'); root.style.setProperty('--vd-y', '0px'); render(); },
    dispose() { cancelAnimationFrame(frame); media.removeEventListener('change', change); observer.disconnect(); geometry?.dispose(); material?.dispose(); renderer?.dispose(); renderer?.domElement.remove(); },
  };
}

