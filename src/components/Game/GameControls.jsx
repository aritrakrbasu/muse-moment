import React from "react";
import { motion } from "framer-motion";
import { Wine } from "lucide-react";

const GameControls = ({
  card,
  loading,
  isTimerActive,
  onDoIt,
  onDrink,
  onNext,
}) => {
  return (
    <footer className="mt-10 max-w-lg mx-auto w-full">
      {card.actionTaken ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onNext}
          className="w-full py-8 bg-white text-black rounded-full font-bold text-[10px] tracking-[0.6em] uppercase hover:bg-rose-600 hover:text-white transition-all shadow-xl"
        >
          Next Phase
        </motion.button>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={onDoIt}
            disabled={loading || isTimerActive}
            className="py-6 border border-white/5 bg-white/[0.02] rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all disabled:opacity-10"
          >
            Accept
          </button>
          <button
            onClick={onDrink}
            className="py-6 bg-rose-600 text-white rounded-full text-[10px] font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-3 hover:bg-rose-500 transition-all"
          >
            <Wine size={14} /> Drink {card.difficulty || 1}
          </button>
        </div>
      )}
    </footer>
  );
};

export default GameControls;
