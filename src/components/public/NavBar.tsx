import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import sayHi from "../../assets/Say Hi!.gif";

const MotionLink = motion.create(Link);
const MotionAnchor = motion.a;

type NavItem = {
  label: string;
  to?: string;
};

const leftLinks: NavItem[] = [
  { label: "Quick Links" },
  { label: "Hero Section", to: "#herosection" },
  { label: "About Me", to: "#aboutme" },
  { label: "Projects", to: "#projects" },
  { label: "My skill", to: "#myskill" },
  { label: "Footer", to: "#footer" },
];

const rightLinks: NavItem[] = [
  { label: "Character →" },
  { label: "Mikasa", to: "Mikasa" },
  { label: "Pain", to: "Pain" },
  { label: "Levi", to: "Levi" },
  { label: "Konan", to: "Mikasa" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Invisible fullscreen layer used only as a drag boundary.
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Suppress click that fires right after a drag (prevents accidental nav)
  const wasDragging = useRef(false);

  // ── Variants (unchanged) ──────────────────────────────────────────────
  const menuVariants: Variants = {
    collapsed: {
      width: "min(100px, 55%)",
      height: 46,
      borderRadius: 24,
      transition: {
        height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        width: { duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
        borderRadius: { duration: 0.4 },
      },
    },
    expanded: {
      width: "min(800px, 98%)",
      height: 400,
      borderRadius: 24,
      transition: {
        width: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
        borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      },
    },
  };

  const columnVariants: Variants = {
    collapsed: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
    expanded: {
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: 0.3,
        staggerChildren: 0.06,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    collapsed: { opacity: 0, y: -8, scale: 0.97 },
    expanded: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0, ease: [0.4, 0, 0.2, 1] },
      },
    },
  };

  const topBarVariants: Variants = {
    collapsed: { rotate: 0, y: 0 },
    expanded: { rotate: 45, y: 8, transition: { duration: 0.3 } },
  };

  const middleBarVariants: Variants = {
    collapsed: { opacity: 1, scaleX: 1 },
    expanded: { opacity: 0, scaleX: 0, transition: { duration: 0.25 } },
  };

  const bottomBarVariants: Variants = {
    collapsed: { rotate: 0, y: 0 },
    expanded: { rotate: -45, y: -8, transition: { duration: 0.3 } },
  };

  const renderColumn = (items: NavItem[]) => (
    <motion.div
      variants={columnVariants}
      initial="collapsed"
      animate="expanded"
      exit="collapsed"
      className="text-black space-y-1.5"
    >
      {items.map(({ label, to }, index) => {
        const isHeading = index === 0;
        const className = `block ${
          isHeading ? "text-md font-semibold" : "nav-links text-lg"
        } px-3 py-2.5 rounded-lg transition-all duration-200`;

        if (!to) {
          return (
            <motion.div key={label} variants={itemVariants} className={className}>
              {label}
            </motion.div>
          );
        }

        if (to.startsWith("#")) {
          return (
            <MotionAnchor
              key={label}
              href={to}
              variants={itemVariants}
              className={className}
              onClick={closeMenu}
            >
              {label}
            </MotionAnchor>
          );
        }

        return (
          <MotionLink
            key={label}
            to={to}
            variants={itemVariants}
            className={className}
            onClick={closeMenu}
          >
            {label}
          </MotionLink>
        );
      })}
    </motion.div>
  );

  const renderColumnV2 = (items: NavItem[]) => (
    <motion.div
      variants={columnVariants}
      initial="collapsed"
      animate="expanded"
      exit="collapsed"
      className="text-black space-y-1.5"
    >
      {items.map(({ label, to }, index) => {
        const isHeading = index === 0;
        const className = `block ${
          isHeading ? "text-md font-semibold" : "nav-links text-lg"
        } px-3 py-2.5 rounded-lg transition-all duration-200`;

        if (!to) {
          return (
            <motion.div key={label} variants={itemVariants} className={className}>
              {label}
            </motion.div>
          );
        }

        return (
          <MotionLink
            key={label}
            
            variants={itemVariants}
            className={className}
          >
            {label}
          </MotionLink>
        );
      })}
    </motion.div>
  );



  return (
    <>
      {/* Invisible fullscreen drag boundary (sibling, not parent) */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 z-100 pointer-events-none"
      />

      {/* Your original positioning wrapper — visually identical */}
      <div className="fixed z-100 flex justify-center  w-full top-2  pointer-events-none">
        <motion.nav
          style={{ touchAction: "none" }}
          variants={menuVariants}
          initial="collapsed"
          animate={isOpen ? "expanded" : "collapsed"}
          className="backdrop-blur-sm border border-gray-300/20 bg-white/50 rounded-full dark:border-0 overflow-hidden relative pointer-events-auto active:cursor-grabbing"
        >
          <div className="flex items-center justify-between px-4 h-11.5">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 border border-gray-black rounded-2xl flex items-center justify-center text-black ">
                S
              </div>
            </div>

            <motion.button
              onClick={toggleMenu}
              // Prevent drag from starting on the burger (pointerdown bubbles to nav)
              onPointerDown={(e) => e.stopPropagation()}
              className="flex flex-col space-y-1.5 p-1 rounded-lg transition-colors relative z-10"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                variants={topBarVariants}
                animate={isOpen ? "expanded" : "collapsed"}
                className="block w-6 h-0.5 bg-black rounded-full origin-center"
              />
              <motion.span
                variants={middleBarVariants}
                animate={isOpen ? "expanded" : "collapsed"}
                className="block w-6 h-0.5 bg-black rounded-full origin-center"
              />
              <motion.span
                variants={bottomBarVariants}
                animate={isOpen ? "expanded" : "collapsed"}
                className="block w-6 h-0.5 bg-black rounded-full origin-center"
              />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2  gap-x-6 gap-y-4 px-4 pt-2"
              >
                {renderColumn(leftLinks)}

                <img className="rounded-4xl" src={sayHi} alt="Hi" />

              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

export default NavBar;