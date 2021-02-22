import React, { useState } from 'react';

const useStepState = (startStep, maxSteps, minStep = 0) => {
  if (startStep > maxSteps) {
    throw new Error('Start step can\'t be more than max steps')
  }
  if (startStep < 0 || maxSteps < 0) {
    throw new Error('Steps can\'t be negative')

  }
  const [step, setStep] = useState(startStep)
  return [step, (num) => {
    if (num < minStep) {
      setStep(minStep)
    }
    if (num > maxSteps) {
      setStep(maxSteps)
    } else {
      setStep(num)
    }
  }]
}

export default useStepState