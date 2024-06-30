"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const HoverMotion = ({ children }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1.0 }}
      className="items-center flex-col flex justify-center"
    >
      {children}
    </motion.div>
  );
};

export default HoverMotion;
