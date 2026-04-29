import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check } from "lucide-react";

const CompletionScreen = ({ gameStats, history, onRestart, onExport }) => {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const completionRate = Math.round(
      (gameStats.daresCompleted / (gameStats.daresCompleted + gameStats.drinksTaken)) * 100
    );

    return `🎯 I survived Muse Moment!\n\n` +
      `✅ Completed: ${gameStats.daresCompleted} dares\n` +
      `🍺 Refused: ${gameStats.drinksTaken} times\n` +
      `💧 Total sips: ${gameStats.totalSips}\n` +
      `📊 Completion rate: ${completionRate}%\n\n` +
      `Think you can do better? Challenge accepted! 👇\n` +
      `https://aritrakrbasu.github.io/muse-moment/`;
  };

  const handleShare = async () => {
    const text = generateShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Muse Moment - Game Complete",
          text: text,
          url: "https://aritrakrbasu.github.io/muse-moment/",
        });
      } catch (err) {
        // User cancelled or sharing failed, fallback to copy
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completionRate = Math.round(
    (gameStats.daresCompleted / (gameStats.daresCompleted + gameStats.drinksTaken)) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16 py-12 px-4"
    >
      {/* Screenshot-worthy Header */}
      <div className="text-center space-y-6 pb-8 border-b border-white/5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block"
        >
          <div className="text-8xl mb-4">🏆</div>
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-serif italic tracking-tight bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
          Session Complete
        </h1>
        <p className="text-zinc-600 font-bold uppercase tracking-[0.6em] text-[9px]">
          Muse Moment
        </p>
        <div className="pt-4">
          <span className="text-5xl font-bold tabular-nums text-rose-500">{completionRate}%</span>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2">Completion Rate</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 py-8">
        {[
          { label: "Completed", val: gameStats.daresCompleted, emoji: "✅" },
          { label: "Refused", val: gameStats.drinksTaken, emoji: "🍺" },
          { label: "Total Sips", val: gameStats.totalSips, emoji: "💧" },
        ].map((s) => (
          <div key={s.label} className="text-center space-y-3 p-4 rounded-2xl bg-zinc-900/30 border border-white/5">
            <span className="text-2xl">{s.emoji}</span>
            <div>
              <span className="block text-3xl md:text-4xl font-light tabular-nums text-white">
                {s.val}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold">
                {s.label}
              </span>
            </div>
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

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-8">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-4 bg-rose-600 text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-rose-500 transition-all"
          >
            <Share2 size={14} strokeWidth={1} />
            Share Results
          </button>
          <button
            onClick={onExport}
            className="flex items-center justify-center gap-2 py-4 border border-white/5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/[0.03] transition-all"
          >
            <Download size={14} strokeWidth={1} />
            Save as PDF
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={() => {
            const link = "https://aritrakrbasu.github.io/muse-moment/";
            navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center justify-center gap-2 py-3 border border-zinc-800 rounded-full text-xs uppercase tracking-[0.2em] text-zinc-600 hover:text-white hover:border-zinc-700 transition-all"
        >
          {copied ? <Check size={14} strokeWidth={1} /> : <Copy size={14} strokeWidth={1} />}
          {copied ? "Link Copied!" : "Copy Challenge Link"}
        </button>

        <button
          onClick={onRestart}
          className="w-full py-6 bg-white text-black rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-rose-600 hover:text-white transition-all"
        >
          Play Again
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="text-center pt-8 pb-4">
        <p className="text-[9px] text-zinc-700 uppercase tracking-[0.3em]">
          🔒 Your game data stays private. We don't store your information.
        </p>
      </div>
    </motion.div>
  );
};

export default CompletionScreen;
