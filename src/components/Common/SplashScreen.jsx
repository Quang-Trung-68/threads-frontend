import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const SplashScreen = ({ duration = 1500 }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  console.log(isDark);
  const logoSrc = isDark
    ? "/src/assets/threads-logo-white.svg"
    : "/src/assets/threads-logo-black.svg";

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
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.img
            src={logoSrc}
            alt="Logo"
            className="h-20 w-20 object-contain"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 0.5,
              exit: { duration: 0.5 },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
