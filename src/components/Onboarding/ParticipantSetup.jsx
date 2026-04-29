import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const ParticipantSetup = ({
  gameMode,
  setup,
  onUpdateSetup,
  onContinue,
  onBack,
}) => {
  const [attemptedContinue, setAttemptedContinue] = useState(false);

  const isInvalid =
    gameMode === "bff"
      ? setup.tempPlayers.some((p) => !p.name.trim())
      : !setup.manName.trim() || !setup.womanName.trim();

  const handleContinue = () => {
    if (isInvalid) {
      setAttemptedContinue(true);
      return;
    }
    onContinue();
  };

  return (
    <div className="fixed inset-0 bg-[#080808] text-[#e5e5e5] flex flex-col items-center justify-between py-16 px-8 overflow-hidden font-light">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 text-zinc-400 hover:text-red-900 transition-all flex items-center gap-2 group"
      >
        <ArrowLeft
          size={16}
          strokeWidth={1}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-[10px] uppercase tracking-[0.2em]">Back</span>
      </button>

      <div className="fixed inset-0 overflow-hidden pointer-events-none" />
      {/* 1. THE ARCHIVAL HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-4"
      >
        <span className="text-[12px] tracking-[0.4em] font-bold uppercase text-zinc-300 block mb-2">
          Entry Protocol
        </span>
        <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight">
          The <span className="text-red-800">Cast</span>
        </h1>
      </motion.header>

      {/* 2. THE FLOATING INPUT STAGE */}
      <main className="w-full max-w-lg flex-1 flex flex-col justify-center overflow-hidden">
        <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden no-scrollbar py-10 px-2">
          {gameMode === "bff" ? (
            <div className="space-y-12">
              <AnimatePresence mode="popLayout">
                {setup.tempPlayers.map((p, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="relative group border-b border-white/5 pb-2"
                  >
                    <div className="flex items-end gap-3 min-w-0">
                      <span className="text-[10px] font-serif italic text-zinc-700 mb-2 flex-shrink-0">
                        {i + 1}.
                      </span>
                      <input
                        value={p.name}
                        onChange={(e) => {
                          const newP = [...setup.tempPlayers];
                          newP[i].name = e.target.value;
                          if (attemptedContinue && e.target.value.trim()) {
                            setAttemptedContinue(false);
                          }
                          onUpdateSetup({ ...setup, tempPlayers: newP });
                        }}
                        placeholder="Name"
                        className={`flex-1 min-w-0 bg-transparent text-2xl font-serif italic outline-none placeholder:text-zinc-900 group-focus-within:placeholder:text-zinc-800 transition-all ${
                          attemptedContinue && !p.name.trim()
                            ? "placeholder:text-red-900"
                            : ""
                        }`}
                      />
                      <button
                        onClick={() => {
                          const newP = [...setup.tempPlayers];
                          newP[i].gender =
                            p.gender === "male" ? "female" : "male";
                          onUpdateSetup({ ...setup, tempPlayers: newP });
                        }}
                        className={`flex-shrink-0 text-[9px] uppercase tracking-[0.3em] mb-2 px-4 py-2 rounded-sm border transition-all ${
                          p.gender === "male"
                            ? "border-cyan-900/50 text-cyan-700 hover:bg-cyan-900/20 hover:border-cyan-900"
                            : "border-pink-900/50 text-pink-700 hover:bg-pink-900/20 hover:border-pink-900"
                        }`}
                      >
                        {p.gender === "male" ? "Male" : "Female"}
                      </button>
                      {setup.tempPlayers.length > 1 && (
                        <button
                          onClick={() =>
                            onUpdateSetup({
                              ...setup,
                              tempPlayers: setup.tempPlayers.filter(
                                (_, ti) => ti !== i,
                              ),
                            })
                          }
                          className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity mb-2 flex-shrink-0"
                        >
                          <X size={14} strokeWidth={1} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {attemptedContinue && !p.name.trim() && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[10px] uppercase tracking-[0.3em] text-red-900 mt-2 pl-8"
                        >
                          Name required
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={() => {
                  onUpdateSetup({
                    ...setup,
                    tempPlayers: [
                      ...setup.tempPlayers,
                      { name: "", gender: "male" },
                    ],
                  });
                  setAttemptedContinue(false);
                }}
                className="w-full py-4 text-[9px] uppercase tracking-[0.5em] text-zinc-600 hover:text-white transition-all flex items-center justify-center gap-4"
              >
                <div className="h-px w-8 bg-zinc-800" />
                Add Member
                <div className="h-px w-8 bg-zinc-800" />
              </button>
            </div>
          ) : (
            <div className="space-y-10 overflow-x-hidden">
              {[
                { id: "manName", label: "Man" },
                { id: "womanName", label: "Woman" },
              ].map(({ id, label }) => (
                <div key={id} className="relative text-center group">
                  <p className="text-sm uppercase tracking-[0.2em] mb-6 transition-colors group-focus-within:text-red-900">
                    {label}
                  </p>
                  <input
                    value={setup[id]}
                    onChange={(e) => {
                      onUpdateSetup({ ...setup, [id]: e.target.value });
                      if (attemptedContinue && e.target.value.trim()) {
                        setAttemptedContinue(false);
                      }
                    }}
                    className={`w-full bg-transparent text-5xl font-serif italic text-center outline-none border-none placeholder:text-zinc-900 transition-all ${
                      attemptedContinue && !setup[id].trim()
                        ? "placeholder:text-red-900"
                        : ""
                    }`}
                    placeholder="Enter Name"
                  />
                  <div className="mt-4 h-[1px] w-0 mx-auto bg-red-900 group-focus-within:w-24 transition-all duration-700" />
                  <AnimatePresence>
                    {attemptedContinue && !setup[id].trim() && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-red-900 mt-3"
                      >
                        Name required
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 3. THE GRAND FINALE BUTTON */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="w-full max-w-xs text-center"
      >
        <button
          onClick={handleContinue}
          className="group relative w-full flex flex-col items-center gap-6 disabled:opacity-20 transition-all duration-1000"
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-zinc-800 group-hover:via-red-900 group-hover:to-red-900 transition-all duration-700" />

          <div className="flex items-center gap-12">
            <span className="text-[11px] font-light uppercase tracking-[1em] text-white/80 group-hover:text-white group-hover:tracking-[1.2em] transition-all duration-700">
              Begin
            </span>
          </div>

          <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight size={18} strokeWidth={1} className="text-red-900" />
          </div>
        </button>
      </motion.footer>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ParticipantSetup;
