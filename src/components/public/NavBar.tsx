import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ThemeToggle } from "./ThemToggle";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants: Variants = {
    collapsed: {
      width: 'min(400px,55%)',
      height: 46,
      borderRadius: 24,
      paddingLeft: 3,
      paddingRight: 2,
    },
    expanded: {
      width: 'min(800px,90%)', 
      height: "auto",
      borderRadius: 24,
      transition: {
        width: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
        height: {
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.3,
        },
        borderRadius: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    },
  };

  const linksContainerVariantsV1: Variants = {
    collapsed: {
      height: 0,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
    expanded: {
      height: "auto",
      transition: {
        duration: 0.35,
        ease: "easeOut",
        staggerChildren: 0.04,
      },
    },
  };

   const linksContainerVariantsV2: Variants = {
    collapsed: {
      height: 0,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
    expanded: {
      height: "auto",
      transition: {
        duration: 0.35,
        ease: "easeOut",
        staggerChildren: 0.04,
      },
    },
  };

  // Slide in from the right with simultaneous opacity & transform
  const linkVariants: Variants = {
    collapsed: {
      opacity: 0,
      x: -40,
      scale: 0.95,
    },
    expanded: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        opacity: { delay:0.3,duration: 0.8, ease:[0.4, 0, 0.2, 1] },
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
    <div className="fixed z-10 flex justify-end  w-full  mt-2 pr-2">
      
      <motion.nav
        variants={menuVariants}
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        className="glass  rounded-full  dark:border-0  overflow-hidden relative"
      >
        <div className="flex items-center justify-between px-4 pl-2 h-11.5">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 1 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <div className="w-7 h-7 bg-linear-to-b from-green-400 to-green-500  rounded-2xl flex items-center justify-center text-white text-xs font-bold">
              T
            </div>
            {/* <span className="font-semibold text-gray-700 text-sm">Logo</span> */}
          </motion.div>

          <motion.button
            onClick={toggleMenu}
            className="flex flex-col space-y-1.5 p-1  rounded-lg  transition-colors relative z-10"
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

        
        <div className=" grid grid-cols-2 p-8">
          <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={linksContainerVariantsV1}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              
                <div className="">
                  <p className=" text-black">Page →</p>

                  <div className=" pb-4 pt-1  text-black space-y-1.5 ">
                    {["Home", "About", "Services", "Contact"].map((item) => (
                      <motion.a
                        key={item}
                        variants={linkVariants}
                        href="#"
                        className="block nav-links px-3 py-2.5 text-lg rounded-lg transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </motion.a>
                    ))}
                  </div>
                </div>

              

            </motion.div>
          )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={linksContainerVariantsV2}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              

                <div>
                  <p className=" text-black">Quick Link →</p>
                  
                  <div className=" pb-4 pt-1   text-black space-y-1.5 ">
                    {["Projects", "Technologies", "About", "Contact"].map((item) => (
                      <motion.a
                        key={item}
                        variants={linkVariants}
                        href="#"
                        className="block nav-links px-3 py-2.5 text-lg rounded-lg transition-all duration-200 "
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </motion.a>
                    ))}
                  </div>
                </div>
              

            </motion.div>
          )}
          </AnimatePresence>

          <ThemeToggle/>
        </div>
        
      </motion.nav>
      
    </div>
  );
};

export default NavBar;