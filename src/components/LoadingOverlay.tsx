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
    setTimeout(() => animate(count, 100, { duration: 2.3 }), 1000);
  }, []);

  return (
    <AnimatePresence>
      {isLoadingVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="bg-gradient-to-r from-[#1C0526] to-[#3c0a50] z-[100001] w-screen h-screen absolute flex flex-col justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              stiffness: 90,
              duration: 0.4,
            }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.6 } }}
            className="font-medium uppercase tracking-[0.3rem] text-3xl"
          >
            Jotter
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              type: "spring",
              stiffness: 90,
            }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.6 } }}
            className="mt-2 text-gray-400"
          >
            Posts that come to life.
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 90,
            }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="mt-2 tracking-widest text-[#923eb5] font-medium"
          >
            {rounded}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
