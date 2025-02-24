import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <motion.div
        className="loading-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="nfc-animation">
          <div className="nfc-ring"></div>
          <div className="nfc-ring"></div>
          <div className="nfc-ring"></div>
        </div>
        <div className="loading-text">
          <span className="text-animate">Initializing NFC Connection</span>
          <div className="loading-status" style={{ width: `${progress}%` }}></div>
        </div>
      </motion.div>
    </div>
  );
} 