import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ThemeToggle } from "./ThemToggle";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 1. KEPT YOUR EXACT STYLE: Width expands first, then height follows.
  const menuVariants: Variants = {
    collapsed: {
      width: "min(400px, 55%)",
      height: 46,
      borderRadius: 24,
    },
    expanded: {
      width: "min(800px, 90%)",
      height: "400px",
      borderRadius: 24,
      transition: {
        width: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
        height: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.4, // Height waits for width to start/finish
        },
        borderRadius: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    },
  };

  // 2. FIXED: Removed "height" animation from children. 
  // Let the parent handle height. Children only animate opacity/position (GPU accelerated = no lag).
  const linksContainerVariants: Variants = {
    collapsed: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        staggerChildren: 0.04,
      },
    },
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.35,
        ease: "easeOut",
        staggerChildren: 0.06,
      },
    },
  };

  const linkVariants: Variants = {
    collapsed: {
      opacity: 0,
      y: -40,
      scale: 0.95,
    },
    expanded: {
      opacity: 1,
      y:0,
      scale: 1,
      transition: {
        opacity: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
        x: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
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

  return (
    <div className="fixed z-10 flex justify-end w-full mt-2 pr-2">
      <motion.nav
        layout // 3. MAGIC PROP: Helps Framer Motion smoothly interpolate "height: auto" without layout thrashing
        variants={menuVariants}
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        className="glass rounded-full dark:border-0 overflow-hidden relative"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 h-11.5">
          <motion.div
            className="flex items-center space-x-2"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-7 h-7 bg-linear-to-b from-green-400 to-green-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold">
              T
            </div>
          </motion.div>

          <motion.button
            onClick={toggleMenu}
            className="flex flex-col space-y-1.5 p-1 rounded-lg transition-colors relative z-10"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              variants={topBarVariants}
              animate={isOpen ? "expanded" : "collapsed"}
              className="block w-6 h-0.5 bg-black dark:bg-white rounded-full origin-center"
            />
            <motion.span
              variants={middleBarVariants}
              animate={isOpen ? "expanded" : "collapsed"}
              className="block w-6 h-0.5 bg-black dark:bg-white rounded-full origin-center"
            />
            <motion.span
              variants={bottomBarVariants}
              animate={isOpen ? "expanded" : "collapsed"}
              className="block w-6 h-0.5 bg-black dark:bg-white rounded-full origin-center"
            />
          </motion.button>
        </div>

        {/* Grid Container */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              // 4. FIXED GRID: Added gap and proper padding for vertical space
              className="grid grid-cols-2 gap-x-6 gap-y-4 px-4 pt-2"
            >
              {/* Column 1 */}
              <motion.div
                variants={linksContainerVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-black space-y-1.5"
              >
                {["Page →", "Home", "About", "Services", "Contact"].map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      variants={linkVariants}
                      href="#"
                      className={`block ${
                        index > 0 ? "nav-links text-lg" : "text-md font-semibold"
                      } px-3 py-2.5 rounded-lg transition-all duration-200`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </motion.a>
                  )
                )}
                
              </motion.div>

              {/* Column 2 */}
              <motion.div
                variants={linksContainerVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-black space-y-1.5"
              >
                
                {["Quick Link →", "Projects", "Technologies", "About", "Contact"].map(
                  (item, index) => (
                    <motion.a
                      key={item}
                      variants={linkVariants}
                      href="#"
                      className={`block ${
                        index > 0 ? "nav-links text-lg" : "text-md font-semibold"
                      } px-3 py-2.5 rounded-lg transition-all duration-200 `}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </motion.a>
                  )
                )}
                
              </motion.div>

              {/* 5. FIXED: ThemeToggle now spans both columns so it doesn't break the grid layout */}
              <div className="col-span-2 flex justify-end pt-2 pr-2">
                <ThemeToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavBar;