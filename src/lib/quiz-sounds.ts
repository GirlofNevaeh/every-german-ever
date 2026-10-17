let context: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!context || context.state === "closed") context = new Ctor();
  return context;
}

/** Resume the one page context. Call this from a tap or click. */
export function primeQuizSounds() {
  try {
    const ctx = audioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  } catch {
    // The quiz continues if sound cannot start.
  }
}

function afterUnlock(play: (ctx: AudioContext, when: number) => void) {
  try {
    const ctx = audioContext();
    if (!ctx) return;
    const ready = ctx.state === "running" ? Promise.resolve() : ctx.resume();
    void ready
      .then(() => {
        try {
          play(ctx, ctx.currentTime + 0.03);
        } catch {
          // A missed sound should not stop the question.
        }
      })
      .catch(() => {});
  } catch {
    // A missed sound should not stop the question.
  }
}

function whiteNoise(ctx: BaseAudioContext, seconds: number): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function brownRasp(ctx: BaseAudioContext, seconds: number): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  let phase = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    brown = brown * 0.8 + white * 0.2;
    const freq = 46 + (22 - 46) * (i / length);
    phase += (2 * Math.PI * freq) / ctx.sampleRate;
    const gate = Math.abs(Math.sin(phase));
    data[i] = (brown + white * 0.15) * gate;
  }
  let peak = 0;
  for (let i = 0; i < length; i += 1) peak = Math.max(peak, Math.abs(data[i]));
  if (peak > 0.0001) {
    const scale = 0.85 / peak;
    for (let i = 0; i < length; i += 1) data[i] *= scale;
  }
  return buffer;
}

function scheduleCheer(ctx: BaseAudioContext, now: number) {
  const burst = ctx.createBufferSource();
  burst.buffer = whiteNoise(ctx, 0.22);
  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 1200;
  const burstGain = ctx.createGain();
  burstGain.gain.setValueAtTime(0.12, now);
  burstGain.gain.setValueAtTime(0.12, now + 0.19);
  burstGain.gain.linearRampToValueAtTime(0, now + 0.22);
  burst.connect(highpass).connect(burstGain).connect(ctx.destination);
  burst.start(now);
  burst.stop(now + 0.22);

  for (const [index, frequency] of [523.25, 659.25, 783.99, 1046.5].entries()) {
    const start = now + index * 0.09;
    const end = start + 0.32;
    const note = ctx.createOscillator();
    note.type = "triangle";
    note.frequency.value = frequency;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.28, start + 0.015);
    gain.gain.setValueAtTime(0.28, end - 0.02);
    gain.gain.linearRampToValueAtTime(0, end);
    note.connect(gain).connect(ctx.destination);
    note.start(start);
    note.stop(end + 0.01);
  }
}

function scheduleFart(ctx: BaseAudioContext, now: number) {
  const end = now + 0.7;
  const noise = ctx.createBufferSource();
  noise.buffer = brownRasp(ctx, 0.7);
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.7;
  band.frequency.setValueAtTime(720, now);
  band.frequency.linearRampToValueAtTime(180, end);
  const level = ctx.createGain();
  level.gain.setValueAtTime(0, now);
  level.gain.linearRampToValueAtTime(0.9, now + 0.12);
  level.gain.linearRampToValueAtTime(0, end);
  noise.connect(band).connect(level).connect(ctx.destination);
  noise.start(now);
  noise.stop(end);

  for (const [from, to] of [
    [150, 62],
    [300, 124],
  ] as const) {
    const tone = ctx.createOscillator();
    tone.type = "square";
    tone.frequency.setValueAtTime(from, now);
    tone.frequency.linearRampToValueAtTime(to, end);
    const quiet = ctx.createGain();
    quiet.gain.setValueAtTime(0, now);
    quiet.gain.linearRampToValueAtTime(0.07, now + 0.04);
    quiet.gain.linearRampToValueAtTime(0, end);
    tone.connect(quiet).connect(ctx.destination);
    tone.start(now);
    tone.stop(end);
  }
}

export function playCheer() {
  afterUnlock(scheduleCheer);
}

export function playFart() {
  afterUnlock(scheduleFart);
}
