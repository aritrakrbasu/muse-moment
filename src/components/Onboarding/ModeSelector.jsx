import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Heart, Flame, ArrowUpRight } from "lucide-react";
import { GAME_MODES } from "../../config/modes";

const ModeSelector = ({ onSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      {/* Header Section */}
      <div className="text-center mb-20 space-y-4">
        <motion.span
          variants={itemVariants}
          className="text-[10px] tracking-[0.6em] uppercase font-bold text-rose-500/80 block"
        >
          Neural Interface v2.0
        </motion.span>
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extralight tracking-tighter text-white"
        >
          Select <span className="italic font-serif">Narrative</span>
        </motion.h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.values(GAME_MODES).map((mode) => (
          <motion.button
            key={mode.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(mode.id)}
            className="group relative p-10 rounded-[2rem] border border-white/5 bg-zinc-950/40 backdrop-blur-xl overflow-hidden transition-colors hover:border-rose-500/30 text-left"
          >
            {/* Animated Background Glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-rose-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-8">
              {/* Icon & Arrow Header */}
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-rose-500/50 group-hover:text-rose-500 transition-all duration-500 shadow-2xl">
                  {getIcon(mode.id)}
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-zinc-700 group-hover:text-rose-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-lg font-medium tracking-widest uppercase mb-3 text-zinc-200 group-hover:text-white transition-colors">
                  {mode.name}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light line-clamp-3 group-hover:text-zinc-400">
                  {mode.description}
                </p>
              </div>

              {/* Progress/Difficulty Indicator (Visual Flavor) */}
              <div className="pt-4 flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-[2px] w-8 rounded-full transition-all duration-700 ${
                      i <= (mode.intensity || 2)
                        ? "bg-rose-500/40"
                        : "bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Helper to keep the JSX clean
const getIcon = (id) => {
  switch (id) {
    case "bff":
      return <Users size={22} strokeWidth={1.5} />;
    case "date":
      return <Heart size={22} strokeWidth={1.5} />;
    default:
      return <Flame size={22} strokeWidth={1.5} />;
  }
};

export default ModeSelector;
