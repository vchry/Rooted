import { useEffect } from "react";
import Timer from "./components/Timer/Timer";
import { useFocusStore } from "./store/useFocusStore";
import Plant from "./components/Plant/Plant";

export default function App() {
  const { isRunning, tick } = useFocusStore();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      tick();
    }, 250);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}

      <div
        className="
      absolute left-1/2 top-1/2
      h-[500px] w-[500px]
      -translate-x-1/2 -translate-y-1/2
      rounded-full
      bg-green-500/10
      blur-3xl
    "
      />

      <div
        className="
      relative z-10
      grid min-h-screen
      w-full max-w-7xl
      grid-cols-1 gap-10
      p-6 lg:grid-cols-2
    "
      >
        {/* Timer */}

        <div
          className="
        flex items-center justify-center
      "
        >
          <Timer />
        </div>

        {/* Plant */}

        <div
          className="
        flex items-center justify-center
      "
        >
          <Plant />
        </div>
      </div>
    </div>
  );
}
