import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowRight } from "lucide-react";

const ParticipantSetup = ({ gameMode, setup, onUpdateSetup, onContinue }) => {
  const isInvalid =
    gameMode === "bff"
      ? setup.tempPlayers.some((p) => !p.name.trim())
      : !setup.manName.trim() || !setup.womanName.trim();

  return (
    <div className="fixed inset-0 bg-[#080808] text-[#e5e5e5] flex flex-col items-center justify-between py-16 px-8 overflow-hidden font-light">
      {/* 1. THE ARCHIVAL HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-4"
      >
        <span className="text-[10px] tracking-[0.8em] uppercase text-zinc-500 block mb-2">
          Entry Protocol
        </span>
        <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight">
          The <span className="text-rose-800">Cast</span>
        </h1>
      </motion.header>

      {/* 2. THE FLOATING INPUT STAGE */}
      <main className="w-full max-w-lg flex-1 flex flex-col justify-center">
        <div className="max-h-[50vh] overflow-y-auto no-scrollbar py-10 px-2">
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
                    className="relative group border-b border-white/5 pb-2 flex items-end gap-6"
                  >
                    <span className="text-[10px] font-serif italic text-zinc-700 mb-2">
                      {i + 1}.
                    </span>
                    <input
                      value={p.name}
                      onChange={(e) => {
                        const newP = [...setup.tempPlayers];
                        newP[i].name = e.target.value;
                        onUpdateSetup({ ...setup, tempPlayers: newP });
                      }}
                      placeholder="Name"
                      className="flex-1 bg-transparent text-2xl font-serif italic outline-none placeholder:text-zinc-900 group-focus-within:placeholder:text-zinc-800 transition-all"
                    />
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
                        className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity mb-2"
                      >
                        <X size={14} strokeWidth={1} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={() =>
                  onUpdateSetup({
                    ...setup,
                    tempPlayers: [
                      ...setup.tempPlayers,
                      { name: "", gender: "male" },
                    ],
                  })
                }
                className="w-full py-4 text-[9px] uppercase tracking-[0.5em] text-zinc-600 hover:text-white transition-all flex items-center justify-center gap-4"
              >
                <div className="h-px w-8 bg-zinc-800" />
                Add Member
                <div className="h-px w-8 bg-zinc-800" />
              </button>
            </div>
          ) : (
            <div className="space-y-24">
              {["manName", "womanName"].map((id, idx) => (
                <div key={id} className="relative text-center group">
                  <p className="text-[9px] uppercase tracking-[0.6em] text-zinc-600 mb-6 transition-colors group-focus-within:text-rose-900">
                    Subject {idx === 0 ? "One" : "Two"}
                  </p>
                  <input
                    value={setup[id]}
                    onChange={(e) =>
                      onUpdateSetup({ ...setup, [id]: e.target.value })
                    }
                    className="w-full bg-transparent text-5xl font-serif italic text-center outline-none border-none placeholder:text-zinc-900 transition-all"
                    placeholder="Enter Name"
                  />
                  <div className="mt-4 h-[1px] w-0 mx-auto bg-rose-900 group-focus-within:w-24 transition-all duration-700" />
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
          onClick={onContinue}
          disabled={isInvalid}
          className="group relative w-full flex flex-col items-center gap-6 disabled:opacity-20 transition-all duration-1000"
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-zinc-800 group-hover:via-rose-900 group-hover:to-rose-900 transition-all duration-700" />

          <div className="flex items-center gap-12">
            <span className="text-[11px] font-light uppercase tracking-[1em] text-white/80 group-hover:text-white group-hover:tracking-[1.2em] transition-all duration-700">
              Begin
            </span>
          </div>

          <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight size={18} strokeWidth={1} className="text-rose-900" />
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
