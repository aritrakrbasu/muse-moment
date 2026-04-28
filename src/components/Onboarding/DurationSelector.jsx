import React from "react";
import { motion } from "framer-motion";

const DurationSelector = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#050505] text-[#e5e5e5] flex flex-col overflow-hidden select-none">
      {/* 1. TOP SECURED HEADER */}
      <header className="flex-none p-8 pt-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1 border-l-2 border-rose-900 pl-4"
        >
          <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-zinc-600 block">
            Protocol 03
          </span>
          <h2 className="text-2xl font-light tracking-tight uppercase">
            Deck{" "}
            <span className="font-serif italic text-rose-900">Intensity</span>
          </h2>
        </motion.div>
      </header>

      {/* 2. VERTICAL INTERACTIVE DECK */}
      <main className="flex-1 flex flex-col justify-around px-8 py-4">
        {[10, 20, 30].map((n, i) => (
          <motion.button
            key={n}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => onSelect(n)}
            className="group relative flex items-center justify-between w-full py-6"
          >
            {/* Background Interaction Glow */}
            <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-active:opacity-100 transition-opacity rounded-xl" />

            <div className="flex flex-col items-start relative z-10">
              <span className="text-[10px] font-mono text-rose-900 mb-1 opacity-50 group-active:opacity-100">
                VOLUME_0{i + 1}
              </span>
              <span className="text-6xl md:text-8xl font-light tracking-tighter tabular-nums group-active:text-rose-600 transition-colors">
                {n}
              </span>
            </div>

            <div className="flex flex-col items-end relative z-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-4">
                Cards
              </span>
              {/* Stack Visualizer: Horizontal on mobile for better thumb alignment */}
              <div className="flex gap-1">
                {[...Array(i + 1)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-[2px] bg-zinc-800 group-active:bg-rose-900 transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Accent Line that grows on touch */}
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-zinc-900 w-full"
              whileTap={{ backgroundColor: "#4c0519" }}
            >
              <motion.div className="h-full bg-rose-900 w-0 group-hover:w-full transition-all duration-700" />
            </motion.div>
          </motion.button>
        ))}
      </main>

      {/* 3. STICKY SYSTEM FOOTER */}
      <footer className="flex-none p-8 pb-12 bg-gradient-to-t from-black to-transparent">
        <div className="flex justify-between items-end border-t border-white/5 pt-6">
          <div className="max-w-[150px]">
            <p className="text-[9px] leading-relaxed text-zinc-600 uppercase tracking-widest italic font-serif">
              The selection dictates the narrative depth of the encounter.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[8px] tracking-[0.3em] text-zinc-500 uppercase mb-1">
              Auth.Status
            </div>
            <div className="text-[10px] font-bold text-white tracking-widest uppercase">
              Awaiting_Touch
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Essential for mobile: removes the gray tap highlight box */
        button {
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default DurationSelector;
