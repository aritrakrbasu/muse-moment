import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModeSelector from "./ModeSelector";
import ParticipantSetup from "./ParticipantSetup";
import DurationSelector from "./DurationSelector";
import InventorySelector from "./InventorySelector";

const Onboarding = ({ setup, setSetup, onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(20);

  const handleModeSelect = (modeId) => {
    setSetup({ ...setup, gameMode: modeId });
    setStep(1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setStep(3);
  };

  const handleStart = () => {
    const finalSetup = { ...setup };
    if (setup.gameMode === "bff") {
      finalSetup.players = setup.tempPlayers.filter((x) => x.name.trim());
    }
    onComplete(finalSetup, selectedDuration);
  };

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <ModeSelector key="step0" onSelect={handleModeSelect} />}

      {step === 1 && (
        <ParticipantSetup
          key="step1"
          gameMode={setup.gameMode}
          setup={setup}
          onUpdateSetup={setSetup}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      )}

      {step === 2 && (
        <DurationSelector key="step2" onSelect={handleDurationSelect} />
      )}

      {step === 3 && (
        <InventorySelector
          key="step3"
          setup={setup}
          onUpdateSetup={setSetup}
          onStart={handleStart}
        />
      )}
    </AnimatePresence>
  );
};

export default Onboarding;
