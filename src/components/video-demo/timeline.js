// Pure timeline model: intro never loops; ambient work uses its own local phase.
export const clamp = n => Math.max(0, Math.min(1, n));
export const ease = n => { const v = clamp(n); return v * v * (3 - 2 * v); };
export const agentStarts = [4.5, 4.85, 5.2, 5.9, 5.55];
export function sequence(t, reduced = false) {
  const time = reduced ? 15 : t;
  return {
    time,
    ambient: time >= 15,
    phase: Math.max(0, time - 15),
    stage: time < 2.5 ? 0 : time < 7 ? 1 : time < 8.7 ? 2 : time < 10.5 ? 3 : 4,
    core: ease((time - 2.3) / 0.8),
    agents: agentStarts.map(start => ease((time - start - 0.4) / 0.4)),
    connections: agentStarts.map(start => ease((time - start) / 0.45)),
    tools: ease((time - 8.5) / 0.3),
    output: ease((time - 11.3) / 0.7),
    reveal: ease((time - 12.5) / 2.5),
    status: time < 3.1 ? 'RECEIVING' : time < 3.7 ? 'PLANNING' : time < 4.5 ? 'COORDINATING' : time < 7 ? 'DELEGATING' : 'COORDINATING',
  };
}

