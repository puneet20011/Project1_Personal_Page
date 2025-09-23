// Interactive particle network for the hero section.
export function startParticles(canvasId = "projects-canvas") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const DPR = window.devicePixelRatio || 1;

  let width;
  let height;
  let particles = [];
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    particles = makeParticles(Math.floor(width * 0.08));
  }

  function makeParticles(count) {
    const arr = [];
    for (let i = 0; i < count; i += 1) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
    }
    return arr;
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // Move and draw points
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -5) p.x = width + 5;
      if (p.x > width + 5) p.x = -5;
      if (p.y < -5) p.y = height + 5;
      if (p.y > height + 5) p.y = -5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Connect nearby points
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          ctx.globalAlpha = Math.max(0.05, 1 - d2 / (120 * 120));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Attraction to mouse
    if (mouse.active) {
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(step);
  }

  // Events
  window.addEventListener("resize", resize);
  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  canvas.addEventListener("pointerleave", () => {
    mouse.active = false;
  });

  resize();
  step();
}
