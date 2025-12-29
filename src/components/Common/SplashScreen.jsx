import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import threadsBlackLogo from "@assets/threads-black-logo.svg";
import threadsWhiteLogo from "@assets/threads-white-logo.svg";

const SplashScreen = ({ duration = 1500 }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? threadsWhiteLogo : threadsBlackLogo;

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
      setTimeout(() => {
        setShowSplash(false);
      }, duration);
    }
  }, [duration]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="bg-background fixed inset-0 z-9999 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src={logoSrc}
            alt="Threads"
            className="h-20 w-20 object-contain"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 14,
              mass: 0.6,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
