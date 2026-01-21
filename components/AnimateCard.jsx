"use client";
import { motion } from "motion/react";

export function AnimatedCard({ children }) {
  return (
    <motion.div
      className="h-fit w-fit"
      initial={{ rotateY: 0 }}
      viewport={{ once: true }}
      whileInView={{ rotateY: 360 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      style={{ perspective: 1000 }} // Gives the 3D rotation depth
    >
      {children}
    </motion.div>
  );
}
