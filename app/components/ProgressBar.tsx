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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [stepStartTimes, setStepStartTimes] = useState<number[]>([]);
  const [stepDurations, setStepDurations] = useState<number[]>([]);
  const [showComplete, setShowComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const t = translations;

  const formatTime = (ms: number): string => {
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  };

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;
    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    setElapsedMs(elapsed);

    const state = getProgressState(steps, elapsed);
    const newIndex = steps.indexOf(state.step);

    setCurrentStepIndex(prev => {
      if (newIndex > prev) {
        // Moving to next step — record the transition
        setStepDurations(d => {
          const updated = [...d];
          updated[prev] = elapsed - (stepStartTimes[prev] || 0);
          return updated;
        });
        setStepStartTimes(st => {
          const updated = [...st];
          updated[newIndex] = elapsed;
          return updated;
        });
      }
      return newIndex;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [steps, stepStartTimes]);

  // Start animation
  useEffect(() => {
    if (isActive && !isComplete) {
      startTimeRef.current = performance.now();
      setElapsedMs(0);
      setCurrentStepIndex(0);
      setShowComplete(false);
      setStepStartTimes([0]);
      setStepDurations([]);
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isActive, isComplete, tick]);

  // Handle completion
  useEffect(() => {
    if (isComplete && isActive) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // Record final step duration
      setStepDurations(d => {
        const updated = [...d];
        updated[currentStepIndex] = elapsedMs - (stepStartTimes[currentStepIndex] || 0);
        return updated;
      });
      setShowComplete(true);
    }
  }, [isComplete, isActive, currentStepIndex, elapsedMs, stepStartTimes]);

  // Reset
  useEffect(() => {
    if (!isActive && !isComplete) {
      setElapsedMs(0);
      setCurrentStepIndex(0);
      setShowComplete(false);
      setStepStartTimes([]);
      setStepDurations([]);
      startTimeRef.current = null;
    }
  }, [isActive, isComplete]);

  if (!isActive && !showComplete) return null;

  const getStepStatus = (index: number): 'done' | 'active' | 'pending' => {
    if (showComplete) return 'done';
    if (index < currentStepIndex) return 'done';
    if (index === currentStepIndex) return 'active';
    return 'pending';
  };

  const getStepTime = (index: number): string | null => {
    if (stepDurations[index] !== undefined) {
      return formatTime(stepDurations[index]);
    }
    if (index === currentStepIndex && !showComplete) {
      const elapsed = elapsedMs - (stepStartTimes[index] || 0);
      return formatTime(elapsed);
    }
    return null;
  };

  const totalElapsed = formatTime(elapsedMs);
  const elapsedLabel = (t as Record<string, unknown>)['progress_elapsed'] as string || 'elapsed';
  const completeLabel = (t as Record<string, unknown>)['progress_complete'] as string || 'Complete!';

  return (
    <div className="mt-5 bg-white border border-red-100 rounded-xl p-5 shadow-sm">
      <div className="space-y-2">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const time = getStepTime(index);
          const label = (t as Record<string, unknown>)[step.label] as string || step.label;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 transition-all duration-300 ${
                status === 'pending' ? 'opacity-30' : 'opacity-100'
              }`}
            >
              {/* Status indicator */}
              <div className="flex-shrink-0 w-6 text-center">
                {status === 'done' ? (
                  <span className="text-red-600 text-sm font-bold">✓</span>
                ) : status === 'active' ? (
                  <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                ) : (
                  <span className="inline-block w-2 h-2 bg-gray-200 rounded-full" />
                )}
              </div>

              {/* Step label */}
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm">{step.emoji}</span>
                <span className={`text-sm ${
                  status === 'active' ? 'text-gray-900 font-medium' :
                  status === 'done' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>

              {/* Time for this step */}
              {time && (
                <div className="flex-shrink-0">
                  <span className={`text-xs tabular-nums ${
                    status === 'active' ? 'text-red-600 font-medium' : 'text-gray-400'
                  }`}>
                    {time}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total elapsed + completion */}
      <div className={`mt-3 pt-3 border-t border-red-100 flex items-center justify-between`}>
        {showComplete ? (
          <p className="text-sm font-medium text-red-600">✅ {completeLabel}</p>
        ) : (
          <div />
        )}
        <p className="text-xs text-gray-500 tabular-nums">
          {totalElapsed} {elapsedLabel}
        </p>
      </div>
    </div>
  );
}
