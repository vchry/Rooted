import { create } from "zustand";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const useFocusStore = create((set, get) => ({
  // -------------------------
  // Timer State
  // -------------------------

  mode: "focus",
  timeRemaining: FOCUS_TIME,

  isRunning: false,

  sessionStartTime: null,
  endTime: null,

  totalFocusSeconds: Number(localStorage.getItem("totalFocusSeconds")) || 0,

  completedSessions: (() => {
    try {
      return JSON.parse(localStorage.getItem("completedSessions")) || [];
    } catch {
      return [];
    }
  })(),
  // -------------------------
  // Distraction Tracking
  // -------------------------

  isDistracted: false,
  distractionCount: 0,

  // -------------------------
  // Actions
  // -------------------------

  startTimer: () => {
    const { timeRemaining, isRunning } = get();

    if (isRunning) return;

    const now = Date.now();

    const endTime = now + timeRemaining * 1000;

    set({
      isRunning: true,
      sessionStartTime: now,
      endTime,
    });
  },

  pauseTimer: () => {
    const { endTime } = get();

    if (!endTime) return;

    const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    if (remaining !== get().timeRemaining) {
      set({
        timeRemaining: remaining,
      });
    }

    set({
      isRunning: false,
      endTime: null,
    });
  },

  resetTimer: () => {
    const { mode } = get();

    set({
      isRunning: false,
      endTime: null,
      timeRemaining: mode === "focus" ? FOCUS_TIME : BREAK_TIME,
    });
  },

  switchMode: () => {
    const { mode } = get();

    const nextMode = mode === "focus" ? "break" : "focus";

    set({
      mode: nextMode,
      isRunning: false,
      endTime: null,
      timeRemaining: nextMode === "focus" ? FOCUS_TIME : BREAK_TIME,
    });
  },

  tick: () => {
    const { endTime, mode, totalFocusSeconds } = get();

    if (!endTime) return;

    const now = Date.now();

    const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

    // update live countdown
    set({
      timeRemaining: remaining,
    });

    // session complete
    if (remaining <= 0) {
      if (mode === "focus") {
        const updatedTotal = totalFocusSeconds + FOCUS_TIME;

        localStorage.setItem("totalFocusSeconds", updatedTotal);

        const session = {
          id: Date.now(),
          completedAt: new Date().toISOString(),
          duration: FOCUS_TIME,
        };

        const updatedSessions = [session, ...get().completedSessions];

        localStorage.setItem(
          "completedSessions",
          JSON.stringify(updatedSessions),
        );

        set({
          totalFocusSeconds: updatedTotal,
          completedSessions: updatedSessions,
        });
      }

      get().switchMode();
    }
  },

  setDistracted: (value) => {
    set({
      isDistracted: value,
    });

    if (value) {
      set((state) => ({
        distractionCount: state.distractionCount + 1,
      }));
    }
  },
}));
