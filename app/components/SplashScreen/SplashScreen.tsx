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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]"
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
            animate={{ opacity: startExit ? 0 : 0.55 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-[#0b1a2b]" />
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
              <span className="text-[#EAF6FF]">Hi,</span>
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
              <span className="text-[#EAF6FF]">I'm </span>
              <span className="text-[#EAF6FF]">Dwiponco Suripto</span>
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
              <span className="text-[#47bbde] font-bold">
                Welcome to my portofolio
              </span>
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
              className="h-1 bg-gradient-to-r from-transparent via-[#EAF6FF] to-transparent mt-8 mx-auto max-w-md"
              style={{ originX: 0.5 }}
            />
          </div>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: startExit ? 0 : [0.2, 1, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#EAF6FF] shadow-[0_0_10px_rgba(234,246,255,0.95)]" />
            <div className="w-2 h-2 rounded-full bg-[#3FA9C9] shadow-[0_0_12px_rgba(63,169,201,0.95)]" />
            <div className="w-2 h-2 rounded-full bg-[#EAF6FF]/85 shadow-[0_0_10px_rgba(234,246,255,0.8)]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
