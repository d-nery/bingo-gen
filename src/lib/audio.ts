class BingoAudio {
  private ctx: AudioContext | null = null;

  init() {
    if (typeof window !== "undefined" && !this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  playRoll() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    // Create a 2-second noise buffer
    const bufferSize = this.ctx.sampleRate * 2.0;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter to make it sound hollow/wooden/plastic
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 600;
    filter.Q.value = 1.5;

    // LFO to modulate volume, simulating balls tumbling and hitting the cage
    const lfo = this.ctx.createOscillator();
    lfo.type = "sawtooth";
    lfo.frequency.value = 14;

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.8;
    lfo.connect(lfoGain);

    const gain = this.ctx.createGain();
    gain.gain.value = 0; // Starts at 0
    lfoGain.connect(gain.gain);

    // Main envelope
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(1, this.ctx.currentTime + 1.8);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2.0);

    const volumeNode = this.ctx.createGain();
    volumeNode.gain.value = 0.05;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(volumeNode);
    volumeNode.connect(this.ctx.destination);

    noise.start();
    lfo.start();

    setTimeout(() => {
      try {
        noise.stop();
        lfo.stop();
      } catch (e) {}
    }, 2100);
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

export const audio = new BingoAudio();
