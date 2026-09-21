import { useEffect, useRef } from 'react';

/* ============================================================
   TYPES
   ============================================================ */
export type IceParticlesLayer = 'background' | 'foreground';

export interface IceParticlesProps {
  /** Where the canvas sits in the stacking order. */
  layer?: IceParticlesLayer;
  /** URL(s) to your sprite image(s). Pass an array for variety. */
  spriteSrc: string | string[];
  /** How many particles on screen. */
  particleCount?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  /** Horizontal sway strength in px. */
  swayAmount?: number;
  /** How fast they sway. */
  swaySpeed?: number;
  /** Rotation speed per frame (radians). Set 0 to disable. */
  rotationSpeed?: number;
  /** 0 = invisible, 1 = solid. */
  opacity?: number;
  /** Extra class names for styling. */
  className?: string;
  /** Optional z-index override. */
  zIndex?: number;
  /** Disable the animation (e.g. for accessibility / reduced motion). */
  paused?: boolean;
}

/* ============================================================
   COMPONENT
   ============================================================ */
export default function IceParticles({
  layer = 'background',
  spriteSrc,
  particleCount = 60,
  minSize = 20,
  maxSize = 60,
  minSpeed = 0.3,
  maxSpeed = 1.2,
  swayAmount = 15,
  swaySpeed = 0.01,
  rotationSpeed = 0.005,
  opacity = 0.85,
  className = '',
  zIndex,
  paused = false,
}: IceParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spritesRef = useRef<HTMLImageElement[]>([]);
  const pausedRef = useRef(paused);
  const rafRef = useRef<number | null>(null);

  // keep paused in sync without restarting the whole effect
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  /* ----------------------------------------------------------
     Load sprites once
     ---------------------------------------------------------- */
  useEffect(() => {
    const srcs = Array.isArray(spriteSrc) ? spriteSrc : [spriteSrc];
    spritesRef.current = srcs.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, [spriteSrc]);

  /* ----------------------------------------------------------
     Main animation loop
     ---------------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for perf

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    /* --------------------------------------------------------
       Particle
       -------------------------------------------------------- */
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    class IceParticle {
      size = 0;
      x = 0;
      baseX = 0;
      y = 0;
      speed = 0;
      rotation = 0;
      rotationSpeed = 0;
      swayOffset = 0;
      swayAmp = 0;
      age = 0;
      sprite: HTMLImageElement | null = null;

      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.size = rand(minSize, maxSize);
        this.baseX = rand(0, W);
        this.x = this.baseX;
        this.y = initial ? rand(0, H) : rand(-this.size * 2, -this.size);
        this.speed = rand(minSpeed, maxSpeed);
        this.rotation = rand(0, Math.PI * 2);
        this.rotationSpeed = rand(-rotationSpeed, rotationSpeed);
        this.swayOffset = rand(0, Math.PI * 2);
        this.swayAmp = rand(5, swayAmount);
        this.age = 0;

        const list = spritesRef.current;
        this.sprite = list.length
          ? list[Math.floor(Math.random() * list.length)]
          : null;
      }

      update() {
        this.age++;
        this.y += this.speed;
        this.x =
          this.baseX +
          Math.sin(this.age * swaySpeed + this.swayOffset) * this.swayAmp;
        this.rotation += this.rotationSpeed;

        if (this.y > H + this.size) {
          this.reset();
        }
      }

      draw() {
        ctx!.save();
        ctx!.globalAlpha = opacity;
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);

        const s = this.sprite;
        if (s && s.complete && s.naturalWidth > 0) {
          ctx!.drawImage(s, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          // Fallback diamond so you can test before your sprite loads
          ctx!.fillStyle = '#bfe9ff';
          ctx!.beginPath();
          ctx!.moveTo(0, -this.size / 2);
          ctx!.lineTo(this.size / 2, 0);
          ctx!.lineTo(0, this.size / 2);
          ctx!.lineTo(-this.size / 2, 0);
          ctx!.closePath();
          ctx!.fill();
        }

        ctx!.restore();
      }
    }

    /* --------------------------------------------------------
       Instantiate
       -------------------------------------------------------- */
    const particles: IceParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new IceParticle(true));
    }

    /* --------------------------------------------------------
       Loop
       -------------------------------------------------------- */
    const animate = () => {
      if (!pausedRef.current) {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) {
          p.update();
          p.draw();
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    particleCount,
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
    swayAmount,
    swaySpeed,
    rotationSpeed,
    opacity,
  ]);

  /* ----------------------------------------------------------
     Styling — background vs foreground
     ---------------------------------------------------------- */
  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none', // 🔑 never blocks clicks
  };

  const layerStyle: React.CSSProperties =
    layer === 'background'
      ? { zIndex: zIndex ?? 0 }
      : { zIndex: zIndex ?? 9999 }; // above UI, but click-through

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ ...baseStyle, ...layerStyle }}
    />
  );
}