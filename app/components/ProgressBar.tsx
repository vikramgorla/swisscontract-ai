'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProgressStep, getProgressState } from '../lib/progressSteps';
import { TranslationKeys } from '../i18n/translations';

interface ProgressBarProps {
  steps: ProgressStep[];
  isActive: boolean;
  isComplete: boolean;
  translations: TranslationKeys;
}

interface StepDisplay {
  status: 'done' | 'active' | 'pending';
  time: string | null;
}

export default function ProgressBar({ steps, isActive, isComplete, translations }: ProgressBarProps) {
  const [stepDisplays, setStepDisplays] = useState<StepDisplay[]>([]);
  const [totalElapsed, setTotalElapsed] = useState('');
  const [showComplete, setShowComplete] = useState(false);
  const [hasTrackedData, setHasTrackedData] = useState(false);

  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const stepStartRef = useRef<number[]>([]);
  const stepDoneRef = useRef<number[]>([]);
  const prevIndexRef = useRef(0);

  const t = translations;

  const formatTime = (ms: number): string => {
    const seconds = Math.round(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  };

  // Start / stop animation
  useEffect(() => {
    if (isActive && !isComplete) {
      const start = performance.now();
      startTimeRef.current = start;
      stepStartRef.current = [0];
      stepDoneRef.current = [];
      prevIndexRef.current = 0;
      setShowComplete(false);
      setHasTrackedData(true);

      const tick = () => {
        const elapsed = performance.now() - start;
        const state = getProgressState(steps, elapsed);
        const idx = steps.indexOf(state.step);

        if (idx > prevIndexRef.current) {
          stepDoneRef.current[prevIndexRef.current] = elapsed - (stepStartRef.current[prevIndexRef.current] || 0);
          stepStartRef.current[idx] = elapsed;
          prevIndexRef.current = idx;
        }

        const displays: StepDisplay[] = steps.map((_, i) => {
          if (i < idx) {
            return { status: 'done' as const, time: formatTime(stepDoneRef.current[i] || 0) };
          }
          if (i === idx) {
            const stepElapsed = elapsed - (stepStartRef.current[i] || 0);
            return { status: 'active' as const, time: formatTime(stepElapsed) };
          }
          return { status: 'pending' as const, time: null };
        });

        setStepDisplays(displays);
        setTotalElapsed(formatTime(elapsed));
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isActive, isComplete, steps]);

  // Handle completion with tracked data
  useEffect(() => {
    if (isComplete && startTimeRef.current > 0 && !showComplete) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const elapsed = performance.now() - startTimeRef.current;

      const displays: StepDisplay[] = steps.map((_, i) => {
        const duration = stepDoneRef.current[i] || (elapsed - (stepStartRef.current[i] || 0));
        return { status: 'done' as const, time: formatTime(duration) };
      });

      setStepDisplays(displays);
      setTotalElapsed(formatTime(elapsed));
      setShowComplete(true);
    }
  }, [isComplete, steps, showComplete]);

  // Handle mount with isComplete=true (no tracked data — e.g. page re-render)
  useEffect(() => {
    if (isComplete && !isActive && startTimeRef.current === 0 && !showComplete) {
      setStepDisplays(steps.map(() => ({ status: 'done' as const, time: null })));
      setShowComplete(true);
      setHasTrackedData(false);
    }
  }, [isComplete, isActive, steps, showComplete]);

  // Reset
  useEffect(() => {
    if (!isActive && !isComplete) {
      setStepDisplays([]);
      setTotalElapsed('');
      setShowComplete(false);
      setHasTrackedData(false);
    }
  }, [isActive, isComplete]);

  if (!isActive && !showComplete && !isComplete) return null;

  const elapsedLabel = (t as Record<string, unknown>)['progress_elapsed'] as string || 'elapsed';
  const completeLabel = (t as Record<string, unknown>)['progress_complete'] as string || 'Complete';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="space-y-3">
        {steps.map((step, index) => {
          const display = stepDisplays[index] || { status: 'pending' as const, time: null };
          const label = (t as Record<string, unknown>)[step.label] as string || step.label;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 transition-all duration-300 ${
                display.status === 'pending' ? 'opacity-25' : 'opacity-100'
              }`}
            >
              {/* Status indicator */}
              <div className="flex-shrink-0 w-5">
                {display.status === 'done' ? (
                  <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : display.status === 'active' ? (
                  <span className="inline-block w-2 h-2 ml-1 bg-red-500 rounded-full animate-pulse" />
                ) : (
                  <span className="inline-block w-1.5 h-1.5 ml-1 bg-gray-300 rounded-full" />
                )}
              </div>

              {/* Step label */}
              <span className={`text-sm flex-1 ${
                display.status === 'active' ? 'text-gray-900 font-medium' :
                display.status === 'done' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {label}
              </span>

              {/* Time for this step */}
              {display.time && (
                <span className={`text-xs tabular-nums ${
                  display.status === 'active' ? 'text-red-600 font-medium' : 'text-gray-400'
                }`}>
                  {display.time}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer — total elapsed (only show when we have real data) */}
      {(hasTrackedData || isActive) && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          {showComplete ? (
            <span className="text-sm font-medium text-red-600">{completeLabel}</span>
          ) : (
            <span />
          )}
          {totalElapsed && (
            <span className="text-xs text-gray-400 tabular-nums">
              {totalElapsed} {elapsedLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
