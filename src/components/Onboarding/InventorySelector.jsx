import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { GAME_MODES } from "../../config/modes";

const InventorySelector = ({ setup, onUpdateSetup, onStart }) => {
  const [customItem, setCustomItem] = useState("");

  const toyOptions =
    GAME_MODES[setup.gameMode]?.inventoryOptions ||
    GAME_MODES.couples.inventoryOptions;

  const allItems = [...toyOptions, ...(setup.customToys || [])];

  const handleAddCustom = () => {
    const trimmed = customItem.trim();
    if (trimmed && !allItems.includes(trimmed)) {
      onUpdateSetup((prev) => ({
        ...prev,
        toys: [...prev.toys, trimmed],
        customToys: [...(prev.customToys || []), trimmed],
      }));
      setCustomItem("");
    }
  };

  const handleRemoveCustom = (item) => {
    onUpdateSetup((prev) => ({
      ...prev,
      toys: prev.toys.filter((x) => x !== item),
      customToys: (prev.customToys || []).filter((x) => x !== item),
    }));
  };

  const isCustom = (item) => (setup.customToys || []).includes(item);

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
        <h2 className="text-2xl font-light mt-2">Available Inventory</h2>
      </div>

      {/* Custom Item Input */}
      <div className="flex items-center gap-3 justify-center">
        <input
          type="text"
          value={customItem}
          onChange={(e) => setCustomItem(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddCustom()}
          placeholder="Add custom item..."
          className="flex-1 max-w-xs bg-transparent border-b border-white/10 px-4 py-2 text-sm outline-none focus:border-red-900/50 transition-colors placeholder:text-zinc-800"
        />
        <button
          onClick={handleAddCustom}
          disabled={!customItem.trim() || allItems.includes(customItem.trim())}
          className="p-2 rounded-full border border-white/10 text-zinc-500 hover:border-red-900/50 hover:text-red-900 disabled:opacity-20 disabled:hover:border-white/10 disabled:hover:text-zinc-500 transition-all"
        >
          <Plus size={16} strokeWidth={1} />
        </button>
      </div>

      {/* Inventory Items */}
      <div className="flex flex-wrap justify-center gap-2">
        <AnimatePresence mode="popLayout">
          {allItems.map((t) => (
            <motion.button
              key={t}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() =>
                onUpdateSetup((prev) => ({
                  ...prev,
                  toys: prev.toys.includes(t)
                    ? prev.toys.filter((x) => x !== t)
                    : [...prev.toys, t],
                }))
              }
              className={`relative px-8 py-3 rounded-full border text-[9px] uppercase tracking-widest font-bold transition-all ${
                setup.toys.includes(t)
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-white/5 text-zinc-500 hover:border-white/20"
              }`}
            >
              {t}
              {isCustom(t) && setup.toys.includes(t) && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCustom(t);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black/50 text-white flex items-center justify-center text-[8px] hover:bg-black/70 transition-colors"
                >
                  ×
                </span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
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
