"use client"

import { motion } from "framer-motion"

export function FlameAnimation({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className={`flame-container ${isActive ? "active" : ""}`}>
      <motion.div
        className="flame-base"
        animate={
          isActive
            ? {
                scale: [1, 1.1, 1.2, 1.1, 1],
                opacity: [0.7, 0.8, 0.9, 0.8, 0.7],
              }
            : { scale: 1, opacity: 0.7 }
        }
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="flame-inner"
          animate={
            isActive
              ? {
                  scale: [1, 1.3, 1.5, 1.3, 1],
                  opacity: [0.6, 0.8, 1, 0.8, 0.6],
                }
              : { scale: 1, opacity: 0.6 }
          }
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <style jsx>{`
        .flame-container {
          position: relative;
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        
        .flame-container.active .flame-base {
          background: linear-gradient(to top, #FF3A2F, #FF7F41);
        }
        
        .flame-base {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          background: linear-gradient(to top, #FF3A2F80, #FF7F4180);
          filter: blur(2px);
        }
        
        .flame-inner {
          position: absolute;
          top: 20%;
          left: 20%;
          width: 60%;
          height: 60%;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          background: linear-gradient(to top, #FFD700, #FF4500);
          filter: blur(1px);
        }
      `}</style>
    </div>
  )
}
