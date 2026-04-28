import React from "react";
import { motion } from "framer-motion";
import { GAME_MODES } from "../../config/modes";

const InventorySelector = ({ setup, onUpdateSetup, onStart }) => {
  const toyOptions =
    GAME_MODES[setup.gameMode]?.inventoryOptions ||
    GAME_MODES.couples.inventoryOptions;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="text-center">
        <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-zinc-600">
          Resources
        </span>
        <h2 className="text-2xl font-light mt-2">
          Available Inventory
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {toyOptions.map((t) => (
          <button
            key={t}
            onClick={() =>
              onUpdateSetup((prev) => ({
                ...prev,
                toys: prev.toys.includes(t)
                  ? prev.toys.filter((x) => x !== t)
                  : [...prev.toys, t],
              }))
            }
            className={`px-8 py-3 rounded-full border text-[9px] uppercase tracking-widest font-bold transition-all ${
              setup.toys.includes(t)
                ? "bg-rose-500 border-rose-500 text-white"
                : "border-white/5 text-zinc-500 hover:border-white/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <button
        onClick={onStart}
        className="w-full py-6 bg-white text-black rounded-full font-bold uppercase text-[10px] tracking-[0.6em]"
      >
        Initiate
      </button>
    </motion.div>
  );
};

export default InventorySelector;
