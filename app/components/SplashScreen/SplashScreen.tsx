"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showHi, setShowHi] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    // Start "Hi," animation after small delay
    const hiTimer = setTimeout(() => setShowHi(true), 300);

    // Start name animation
    const nameTimer = setTimeout(() => setShowName(true), 1200);

    // Start welcome animation
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 2200);

    // Start exit animation
    const exitTimer = setTimeout(() => setStartExit(true), 4500);

    // Hide splash screen
    const hideTimer = setTimeout(() => setIsVisible(false), 5500);

    return () => {
      clearTimeout(hiTimer);
      clearTimeout(nameTimer);
      clearTimeout(welcomeTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: startExit ? 0 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20" />
          </motion.div>

          {/* Content container */}
          <div className="relative z-10 text-center px-8">
            {/* "Hi," text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                showHi
                  ? {
                      opacity: startExit ? 0 : 1,
                      y: startExit ? -20 : 0,
                      transition: {
                        opacity: { duration: startExit ? 0.5 : 0.6 },
                        y: { duration: startExit ? 0.5 : 0.6 },
                      },
                    }
                  : {}
              }
              className="text-5xl md:text-7xl font-light mb-6"
            >
              <span className="text-white">Hi,</span>
            </motion.div>

            {/* "I'm Dwiponco Suripto" text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                showName
                  ? {
                      opacity: startExit ? 0 : 1,
                      y: startExit ? -20 : 0,
                      transition: {
                        opacity: { duration: startExit ? 0.5 : 0.8 },
                        y: { duration: startExit ? 0.5 : 0.8 },
                      },
                    }
                  : {}
              }
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              <span className="text-white">I'm </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Dwiponco Suripto
              </span>
            </motion.div>

            {/* "Welcome to my portofolio" text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                showWelcome
                  ? {
                      opacity: startExit ? 0 : 1,
                      y: startExit ? -20 : 0,
                      transition: {
                        opacity: { duration: startExit ? 0.5 : 0.8 },
                        y: { duration: startExit ? 0.5 : 0.8 },
                      },
                    }
                  : {}
              }
              className="text-xl md:text-3xl font-light"
            >
              <span className="text-cyan-300">Welcome to my portofolio</span>
            </motion.div>

            {/* Animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={
                showWelcome
                  ? {
                      scaleX: startExit ? 0 : 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.3,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
              className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-8 mx-auto max-w-md"
              style={{ originX: 0.5 }}
            />
          </div>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: startExit ? 0 : [0, 0.5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-2 h-2 rounded-full bg-purple-600" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
