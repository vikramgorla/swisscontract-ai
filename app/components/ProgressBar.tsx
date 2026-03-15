'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProgressStep, ProgressStats, getProgressState } from '../lib/progressSteps';
import { TranslationKeys } from '../i18n/translations';

interface ProgressBarProps {
  steps: ProgressStep[];
  isActive: boolean;
  isComplete: boolean;
  translations: TranslationKeys;
  onComplete?: (stats: ProgressStats) => void;
  stats?: ProgressStats | null;
}

interface StepDisplay {
  status: 'done' | 'active' | 'pending';
  time: string | null;
}

export default function ProgressBar({ steps, isActive, isComplete, translations, onComplete, stats }: ProgressBarProps) {
  const [stepDisplays, setStepDisplays] = useState<StepDisplay[]>([]);
  const [totalElapsed, setTotalElapsed] = useState('');

  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const stepStartRef = useRef<number[]>([]);
  const stepDoneRef = useRef<number[]>([]);
  const prevIndexRef = useRef(0);
  const completedRef = useRef(false);

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
      completedRef.current = false;

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

  // Handle completion: fire onComplete with timing data
  useEffect(() => {
    if (isComplete && startTimeRef.current > 0 && !completedRef.current) {
      completedRef.current = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const totalMs = performance.now() - startTimeRef.current;

      // Finalize last step
      const lastIdx = prevIndexRef.current;
      if (!stepDoneRef.current[lastIdx]) {
        stepDoneRef.current[lastIdx] = totalMs - (stepStartRef.current[lastIdx] || 0);
      }

      const stepTimes = steps.map((_, i) => stepDoneRef.current[i] || 0);

      if (onComplete) {
        onComplete({ stepTimes, totalMs });
      }
    }
  }, [isComplete, steps, onComplete]);

  // Render from stats prop when complete
  // Derive display entirely from props — no internal showComplete state
  if (!isActive && !isComplete) return null;

  // Determine what to render
  let displaySteps: StepDisplay[];
  let displayTotal = '';
  let hasTimingData = false;

  if (isActive && !isComplete) {
    // Live animation — use state from animation loop
    displaySteps = stepDisplays;
    displayTotal = totalElapsed;
    hasTimingData = true;
  } else if (isComplete && stats) {
    // Completion with real timing data from parent
    displaySteps = steps.map((_, i) => ({
      status: 'done' as const,
      time: formatTime(stats.stepTimes[i] || 0),
    }));
    displayTotal = formatTime(stats.totalMs);
    hasTimingData = true;
  } else if (isComplete && !stats) {
    // Completion without timing data
    displaySteps = steps.map(() => ({
      status: 'done' as const,
      time: null,
    }));
    hasTimingData = false;
  } else {
    displaySteps = [];
  }

  const elapsedLabel = (t as Record<string, unknown>)['progress_elapsed'] as string || 'elapsed';
  const completeLabel = (t as Record<string, unknown>)['progress_complete'] as string || 'Complete';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="space-y-2.5">
        {steps.map((step, index) => {
          const display = displaySteps[index] || { status: 'pending' as const, time: null };
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
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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

      {/* Footer — total elapsed (only show when we have real timing data) */}
      {hasTimingData && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          {isComplete ? (
            <span className="text-sm font-medium text-gray-600">{completeLabel}</span>
          ) : (
            <span />
          )}
          {displayTotal && (
            <span className="text-xs text-gray-400 tabular-nums">
              {displayTotal} {elapsedLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
