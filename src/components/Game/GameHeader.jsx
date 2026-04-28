import React from "react";

const GameHeader = ({ currentTurn, totalTurns, gameMode, manName, womanName, players }) => {
  return (
    <header className="flex justify-between items-center mb-32 border-b border-white/5 pb-8">
      <div className="space-y-2">
        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-600">
          Progression
        </p>
        <p className="text-2xl font-light tabular-nums">
          {currentTurn - 1}
          <span className="text-zinc-800 mx-1">/</span>
          <span className="text-zinc-600 text-lg">{totalTurns}</span>
        </p>
      </div>
      <div className="text-right space-y-2">
        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-600">
          Subject
        </p>
        <p className="text-2xl font-serif italic text-zinc-200">
          {gameMode === "bff"
            ? players[(currentTurn - 1) % players.length]?.name
            : (currentTurn - 1) % 2 !== 0
              ? manName
              : womanName}
        </p>
      </div>
    </header>
  );
};

export default GameHeader;
