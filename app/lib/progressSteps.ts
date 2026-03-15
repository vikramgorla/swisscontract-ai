export interface ProgressStep {
  label: string;  // Translation key
  emoji: string;
  startPercent: number;
  endPercent: number;
  durationMs: number;  // Expected time to fill this step's range
}

export const analysisSteps: ProgressStep[] = [
  { label: 'progress_extracting', emoji: '', startPercent: 0, endPercent: 10, durationMs: 2000 },
  { label: 'progress_identifying', emoji: '', startPercent: 10, endPercent: 25, durationMs: 3000 },
  { label: 'progress_analysing', emoji: '', startPercent: 25, endPercent: 50, durationMs: 15000 },
  { label: 'progress_swiss_law', emoji: '', startPercent: 50, endPercent: 75, durationMs: 30000 },
  { label: 'progress_preparing', emoji: '', startPercent: 75, endPercent: 99, durationMs: 70000 },
];

export const comparisonSteps: ProgressStep[] = [
  { label: 'progress_extracting_both', emoji: '', startPercent: 0, endPercent: 10, durationMs: 3000 },
  { label: 'progress_identifying_changes', emoji: '', startPercent: 10, endPercent: 25, durationMs: 5000 },
  { label: 'progress_assessing_impact', emoji: '', startPercent: 25, endPercent: 50, durationMs: 20000 },
  { label: 'progress_swiss_law', emoji: '', startPercent: 50, endPercent: 75, durationMs: 30000 },
  { label: 'progress_preparing_comparison', emoji: '', startPercent: 75, endPercent: 99, durationMs: 60000 },
];

// Returns current step and progress percentage based on elapsed time
export function getProgressState(steps: ProgressStep[], elapsedMs: number): { step: ProgressStep; percent: number } {
  let cumulative = 0;
  for (const step of steps) {
    if (elapsedMs < cumulative + step.durationMs) {
      const stepElapsed = elapsedMs - cumulative;
      const stepProgress = stepElapsed / step.durationMs;
      const percent = step.startPercent + (step.endPercent - step.startPercent) * stepProgress;
      return { step, percent: Math.min(percent, step.endPercent) };
    }
    cumulative += step.durationMs;
  }
  // Past all steps — hold at last step's end
  return { step: steps[steps.length - 1], percent: steps[steps.length - 1].endPercent };
}
