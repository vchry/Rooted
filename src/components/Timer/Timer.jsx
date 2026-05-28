import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useFocusStore } from "../../store/useFocusStore";

export default function Timer() {

  const {
    mode,
    timeRemaining,
    isRunning,

    startTimer,
    pauseTimer,
    resetTimer,
  } = useFocusStore();

  const totalTime =
    mode === "focus"
      ? 25 * 60
      : 5 * 60;

  const progress =
    timeRemaining / totalTime;

  const minutes =
    Math.floor(timeRemaining / 60);

  const seconds =
    timeRemaining % 60;

  const radius = 120;
  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center">

      {/* Mode Badge */}

      <motion.div
        key={mode}
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={`
          mb-6 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-widest
          ${
            mode === "focus"
              ? "bg-green-500/20 text-green-400"
              : "bg-blue-500/20 text-blue-400"
          }
        `}
      >
        {mode} Mode
      </motion.div>

      {/* Circular Timer */}

      <div className="relative flex items-center justify-center">

        <svg
          width="300"
          height="300"
          className="-rotate-90"
        >

          {/* Background Ring */}

          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="#1e293b"
            strokeWidth="12"
            fill="transparent"
          />

          {/* Progress Ring */}

          <motion.circle
            cx="150"
            cy="150"
            r={radius}
            stroke={
              mode === "focus"
                ? "#4ade80"
                : "#60a5fa"
            }
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset,
            }}
            transition={{
              duration: 0.25,
            }}
            style={{
              filter:
                "drop-shadow(0 0 12px rgba(74,222,128,0.6))",
            }}
          />

        </svg>

        {/* Timer Text */}

        <motion.div
          animate={{
            scale: isRunning
              ? [1, 1.03, 1]
              : 1,
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="absolute text-center"
        >

          <h1 className="text-7xl font-bold tracking-tight">
            {String(minutes).padStart(2, "0")}
            :
            {String(seconds).padStart(2, "0")}
          </h1>

          <p className="mt-2 text-slate-400">
            Stay focused 🌱
          </p>

        </motion.div>

      </div>

      {/* Controls */}

      <div className="mt-10 flex gap-4">

        {!isRunning ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={startTimer}
            className="
              flex items-center gap-2
              rounded-2xl
              bg-green-500
              px-6 py-4
              font-semibold text-black
            "
          >
            <Play size={20} />
            Start
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={pauseTimer}
            className="
              flex items-center gap-2
              rounded-2xl
              bg-yellow-500
              px-6 py-4
              font-semibold text-black
            "
          >
            <Pause size={20} />
            Pause
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={resetTimer}
          className="
            flex items-center gap-2
            rounded-2xl
            bg-red-500
            px-6 py-4
            font-semibold text-black
          "
        >
          <RotateCcw size={20} />
          Reset
        </motion.button>

      </div>
    </div>
  );
}