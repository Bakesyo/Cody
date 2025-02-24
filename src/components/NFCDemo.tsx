import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../providers/ThemeProvider';

export default function NFCDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { theme } = useTheme();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      className="nfc-demo-container"
    >
      <div className="nfc-visualization">
        <canvas ref={canvasRef} id="nfc-canvas" />
        <div className="data-streams" />
      </div>
      <div className="demo-overlay">
        <motion.div
          className="demo-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="glitch-text">NFC Innovation</h1>
          <p className="demo-instruction">Tap or hover to interact with NFC field</p>
          <div className="connection-status">
            <span className="status-dot" />
            <span className="status-text">Initializing NFC Field...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 