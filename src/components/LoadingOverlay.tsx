// Overlay upon initial loading

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect } from "react";

export default function LoadingOverlay({
  isLoadingVisible,
}: {
  isLoadingVisible: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    setTimeout(() => animate(count, 100, { duration: 2 }), 1000);
  }, []);

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
              delay: 0.3,
              type: "spring",
              stiffness: 90,
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
              delay: 0.7,
            }}
            exit={{ opacity: 0, x: 60, transition: { duration: 0.4 } }}
            className="mt-2 text-gray-300"
          >
            Posts that come to life.
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 100,
            }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="mt-2 tracking-widest text-gray-400 font-medium"
          >
            {rounded}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
