'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProgressStep, getProgressState } from '../lib/progressSteps';
import { TranslationKeys } from '../i18n/translations';

interface ProgressBarProps {
  steps: ProgressStep[];
  isActive: boolean;
  isComplete: boolean;
  translations: TranslationKeys;
}

export default function ProgressBar({ steps, isActive, isComplete, translations }: ProgressBarProps) {
  const [percent, setPercent] = useState(0);
  const [currentStep, setCurrentStep] = useState<ProgressStep>(steps[0]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const t = translations;

  const formatElapsed = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  };

  // Compute total expected duration from steps
  const totalDurationMs = steps.reduce((sum, s) => sum + s.durationMs, 0);
  const estimatedMinutes = Math.ceil(totalDurationMs / 60000);

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;
    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    setElapsedMs(elapsed);

    const state = getProgressState(steps, elapsed);
    setCurrentStep(state.step);
    setPercent(state.percent);

    rafRef.current = requestAnimationFrame(tick);
  }, [steps]);

  // Start / stop the animation loop
  useEffect(() => {
    if (isActive && !isComplete) {
      startTimeRef.current = performance.now();
      setPercent(0);
      setElapsedMs(0);
      setShowComplete(false);
      setCurrentStep(steps[0]);
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isActive, isComplete, tick, steps]);

  // Handle completion
  useEffect(() => {
    if (isComplete && isActive) {
      // Cancel the animation loop
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setPercent(100);
      setShowComplete(true);
    }
  }, [isComplete, isActive]);

  // Reset when no longer active and not complete
  useEffect(() => {
    if (!isActive && !isComplete) {
      setPercent(0);
      setElapsedMs(0);
      setShowComplete(false);
      startTimeRef.current = null;
    }
  }, [isActive, isComplete]);

  if (!isActive && !showComplete) return null;

  const stepLabel = showComplete
    ? `✅ ${(t as Record<string, unknown>)['progress_complete'] as string || 'Complete!'}`
    : `${currentStep.emoji} ${(t as Record<string, unknown>)[currentStep.label] as string || currentStep.label}`;

  const elapsedLabel = (t as Record<string, unknown>)['progress_elapsed'] as string || 'elapsed';

  return (
    <div className="mt-5 bg-gray-50 border border-gray-200 rounded-xl p-5">
      {/* Step label above bar */}
      <div className="flex items-center justify-between mb-2">
        <p className={`text-sm font-medium transition-colors duration-300 ${showComplete ? 'text-green-700' : 'text-gray-700'}`}>
          {stepLabel}
        </p>
        <p className={`text-sm font-semibold tabular-nums ${showComplete ? 'text-green-600' : 'text-indigo-600'}`}>
          {Math.round(percent)}%
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
        <div
          className={`h-3.5 rounded-full transition-all duration-300 ease-out ${
            showComplete
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : 'bg-gradient-to-r from-indigo-500 to-indigo-600'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Elapsed time below bar */}
      <div className="flex justify-end mt-1.5">
        <p className="text-xs text-gray-500 tabular-nums">
          {formatElapsed(elapsedMs)} {elapsedLabel}{!showComplete && ` / ~${estimatedMinutes}min`}
        </p>
      </div>
    </div>
  );
}
