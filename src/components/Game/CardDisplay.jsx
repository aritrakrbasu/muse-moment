import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import CardRating from "./CardRating";

const CardDisplay = ({
  card,
  loading,
  isFinalCard,
  timeLeft,
  isTimerActive,
  onRegenerate,
}) => {
  const extractSeconds = (text, isLast) => {
    if (isLast) return null;
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 30;
  };

  const currentSeconds = isTimerActive
    ? timeLeft
    : extractSeconds(card?.text || "", isFinalCard) || 0;

  return (
    /* Changed 'fixed inset-0' to 'relative' and 'h-[100dvh]' to 'min-h-screen' */
    <div className="relative  w-full bg-[#050505] text-white flex flex-col justify-between overflow-hidden select-none px-[8vw] py-[10vh]">
      {/* MAIN NARRATIVE */}
      <main className="flex-1 flex items-center justify-center text-center py-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[6vw] font-serif italic text-zinc-800 animate-pulse"
            >
              Syncing Session
            </motion.div>
          ) : (
            <motion.h2
              key={card?.text}
              initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(1.8rem,8vw,4.5rem)] font-serif italic leading-[1.1] tracking-tight text-zinc-100"
            >
              "{card?.text}"
            </motion.h2>
          )}
        </AnimatePresence>
      </main>

      {/* THE TIMEPIECE & ACTION */}
      <footer className="flex-none flex flex-col items-center gap-[6vh]">
        {!isFinalCard && (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[clamp(5rem,22vw,12rem)] font-extralight tabular-nums tracking-tighter leading-none text-white/90"
            >
              {currentSeconds}
            </motion.div>
            <div className="h-[1px] w-[15vw] bg-gradient-to-r from-transparent via-rose-900 to-transparent my-[1vh]" />
            <span className="text-[min(2.5vw,11px)] uppercase tracking-[0.6em] text-zinc-600 font-bold">
              Seconds
            </span>
          </div>
        )}

        <button
          onClick={onRegenerate}
          className="group relative  px-[6vw] flex flex-col items-center gap-[1vh] transition-all"
        >
          <div className="absolute inset-0 bg-white/[0.02] scale-x-0 group-active:scale-x-100 transition-transform duration-500 origin-center rounded-full" />
          <RefreshCcw
            size={16}
            strokeWidth={1}
            className="text-zinc-700 group-active:rotate-180 group-active:text-rose-800 transition-all duration-700"
          />
          <span className="relative z-10 text-[min(2.5vw,10px)] uppercase tracking-[0.5em] text-zinc-500 group-active:text-white transition-colors">
            Redraw Narrative
          </span>
        </button>

        {/* Card Rating - only show when not loading and not in timer */}
        <AnimatePresence mode="wait">
          {!loading && !isTimerActive && card?.text && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full"
            >
              <CardRating cardText={card.text} />
            </motion.div>
          )}
        </AnimatePresence>
      </footer>

      <style jsx>{`
        button {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default CardDisplay;
