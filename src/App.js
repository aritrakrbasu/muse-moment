import React, { useState } from "react";
import Layout from "./components/Layout";
import Onboarding from "./components/Onboarding/Onboarding";
import GamePlay from "./components/Game/GamePlay";
import CompletionScreen from "./components/CompletionScreen";

const App = () => {
  const [gameState, setGameState] = useState("onboarding");
  const [setup, setSetup] = useState({
    manName: "Aritra",
    womanName: "Ms. Ghosh",
    toys: [],
    gameMode: "couples",
    players: [],
    tempPlayers: [{ name: "", gender: "male" }],
  });
  const [totalTurns, setTotalTurns] = useState(20);
  const [finalStats, setFinalStats] = useState(null);
  const [finalHistory, setFinalHistory] = useState(null);

  const handleOnboardingComplete = (finalSetup, turns) => {
    setSetup(finalSetup);
    setTotalTurns(turns);
    setGameState("playing");
  };

  const handleGameComplete = ({ gameStats, history }) => {
    setFinalStats(gameStats);
    setFinalHistory(history);
    setGameState("complete");
  };

  if (gameState === "onboarding") {
    return (
      <Layout fullWidth>
        <Onboarding
          setup={setup}
          setSetup={setSetup}
          onComplete={handleOnboardingComplete}
        />
      </Layout>
    );
  }

  if (gameState === "playing") {
    return (
      <Layout fullWidth>
        <GamePlay
          setup={setup}
          totalTurns={totalTurns}
          onComplete={handleGameComplete}
        />
      </Layout>
    );
  }

  if (gameState === "complete") {
    return (
      <Layout>
        <CompletionScreen
          gameStats={finalStats}
          history={finalHistory}
          onRestart={() => window.location.reload()}
          onExport={() => window.print()}
        />
      </Layout>
    );
  }

  return null;
};

export default App;
