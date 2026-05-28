import { motion, AnimatePresence } from "framer-motion";
import { useFocusStore } from "../../store/useFocusStore";
import { getPlantPhase } from "../../utils/plantGrowth";

export default function Plant() {

  const {
    totalFocusSeconds,
    isDistracted,
  } = useFocusStore();

  const phase =
    getPlantPhase(totalFocusSeconds);

  return (
    <div className="flex flex-col items-center">

      {/* Plant Container */}

      <div className="
        relative flex
        h-[350px] w-[350px]
        items-center justify-center
      ">

        {/* Glow */}

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className={`
            absolute h-52 w-52 rounded-full blur-3xl
            ${
              isDistracted
                ? "bg-gray-500/20"
                : "bg-green-500/20"
            }
          `}
        />

        {/* Plant */}

        <AnimatePresence mode="wait">

          {phase === "seed" && (
            <SeedPlant
              key="seed"
              distracted={isDistracted}
            />
          )}

          {phase === "sprout" && (
            <SproutPlant
              key="sprout"
              distracted={isDistracted}
            />
          )}

          {phase === "mature" && (
            <MaturePlant
              key="mature"
              distracted={isDistracted}
            />
          )}

        </AnimatePresence>

      </div>

      {/* Status */}

      <motion.div
        key={phase}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mt-4 text-center"
      >

        <h2 className="text-2xl font-bold capitalize">
          {phase} Plant
        </h2>

        <p className="mt-2 text-slate-400">
          {
            phase === "seed"
              ? "Your focus journey begins."
              : phase === "sprout"
              ? "Your plant is growing strong."
              : "Your focus has flourished."
          }
        </p>

      </motion.div>

    </div>
  );
}

//
// Seed Plant
//

function SeedPlant({ distracted }) {

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: distracted ? 0.5 : 1,
        y: [0, -5, 0],
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 1,
        y: {
          repeat: Infinity,
          duration: 2,
        },
      }}
      className="relative"
    >

      {/* Soil */}

      <div className="
        absolute left-1/2 top-10
        h-16 w-32
        -translate-x-1/2
        rounded-full bg-amber-900
      " />

      {/* Seed */}

      <div className={`
        relative h-10 w-8 rounded-full
        ${
          distracted
            ? "bg-gray-500"
            : "bg-amber-500"
        }
      `} />

    </motion.div>
  );
}

//
// Sprout Plant
//

function SproutPlant({ distracted }) {

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: distracted ? 0.5 : 1,
        rotate: distracted
          ? -8
          : [-2, 2, -2],
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 1,
        rotate: {
          repeat: Infinity,
          duration: 3,
        },
      }}
      className="flex flex-col items-center"
    >

      {/* Stem */}

      <div className={`
        h-28 w-3 rounded-full
        ${
          distracted
            ? "bg-gray-500"
            : "bg-green-500"
        }
      `} />

      {/* Leaves */}

      <div className="relative -mt-24">

        <div className={`
          absolute right-0
          h-12 w-20
          rotate-[-30deg]
          rounded-full
          ${
            distracted
              ? "bg-gray-500"
              : "bg-green-400"
          }
        `} />

        <div className={`
          absolute left-0
          h-12 w-20
          rotate-[30deg]
          rounded-full
          ${
            distracted
              ? "bg-gray-500"
              : "bg-green-400"
          }
        `} />

      </div>

    </motion.div>
  );
}

//
// Mature Plant
//

function MaturePlant({ distracted }) {

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: distracted ? 0.5 : 1,
        rotate: distracted
          ? -10
          : [-1, 1, -1],
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        duration: 1,
        rotate: {
          repeat: Infinity,
          duration: 4,
        },
      }}
      className="relative flex flex-col items-center"
    >

      {/* Pot */}

      <div className="
        absolute bottom-0
        h-24 w-32
        rounded-b-3xl
        rounded-t-xl
        bg-orange-700
      " />

      {/* Stem */}

      <div className={`
        mb-4 h-40 w-4 rounded-full
        ${
          distracted
            ? "bg-gray-500"
            : "bg-green-600"
        }
      `} />

      {/* Leaves */}

      <div className="absolute top-20">

        <div className={`
          absolute -left-16
          h-16 w-28
          rotate-[35deg]
          rounded-full
          ${
            distracted
              ? "bg-gray-500"
              : "bg-green-400"
          }
        `} />

        <div className={`
          absolute left-0
          h-16 w-28
          rotate-[-35deg]
          rounded-full
          ${
            distracted
              ? "bg-gray-500"
              : "bg-green-400"
          }
        `} />

      </div>

      {/* Floating Particles */}

      {!distracted && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-10, -80],
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + i,
                delay: i * 0.4,
              }}
              className="
                absolute
                h-2 w-2
                rounded-full
                bg-green-300
              "
              style={{
                left: `${40 + i * 20}px`,
                bottom: "100px",
              }}
            />
          ))}
        </>
      )}

    </motion.div>
  );
}