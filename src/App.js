import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  RefreshCcw,
  ChevronRight,
  Flame,
  Heart,
  RotateCcw,
  Play,
  Clock,
  Download,
} from "lucide-react";
import { generateKinkyCard } from "./services/ai";

const App = () => {
  // --- SESSION STATE ---
  const [gameState, setGameState] = useState("onboarding"); // onboarding, playing, complete
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [setup, setSetup] = useState({
    manName: "Aritra", //
    womanName: "Ms. Ghosh", //
    toys: [],
  });

  const [totalTurns, setTotalTurns] = useState(20);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentCard, setCurrentCard] = useState("");
  const [history, setHistory] = useState([]);
  const [regenSeed, setRegenSeed] = useState(0); // Fixes the repetition on regenerate

  // --- PULSE TIMER STATE ---
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef(null);
  // Function to generate a synthesized beep without external files
  const playEndBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // High-pitched beep
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2); // 200ms duration
  };

  // Function for haptic feedback pulse
  const triggerHaptic = (duration = 100) => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(duration);
    }
  };
  const toyOptions = [
    "Silk Ties",
    "Ice Cubes",
    "Leather Crop",
    "Blindfold",
    "Handcuffs",
    "Soft Feathers",
    "Lubricant",
    "Spanking Paddle",
    "Vibrator",
    "Restraints",
    "Drip Wax",
    "Anal Plug",
  ]; // Expanded Toolbox

  // --- HELPERS ---
  const extractSeconds = (text, isLast) => {
    if (isLast) return null;
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 30;
  };
  const isFinalCard = currentTurn - 1 === totalTurns;
  const startPulseTimer = () => {
    setIsTimerActive(true);

    // Initial haptic to signal the start of the dare
    triggerHaptic(200);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // THE FINISH LINE
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);

          // Final feedback
          playEndBeep();
          triggerHaptic([100, 50, 100]); // "Double-pulse" vibration

          return 0;
        }

        // ACTIVE PULSE: Sync haptic with the 1s interval
        triggerHaptic(50);

        return prev - 1;
      });
    }, 1000);
  };

  // --- ENGINE LOGIC ---
  // Inside your App.jsx component logic

  const handleNextTurn = async (forceTurn) => {
    const turn = forceTurn || currentTurn;
    if (turn > totalTurns) {
      setGameState("complete");
      return;
    }

    setLoading(true);

    // 1. ENTROPY INJECTION: Generate a random salt for every single turn.
    // This ensures that "Turn 1" today is different from "Turn 1" tomorrow.
    const randomSalt = Math.floor(Math.random() * 50);

    try {
      // Calling your working function exactly as it is
      const card = await generateKinkyCard(
        turn,
        totalTurns,
        setup,
        history,
        randomSalt, // We pass the salt here to break the repetition loop
      );

      setCurrentCard(card);
      setHistory((prev) => [card, ...prev].slice(0, 10));
      setCurrentTurn(turn + 1);

      // Reset the local regeneration counter for the new turn
      setRegenSeed(0);
    } catch (err) {
      console.error("Story Engine Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. UPDATED REGENERATE LOGIC
  const handleRegenerate = async () => {
    setLoading(true);

    // Increment the seed to force the AI to provide a different action than the current one
    const nextSeed = regenSeed + 1;

    try {
      const newCard = await generateKinkyCard(
        currentTurn - 1,
        totalTurns,
        setup,
        history.slice(1), // Exclude the card we are currently rejecting
        nextSeed,
      );

      setCurrentCard(newCard);
      setHistory((prev) => [newCard, ...prev.slice(1)]);
      setRegenSeed(nextSeed); // Save the seed state
    } catch (err) {
      console.error("Regeneration Failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleToy = (toy) => {
    setSetup((prev) => ({
      ...prev,
      toys: prev.toys.includes(toy)
        ? prev.toys.filter((t) => t !== toy)
        : [...prev.toys, toy],
    }));
  };

  // --- 1. ONBOARDING SCREEN ---
  if (gameState === "onboarding") {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-rose-600">
        <AnimatePresence mode="wait">
          {step <= 1 && (
            <motion.div
              key="id"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center w-full max-w-xl"
            >
              <span className="text-rose-600 text-[10px] tracking-[0.6em] uppercase font-black mb-4 block">
                Identity
              </span>
              <h2 className="text-xl text-zinc-500 mb-8">
                Name of the {step === 0 ? "Man" : "Woman"}:
              </h2>
              <input
                value={step === 0 ? setup.manName : setup.womanName}
                onChange={(e) =>
                  step === 0
                    ? setSetup({ ...setup, manName: e.target.value })
                    : setSetup({ ...setup, womanName: e.target.value })
                }
                className="bg-transparent border-b border-rose-900/40 text-5xl text-center outline-none py-4 font-serif italic w-full focus:border-rose-600 transition-all"
              />
              <button
                onClick={() => setStep(step + 1)}
                className="mt-16 group flex items-center gap-2 mx-auto text-zinc-600 hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] font-bold"
              >
                Continue <ChevronRight size={14} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="dur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center w-full max-w-md"
            >
              <span className="text-rose-600 text-[10px] tracking-[0.6em] uppercase font-black mb-8 block">
                Duration
              </span>
              <div className="flex flex-col gap-3">
                {[10, 20, 30].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setTotalTurns(n);
                      setStep(3);
                    }}
                    className="py-6 border border-white/5 rounded-2xl text-lg font-black hover:bg-white hover:text-black transition-all"
                  >
                    {n} CARDS
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="inv"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full max-w-2xl"
            >
              <span className="text-rose-600 text-[10px] tracking-[0.6em] uppercase font-black mb-4 block">
                Inventory
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-12 h-[45vh] overflow-y-auto px-4">
                {toyOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleToy(t)}
                    className={`py-5 rounded-xl border text-[9px] tracking-widest uppercase font-black transition-all ${setup.toys.includes(t) ? "bg-rose-600 text-white border-rose-600" : "border-white/5 text-zinc-600"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setGameState("playing");
                  handleNextTurn(1);
                }}
                className="w-full py-8 bg-white text-black font-black rounded-full tracking-[0.5em] uppercase text-[11px] hover:bg-rose-600 hover:text-white transition-all"
              >
                Start Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- 2. GAMEPLAY SCREEN ---
  if (gameState === "playing") {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-between p-8 md:p-16">
        <header className="w-full flex justify-between items-end border-b border-white/5 pb-8 max-w-6xl">
          <div className="flex flex-col">
            <span className="text-rose-600 text-[9px] font-black tracking-[0.4em] uppercase mb-1">
              Step
            </span>
            <span className="text-5xl font-black">
              {currentTurn - 1}
              <span className="text-zinc-800 text-xl">/{totalTurns}</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-zinc-600 text-[9px] font-bold tracking-[0.4em] uppercase mb-1">
              Actor
            </span>
            <p className="text-xl font-serif italic text-zinc-200">
              {(currentTurn - 1) % 2 !== 0 ? setup.manName : setup.womanName}
            </p>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-4xl py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center"
            >
              {loading ? (
                <Flame className="text-rose-900 animate-pulse" size={60} />
              ) : (
                <>
                  <h2 className="text-4xl md:text-6xl font-serif italic font-bold mb-16 text-zinc-100">
                    {currentCard}
                  </h2>

                  {/* PULSE TIMER COMPONENT */}
                  {!isFinalCard ? (
                    <div className="relative flex flex-col items-center">
                      <AnimatePresence>
                        {isTimerActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.4, scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-rose-600 rounded-full blur-[80px]"
                          />
                        )}
                      </AnimatePresence>

                      <div className="relative z-10 flex flex-col items-center gap-8">
                        <div className="text-8xl font-black tracking-tighter tabular-nums flex items-center gap-4">
                          {timeLeft}
                          <span className="text-2xl text-zinc-800 font-bold uppercase tracking-widest">
                            Sec
                          </span>
                        </div>

                        {!isTimerActive ? (
                          <button
                            onClick={startPulseTimer}
                            className="flex items-center gap-3 bg-rose-600 px-12 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-rose-500 transition-all shadow-xl shadow-rose-900/20"
                          >
                            <Play size={14} fill="currentColor" /> Start Pulse
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 text-rose-600 animate-pulse font-black uppercase tracking-[0.5em] text-[10px]">
                            <Zap size={12} fill="currentColor" /> Action Pulsing
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <button
                    onClick={handleRegenerate}
                    className="mt-16 flex items-center gap-2 text-zinc-800 hover:text-rose-600 transition-colors uppercase tracking-[0.3em] text-[8px] font-black"
                  >
                    <RefreshCcw size={12} /> Regenerate Action
                  </button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="w-full max-w-sm">
          <button
            onClick={() => handleNextTurn()}
            disabled={loading || isTimerActive}
            className="w-full bg-white text-black py-8 rounded-full font-black text-[11px] tracking-[0.5em] uppercase disabled:opacity-10"
          >
            {currentTurn > totalTurns ? "End Journey" : "Next Command"}
          </button>
        </footer>
      </div>
    );
  }

  // --- 3. COMPLETION SCREEN ---
  if (gameState === "complete") {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 text-center">
        <Flame size={100} className="text-rose-600 mb-8" strokeWidth={0.5} />
        <h1 className="text-5xl font-serif italic font-bold mb-4">
          The Climax.
        </h1>
        <p className="text-zinc-500 text-lg mb-12">
          The session for {setup.manName} and {setup.womanName} has concluded.
        </p>
        <button
          onClick={() => setGameState("souvenir")}
          className="flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full text-[10px] tracking-[0.4em] uppercase font-black"
        >
          <RotateCcw size={14} /> Review your story
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-3 px-12 py-6 mt-4 bg-white text-black rounded-full text-[10px] tracking-[0.4em] uppercase font-black"
        >
          <RotateCcw size={14} /> New Story
        </button>
      </div>
    );
  }

  if (gameState === "souvenir") {
    return (
      <div className="min-h-screen bg-[#050505] text-white p-8 md:p-16 font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header: Personalized Title */}
          <header className="text-center mb-20">
            <span className="text-[10px] tracking-[0.8em] uppercase font-black text-cyan-400 mb-4 block">
              A Recorded Journey
            </span>
            <h1 className="text-5xl md:text-7xl font-serif italic font-bold tracking-tighter mb-4">
              {setup.manName} & {setup.womanName}
            </h1>
            <p className="text-zinc-500 font-light tracking-widest uppercase text-[10px]">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </header>

          {/* The Timeline: Chronological Dares */}
          <div className="relative border-l border-zinc-900 ml-4 md:ml-0 md:pl-0">
            {[...history].reverse().map((card, idx) => {
              const turnNum = idx + 1;
              const progress = turnNum / totalTurns;

              // Phase Detection for Visual Cues
              let phaseColor = "bg-zinc-800";
              let phaseLabel = "Seduction";
              if (progress > 0.25) {
                phaseColor = "bg-cyan-900";
                phaseLabel = "Intimacy";
              }
              if (turnNum > totalTurns - 3) {
                phaseColor = "bg-rose-900";
                phaseLabel = "Climax";
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-16 relative pl-10"
                >
                  {/* Timeline Node */}
                  <div
                    className={`absolute left-[-5px] top-2 w-[10px] h-[10px] rounded-full ${phaseColor} ring-4 ring-[#050505]`}
                  />

                  <span className="text-[9px] font-black tracking-widest text-zinc-700 uppercase block mb-2">
                    Step {turnNum} — {phaseLabel}
                  </span>
                  <p className="text-xl md:text-2xl font-serif italic font-medium text-zinc-300 leading-relaxed">
                    "{card}"
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row gap-6 justify-center">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-3 px-10 py-5 border border-cyan-900/30 rounded-full text-[10px] tracking-[0.4em] uppercase font-black hover:bg-cyan-900/20 transition-all text-cyan-400"
            >
              <Download size={14} /> Save Souvenir
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-3 px-10 py-5 bg-zinc-100 text-black rounded-full text-[10px] tracking-[0.4em] uppercase font-black hover:bg-white transition-all"
            >
              <RotateCcw size={14} /> New Story
            </button>
          </footer>
        </motion.div>
      </div>
    );
  }
};;

export default App;
