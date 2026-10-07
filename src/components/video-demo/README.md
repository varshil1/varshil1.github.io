# Intelligence section animation

This component powers the portfolio's Intelligence section. There is no standalone `/video` route in the published app.

`Systems.jsx` renders the embedded variant, without the prototype identity/header. The section's existing motion control pauses the animation. IntersectionObserver starts playback when 25% of the stage is visible, pauses it offscreen, and resumes from the same timestamp on return.

The 15-second sequence shows enterprise data, orchestration, agent activation, reasoning, tool calls, validation, and structured output. It then settles into sparse ambient activity. Reduced-motion preferences show a static completed architecture. Light/dark styling is provided by `systems/system-animation.css`.

`timeline.js` contains the sequence model. `choreography.js` updates DOM/SVG/Three.js from one clock without per-frame React state updates. Particle counts and trails are reduced on mobile. Tests cover sequence order, pause/resume, replay, reduced motion, output arrival and viewport gating.

The standalone presentation variant remains in the component for internal testing, but is not registered as a route or linked in navigation.
