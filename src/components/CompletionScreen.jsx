import React from "react";
import { motion } from "framer-motion";

const CompletionScreen = ({ gameStats, history, onRestart, onExport }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-24 py-12"
    >
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-serif italic tracking-tight">Fin.</h1>
        <p className="text-zinc-600 font-bold uppercase tracking-[0.6em] text-[9px]">
          Session Terminated Successfully
        </p>
      </div>

      <div className="grid grid-cols-3 border-y border-white/5 py-16">
        {[
          { label: "Completed", val: gameStats.daresCompleted },
          { label: "Refused", val: gameStats.drinksTaken },
          { label: "Units Consumed", val: gameStats.totalSips },
        ].map((s) => (
          <div key={s.label} className="text-center space-y-2">
            <span className="block text-4xl font-light tabular-nums">
              {s.val}
            </span>
            <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-16">
        <div className="text-center">
          <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-700 font-bold">
            Historical Narrative
          </span>
        </div>
        {history
          .slice()
          .reverse()
          .map((c, i) => (
            <div
              key={i}
              className="group flex gap-10 items-start opacity-30 hover:opacity-100 transition-opacity duration-500"
            >
              <span className="text-[9px] text-zinc-700 font-bold pt-2 tabular-nums">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <p className="text-xl font-light text-zinc-400 font-serif italic leading-relaxed">
                "{c.text}"
              </p>
            </div>
          ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-16">
        <button
          onClick={onExport}
          className="flex-1 py-6 border border-white/5 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white/[0.03] transition-all"
        >
          Export Souvenir
        </button>
        <button
          onClick={onRestart}
          className="flex-1 py-6 bg-white text-black rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-rose-600 hover:text-white transition-all"
        >
          New Sequence
        </button>
      </div>
    </motion.div>
  );
};

export default CompletionScreen;
