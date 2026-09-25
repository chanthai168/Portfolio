import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const NAME = "SAN CHANTHAI";
const CURVE_DEPTH = 140;   // px — how deep the middle dips
const MAX_ROTATION = 18;   // deg — edge letters tilt

const Letter: React.FC<{
  char: string;
  index: number;
  total: number;
  curve: MotionValue<number>;
}> = ({ char, index, total, curve }) => {
  const t = total === 1 ? 0 : (index / (total - 1)) * 2 - 1;
  const curveFactor = 1 - t * t;

  const y = useTransform(curve, (c) => curveFactor * c * CURVE_DEPTH);
  const rotate = useTransform(curve, (c) => -t * c * MAX_ROTATION);

  return (
    <motion.span
      style={{ y, rotate, display: "inline-block" }}
      className="text-textColor bg-clip-text will-change-transform"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    // 0 → footer top hits viewport bottom
    // 1 → footer bottom hits viewport bottom (true page end)
    offset: ["start end", "end end"],
  });

  // ── The "feel" knobs ─────────────────────────────────
  // stiffness: higher = snappier follow of the scroll
  // damping:   higher = less overshoot / wobble
  // mass:      higher = heavier, laggier
  const smooth = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 24,
    mass: 0.6,
    restDelta: 0.001,
  });

  // Ease the mapping so most of the straightening happens in the
  // middle of the scroll range, not linearly.
  const curve = useTransform(smooth, [0, 0.15, 0.75, 1], [1, 1, 0.35, 0]);

  const chars = NAME.split("");

  return (
    <section ref={footerRef} className="w-full  -bg-linear-90 overflow-hidden  bg-layer2 text-textColor">
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-10 flex flex-col items-center md:px-32 gap-6 sm:mb-14 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-md text-base  leading-relaxed sm:text-lg">
            Say <span className=" bg-blue-500 px-2 text-white rounded-sm">Hello</span> to me 
          </p>

          {/* <div className="space-y-1 text-sm sm:text-left sm:text-base">
            <p>
              <span className="font-medium">Facebook:</span> San Chanthai
            </p>
            <p>
              <span className="font-medium">Gmail:</span>{" "}
              <a
                href="mailto:sanchanthai012@gmail.com"
                className="hover:underline"
              >
                sanchanthai012@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium">Github:</span>{" "}
              <a
                href="https://github.com/chanthai168"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @chanthai168
              </a>
            </p>
          </div> */}

          <div className=" flex gap-1">
            <p className="nav-glass p-2.5 rounded-l-full">📞</p>
            <p className="nav-glass p-2.5 rounded-full">📞</p>
            <p className="nav-glass p-2.5 rounded-full">📞</p>
            <p className="nav-glass p-2.5 rounded-r-full">📞</p>
          </div>
        </div>

        <h1 className="text-[54px] sm:text-[200px] text-center font-bold flex justify-center leading-none pb-6">
          {chars.map((char, i) => (
            <Letter
              key={i}
              char={char}
              index={i}
              total={chars.length}
              curve={curve}
            />
          ))}
        </h1>

        <div className="flex justify-between">
          <p>©️ All right reserved.</p>
          <p>2026</p>
          <p>By San Chanthai</p>
        </div>


      </div>
    </section>
  );
};

export default Footer;