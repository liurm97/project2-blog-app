// Overlay upon initial loading

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({ isLoadingVisible }) {
  return (
    <AnimatePresence>
      {isLoadingVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="bg-teal-700 w-screen h-screen absolute flex flex-col justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 50,
              duration: 0.2,
            }}
            exit={{ opacity: 0, x: -60, transition: { duration: 0.4 } }}
            className="font-medium uppercase tracking-[0.3rem] text-3xl"
          >
            Sincerely
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1,
            }}
            exit={{ opacity: 0, x: 60, transition: { duration: 0.4 } }}
            className="mt-2 text-gray-300"
          >
            Posts that come to life.
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
