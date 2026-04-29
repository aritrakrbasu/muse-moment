import React from "react";
import { motion } from "framer-motion";
import { X, Users, Heart, Flame, Clock, Award } from "lucide-react";

const HowToPlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors"
        >
          <X size={20} strokeWidth={1} />
        </button>

        <div className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif italic tracking-tight text-rose-500">
              How to Play
            </h2>
            <p className="text-zinc-500 text-sm">
              The ultimate "Do or Drink" party game
            </p>
          </div>

          {/* Game Modes */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.4em] text-zinc-400 font-bold">
              Choose Your Mode
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/30 border border-cyan-900/20">
                <Users className="text-cyan-500 mb-2" size={20} strokeWidth={1} />
                <h4 className="font-medium text-sm mb-1">BFF</h4>
                <p className="text-xs text-zinc-500">
                  Fun & silly dares with friends. Maximum chaos, zero awkwardness.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/30 border border-pink-900/20">
                <Heart className="text-pink-500 mb-2" size={20} strokeWidth={1} />
                <h4 className="font-medium text-sm mb-1">Date</h4>
                <p className="text-xs text-zinc-500">
                  Flirty challenges to build chemistry and tension.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/30 border border-rose-900/20">
                <Flame className="text-rose-500 mb-2" size={20} strokeWidth={1} />
                <h4 className="font-medium text-sm mb-1">Couples</h4>
                <p className="text-xs text-zinc-500">
                  Intense dares for established couples. 4-phase journey to climax.
                </p>
              </div>
            </div>
          </div>

          {/* How to Play */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-[0.4em] text-zinc-400 font-bold">
              The Rules
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-rose-900/20 flex items-center justify-center flex-shrink-0 text-rose-500 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Select Players</h4>
                  <p className="text-xs text-zinc-500">
                    Add names (and gender for BFF mode). Choose how many turns you want to play.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-rose-900/20 flex items-center justify-center flex-shrink-0 text-rose-500 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Draw Cards</h4>
                  <p className="text-xs text-zinc-500">
                    Each turn, you'll receive an AI-generated dare with a time limit and drink penalty.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-rose-900/20 flex items-center justify-center flex-shrink-0 text-rose-500 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Do It or Drink</h4>
                  <p className="text-xs text-zinc-500">
                    Complete the dare before time runs out, or take the drink penalty.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-rose-900/20 flex items-center justify-center flex-shrink-0 text-rose-500 font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Progressive Intensity</h4>
                  <p className="text-xs text-zinc-500">
                    Dares get bolder as the game progresses. Each mode has its own journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.4em] text-zinc-400 font-bold">
              Game Features
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock size={14} strokeWidth={1} />
                Adjustable turn count (5-50)
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Award size={14} strokeWidth={1} />
                Difficulty levels (1-3 sips)
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Users size={14} strokeWidth={1} />
                2-6 players supported
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Award size={14} strokeWidth={1} />
                Redraw if you hate a card
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-800">
            <p className="text-xs text-zinc-500 text-center">
              🔒 <span className="text-zinc-400">Privacy:</span> Your game data stays on your device. We don't store your cards, stats, or personal information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-rose-600 text-white rounded-full text-xs uppercase tracking-[0.4em] font-bold hover:bg-rose-500 transition-all"
          >
            Got It, Let's Play
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToPlay;
