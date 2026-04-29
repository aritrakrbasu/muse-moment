import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Onboarding from "./components/Onboarding/Onboarding";
import GamePlay from "./components/Game/GamePlay";
import CompletionScreen from "./components/CompletionScreen";
import SEO from "./components/SEO";
import NotFound from "./pages/NotFound";
import BFFPage from "./pages/modes/BFFPage";
import DatePage from "./pages/modes/DatePage";
import CouplesPage from "./pages/modes/CouplesPage";
import ProgrammaticPage from "./pages/ProgrammaticPage";

const App = () => {
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
  };

  const handleGameComplete = ({ gameStats, history }) => {
    setFinalStats(gameStats);
    setFinalHistory(history);
  };

  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={
          <>
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
          </>
        } />

        <Route path="/play/:mode" element={
          <>
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
          </>
        } />

        <Route path="/complete/:mode" element={
          <>
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
          </>
        } />

        {/* Mode-specific landing pages */}
        <Route path="/bff-party-game" element={<BFFPage />} />
        <Route path="/date-night-game" element={<DatePage />} />
        <Route path="/couples-party-game" element={<CouplesPage />} />

        {/* Programmatic SEO pages */}
        <Route path="/:slug" element={<ProgrammaticPage />} />

        {/* 404 page - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
