import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import GameHeader from "./GameHeader";
import CardDisplay from "./CardDisplay";
import GameControls from "./GameControls";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useTimer } from "../../hooks/useTimer";

const GamePlay = ({
  setup,
  totalTurns,
  onComplete,
}) => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const { timeLeft, isTimerActive, startTimer, stopTimer } = useTimer();
  const {
    loading,
    currentCard,
    history,
    gameStats,
    handleNextTurn,
    handleRegenerate,
    handleDoIt,
    handleDrink,
    resetCardAction,
    extractSeconds,
  } = useGameEngine(setup, totalTurns);

  useEffect(() => {
    const initGame = async () => {
      const result = await handleNextTurn(currentTurn);
      if (result === "complete") {
        onComplete({ gameStats, history });
      } else if (result?.duration !== undefined) {
        stopTimer();
      }
    };
    initGame();
  }, []);

  const handleRegenerateClick = async () => {
    const duration = await handleRegenerate(currentTurn);
    stopTimer();
  };

  const handleDoItClick = () => {
    const duration = extractSeconds(currentCard.text || "", currentTurn - 1 === totalTurns);
    handleDoIt(duration, startTimer, () => {
      resetCardAction();
    });
  };

  const handleNextClick = () => {
    stopTimer();
    resetCardAction();
    const nextTurn = currentTurn + 1;
    setCurrentTurn(nextTurn);

    const initNextTurn = async () => {
      const result = await handleNextTurn(nextTurn);
      if (result === "complete") {
        onComplete({ gameStats, history });
      } else if (result?.duration !== undefined) {
        stopTimer();
      }
    };
    initNextTurn();
  };

  const isFinalCard = currentTurn - 1 === totalTurns;

  return (
    <div className="flex flex-col min-h-screen">
      <GameHeader
        currentTurn={currentTurn}
        totalTurns={totalTurns}
        gameMode={setup.gameMode}
        manName={setup.manName}
        womanName={setup.womanName}
        players={setup.players}
      />

      <main className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <CardDisplay
            card={currentCard}
            loading={loading}
            isFinalCard={isFinalCard}
            timeLeft={timeLeft}
            isTimerActive={isTimerActive}
            onRegenerate={handleRegenerateClick}
          />
        </AnimatePresence>
      </main>

      <GameControls
        card={currentCard}
        loading={loading}
        isTimerActive={isTimerActive}
        onDoIt={handleDoItClick}
        onDrink={handleDrink}
        onNext={handleNextClick}
      />
    </div>
  );
};

export default GamePlay;
