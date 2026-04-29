import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Onboarding from "./components/Onboarding/Onboarding";
import GamePlay from "./components/Game/GamePlay";
import CompletionScreen from "./components/CompletionScreen";
import SEO from "./components/SEO";

const App = () => {
  const [gameState, setGameState] = useState("onboarding");
  const [setup, setSetup] = useState({
    manName: "",
    womanName: "",
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
      <HelmetProvider>
        <SEO
          title="Muse Moment - Choose Your Game Mode"
          description="Select your game mode: BFF for friends, Date for couples, or Couples for intimate moments. AI-powered dares with progressive intensity."
        />
        <Layout fullWidth>
          <Onboarding
            setup={setup}
            setSetup={setSetup}
            onComplete={handleOnboardingComplete}
          />
        </Layout>
      </HelmetProvider>
    );
  }

  if (gameState === "playing") {
    return (
      <HelmetProvider>
        <SEO
          title="Muse Moment - Game In Progress"
          description="Take on daring challenges or drink as penalty. Progressive intensity with every turn."
        />
        <Layout fullWidth>
          <GamePlay
            setup={setup}
            totalTurns={totalTurns}
            onComplete={handleGameComplete}
          />
        </Layout>
      </HelmetProvider>
    );
  }

  if (gameState === "complete") {
    return (
      <HelmetProvider>
        <SEO
          title="Muse Moment - Game Complete"
          description="See your game stats and history. Play again with new challenges!"
        />
        <Layout>
          <CompletionScreen
            gameStats={finalStats}
            history={finalHistory}
            onRestart={() => window.location.reload()}
            onExport={() => window.print()}
          />
        </Layout>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <SEO />
      <Layout fullWidth>
        <Onboarding
          setup={setup}
          setSetup={setSetup}
          onComplete={handleOnboardingComplete}
        />
      </Layout>
    </HelmetProvider>
  );
};

export default App;
