import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useState } from "react";
import {} from "react";
import { useForm } from "react-hook-form";
export const useMultipleFormSteps = ({
  steps = [],
  schema,
  defaultValues,
  mode,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [transitionOriantaion, setTransitionOriantaion] = useState("right");
  const HandleNext = async () => {
    setTransitionOriantaion("right");
    const fieldsRequired = steps[currentStepIndex]?.fieldsRequired;
    if (fieldsRequired?.length > 0) {
      const trigger = await form.trigger(fieldsRequired);
      if (trigger) {
        steps.length > currentStepIndex + 1 &&
          setCurrentStepIndex(currentStepIndex + 1);
      }
      return;
    }
    steps.length > currentStepIndex + 1 &&
      setCurrentStepIndex(currentStepIndex + 1);
  };

  const HandlePrev = () => {
    setTransitionOriantaion("left");
    currentStepIndex > 0 && setCurrentStepIndex(currentStepIndex - 1);
  };

  const HandleChangeCurrentStepIndex = (index) => {
    if (index > currentStepIndex) {
      setTransitionOriantaion("right");
    } else {
      setTransitionOriantaion("left");
    }

    if (index + 1 < steps.length && index > 0) {
      setCurrentStepIndex(index);
    }
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  return {
    HandleNext,
    HandlePrev,
    HandleChangeCurrentStepIndex,
    CurrentStep: steps[currentStepIndex]?.Component,
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex + 1 === steps.length,
    transitionOriantaion,
    wrapperTransionStyles: {
      transition: {
        duaration: 0.5,
        ease: "easeInOut",
      },
      animate: {
        opacity: 1,
        x: 0,
      },
      initial: {
        x: transitionOriantaion === "right" ? "50%" : "-50%",
        opacity: 0,
      },
    },
    ...form,
  };
};